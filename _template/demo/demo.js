(() => {
    const darkBtn = document.querySelector(".dark-btn");
    const lightBtn = document.querySelector(".light-btn");
    
    const infoBtn = document.querySelector(".btn.info");
    const successBtn = document.querySelector(".btn.success");
    const warningBtn = document.querySelector(".btn.warning");
    const errorBtn = document.querySelector(".btn.error");

    const colorPickers = document.querySelectorAll(".color-input");
    
    darkBtn.addEventListener("click", () => {
        document.body.classList.remove("light");
        document.body.classList.add("dark");

        darkBtn.classList.remove("btn-inverse");
        darkBtn.classList.add("active");
        
        lightBtn.classList.add("btn-inverse");
        lightBtn.classList.remove("active");
    });
    
    lightBtn.addEventListener("click", () => {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        
        darkBtn.classList.add("btn-inverse");
        darkBtn.classList.remove("active");

        lightBtn.classList.remove("btn-inverse");
        lightBtn.classList.add("active");
    });

    // contextual labels
    const notifyFn = (type) => () => {
        document.querySelector(".notification-box").setAttribute("class", `notification-box ${type}`);
    };

    infoBtn.addEventListener("click", notifyFn("info"));
    successBtn.addEventListener("click", notifyFn("success"));
    warningBtn.addEventListener("click", notifyFn("warning"));
    errorBtn.addEventListener("click", notifyFn("error"));

    // color pickers
    Array.from(colorPickers).forEach((picker) => {
        picker.addEventListener("change" ,() => {
            document.documentElement.style.setProperty("--c-primary", colorPickers[0].value);
            document.documentElement.style.setProperty("--c-primary-accent", colorPickers[1].value);
            document.documentElement.style.setProperty("--c-secondary", colorPickers[2].value);
            document.documentElement.style.setProperty("--c-secondary-accent", colorPickers[3].value);
        });
    })
})()