"use strict";
var station1;
(function (station1) {
    window.addEventListener("load", handleLoad);
    let btn;
    let img;
    let tries = 3;
    let next;
    function handleLoad() {
        btn = document.querySelector(".feedbackBtn");
        img = document.querySelector("img");
        img.addEventListener("pointerdown", handleDown);
        document.body.style.marginLeft = 0 + "px";
        document.body.style.marginRight = 0 + "px";
        btn.style.display = "none";
        next = document.querySelector(".next");
        next.style.display = "none";
        let div = document.querySelector("div");
        div.style.height = window.innerHeight + "px";
    }
    function handleDown(_event) {
        let x = _event.clientX;
        let y = _event.clientY;
        btn.style.display = "block";
        if (x > 150 && x < 240 && y > 320 && y < 380 && tries > 0) {
            btn.innerHTML = "Genau! Hier liegt der Feldberg.";
            btn.classList.add("right");
            if (btn.classList.contains("wrong"))
                btn.classList.remove("wrong");
            if (tries == 3) {
                localStorage.setItem("points", "10");
            }
            else if (tries == 2) {
                localStorage.setItem("points", "8");
            }
            else if (tries == 1) {
                localStorage.setItem("points", "6");
            }
            img.removeEventListener("pointerdown", handleDown);
            console.log(localStorage.getItem("points"));
            next.style.display = "block";
        }
        else {
            btn.innerHTML = "Nicht ganz, schau Dir die Aussicht nochmal genauer an.";
            btn.classList.add("wrong");
            tries--;
            if (tries == 0) {
                localStorage.setItem("points", "2");
                img.removeEventListener("pointerdown", handleDown);
                next.style.display = "block";
            }
        }
    }
})(station1 || (station1 = {}));
//# sourceMappingURL=station1.js.map