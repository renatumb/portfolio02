const themeToggle = () => {

    const btnToggle = document.querySelectorAll(".theme-toggle");

    localStorage.getItem("theme") && document.body.classList.add("light-mode");

    btnToggle.forEach((btn) => {
        btn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            if (localStorage.getItem("theme")) {
                localStorage.removeItem("theme");
                document.body.removeAttribute("class");
            } else {
                localStorage.setItem("theme", "light-mode");
            }
        })
    })
}

export default themeToggle;