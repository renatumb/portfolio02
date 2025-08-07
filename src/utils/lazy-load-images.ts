const lazyLoadingImages = () => {

    let imageTag = document.querySelectorAll(".lazy-image");

    const theObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                let observedImageTag = entry.target as HTMLImageElement;

                observedImageTag.src = <string>observedImageTag.dataset["imageToBeUsed"];

                observedImageTag.classList.remove("loading");
                observedImageTag.classList.add("loaded");

                theObserver.unobserve(observedImageTag);
            }
        })
    })

    imageTag.forEach((eachImage) => {
        theObserver.observe(eachImage);
    })
}

export default lazyLoadingImages;