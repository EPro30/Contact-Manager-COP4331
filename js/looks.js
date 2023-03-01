function styling() {
    r = document.querySelector(":root");
    rs = getComputedStyle(r);

    // styleSheet = document.getElementById('custom')
    // colors
    mode = localStorage.getItem("mode");
    colorA = localStorage.getItem("colorA");
    colorB = localStorage.getItem("colorB");
    dyslexicFont = localStorage.getItem("dyslexicFont");
    fontSize = localStorage.getItem("fontSize");
    style = [];
    styleBg = "radial-gradient(" + String(colorA) + "," + String(colorB) + ")";
    if (colorA === null) {
        r.style.setProperty("--colorA", "#FFB6C1");
        localStorage.setItem("colorA", "#FFB6C1");
    } else {
        r.style.setProperty("--colorA", colorA);
    }
    if (colorB === null) {
        r.style.setProperty("--colorB", "#87cefa");
        localStorage.setItem("colorB", "#87cefa");
    } else {
        r.style.setProperty("--colorB", colorB);
    }
    if (fontSize === null) {
        r.style.setProperty("--fontSize", "16px");
        localStorage.setItem("fontSize", 16);
    } else {
        r.style.setProperty("--fontSize", String(fontSize) + "px");
    }
    //  console.log(fontSize)

    if (colorB === null || colorA === null) {
        styleBg =
            "radial-gradient(" + "light pink" + "," + "light sky blue" + ")";
    }

    r.style.setProperty("--bg", styleBg);
    //  console.log(dyslexicFont);
    if (dyslexicFont == "true") {
        body = document.getElementsByTagName("body");
        for (element of body) {
            const list = element.classList;
            list.add("access");
        }
    } else {
        body = document.getElementsByTagName("body");
        for (element of body) {
            const list = element.classList;
            list.remove("access");
        }
    }
    // console.log(mode);
    if (mode == "dark" || mode === null) {
        r.style.setProperty("--fontColor", "#ffffff");
        data = document.getElementsByTagName("html");
        for (element of data) {
            element.setAttribute("data-bs-theme", "dark");
        }
        bg = document.getElementsByClassName("bg-light");
        for (element of bg) {
            const list = element.classList;
            list.add("bg-dark");
            list.remove("bg-light");
        }
    } else {
        r.style.setProperty("--fontColor", "#0000");
        data = document.getElementsByTagName("html");
        for (element of data) {
            element.setAttribute("data-bs-theme", "light");
        }
        bg = document.getElementsByClassName("bg-dark");
        for (element of bg) {
            const list = element.classList;
            list.remove("bg-dark");
            list.add("bg-light");
        }
    }
}

function getLook() {
    // gradient
    let colorA = document.getElementById("colorA").value;
    localStorage.setItem("colorA", colorA);
    let colorB = document.getElementById("colorB").value;
    localStorage.setItem("colorB", colorB);
    // fontsize
    let fontSize = document.forms["looks"]["fontSize"].value;
    localStorage.setItem("fontSize", fontSize);
    // font
    let dyslexicFont = document.forms["looks"]["dyslexicFont"].checked;
    localStorage.setItem("dyslexicFont", dyslexicFont);
    let mode = document.forms["looks"]["mode"].value;
    localStorage.setItem("mode", mode);
}

function setIntialColors() {
    // console.log(localStorage.getItem("mainColor"))
    // document.getElementById("mainColor").setAttribute("value", String(localStorage.getItem("mainColor")));
    document
        .getElementById("colorA")
        .setAttribute("value", localStorage.getItem("colorA"));
    document
        .getElementById("colorB")
        .setAttribute("value", localStorage.getItem("colorB"));

    document
        .getElementById("fontSize")
        .setAttribute("value", localStorage.getItem("fontSize"));

    if (localStorage.getItem("dyslexicFont") == "true") {
        document.getElementById("dyslexicFont").checked = true;
    } else {
        document.getElementById("dyslexicFont").checked = false;
    }

    if (localStorage.getItem("mode") == "light") {
        document.getElementById("mode").selectedIndex = 1;
        document.getElementById("mode").value = "light";
    } else {
        document.getElementById("mode").selectedIndex = 0;
        document.getElementById("mode").value = "dark";
    }
}
