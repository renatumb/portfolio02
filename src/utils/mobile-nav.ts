const showHideMobileNav: () => void = () => {

    const navButton: Element | null = document.querySelector(".header__bars");
    const itemsNavMobileMenu = document.querySelectorAll(".mobile__nav-link");

    let menuOpened: boolean = false;

    function openCloseNav(): void {

        const mobileNav = document.querySelector(".mobile__nav") as HTMLElement | null;

        if (mobileNav instanceof HTMLElement) {
            if (menuOpened) {
                mobileNav.style.display = "none";
                document.body.style.overflowY = "auto";
            } else {
                mobileNav.style.display = "flex";
                document.body.style.overflowY = "hidden";
            }
            menuOpened = !menuOpened;
        }
    }

    // @ts-ignore
    navButton.addEventListener("click", openCloseNav);

    itemsNavMobileMenu.forEach(eachItem => {
        eachItem.addEventListener("click", openCloseNav);
    })
}

export default showHideMobileNav;