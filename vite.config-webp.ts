import {defineConfig, Plugin} from 'vite';
// @ts-ignore
import fs from 'fs-extra';
// @ts-ignore
import path from 'path';
import sharp from 'sharp';

console.warn("**** vite.config-webp.js:\t images will be converted ****");

function convertImagesAndRewriteHTML(): Plugin {
    return {
        name: 'convert-images-and-rewrite-html',
        apply: 'build',
        enforce: 'post',
        async generateBundle(_, bundle) {
            const outputDir = 'dist';
            const imageDir = 'public/images';
            const targetFormat = 'webp';

            const imageMap: Record<string, string> = {};

            const imageFiles = await fs.readdir(imageDir);

            await Promise.all(
                imageFiles.map(async (file: string) => {

                    const inputPath = path.join(imageDir, file);

                    const ext = path.extname(file);

                    const name = path.basename(file, ext);

                    const outputFile = `${name}.${targetFormat}`;

                    const outputPath = path.join(outputDir, 'images', outputFile);

                    await fs.ensureDir(path.dirname(outputPath));

                    await sharp(inputPath)
                        .toFormat(targetFormat,
                            {
                                quality: 30
                            })
                        .toFile(outputPath)
                        .then(() => {
                            console.warn(`file converted:\t${inputPath} \t --> ${outputPath}`);
                        });

                    imageMap[`images/${file}`] = `images/${outputFile}`;

                    await fs.remove(path.join(outputDir, 'images', file));
                })
            );

            for (const fileName in bundle) {
                if (fileName.endsWith('.html')) {
                    const htmlAsset = bundle[fileName];
                    if (htmlAsset.type === 'asset' && typeof htmlAsset.source === 'string') {
                        let html = htmlAsset.source;

                        html = html.replace(
                            /<img\s+[^>]*src="([^"]+\.(?:jpg|png|svg))"[^>]*>/gi,
                            (match, imgPath) => {
                                const newImgPath = imageMap[imgPath];
                                return match.replace(/src="[^"]*"/, `src="${newImgPath}"`);
                            }
                        );

                        html = html.replace(
                            /<img\s+[^>]*data-image-to-be-used="([^"]+)"[^>]*>/gi,
                            (match, imgPath) => {
                                const newImgPath = imageMap[imgPath];
                                return match.replace(/data-image-to-be-used="[^"]*"/, `data-image-to-be-used="${newImgPath}"`);
                            }
                        );
                        htmlAsset.source = html;
                    }
                }
            }
        },
    };
}

export default defineConfig({
    plugins: [
        convertImagesAndRewriteHTML(),
    ],
    build: {
        rollupOptions: {
            input: 'index.html',
        },
    },
});