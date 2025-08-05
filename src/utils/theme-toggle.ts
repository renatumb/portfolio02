const themeToggle = () => {

    const btnToggle = document.querySelectorAll(".theme-toggle");

    localStorage.getItem("theme") && document.body.classList.add("dark-mode");

    btnToggle.forEach((btn) => {
        btn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            if (localStorage.getItem("theme")) {
                localStorage.removeItem("theme");
                document.body.removeAttribute("class");
            } else {
                localStorage.setItem("theme", "dark-mode");
            }
        })
    })
}

export default themeToggle;