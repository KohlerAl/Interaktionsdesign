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
        localStorage.setItem("station1", "0");
    }
    function handleDown(_event) {
        let x = _event.clientX;
        let y = _event.clientY;
        btn.style.display = "block";
        localStorage.setItem("current", "1");
        if (x > 150 && x < 240 && y > 320 && y < 380 && tries > 0) {
            btn.innerHTML = "Genau! Hier liegt der Feldberg.";
            btn.classList.add("right");
            if (btn.classList.contains("wrong"))
                btn.classList.remove("wrong");
            if (tries == 3) {
                localStorage.setItem("station1", "10");
            }
            else if (tries == 2) {
                localStorage.setItem("station1", "8");
            }
            else if (tries == 1) {
                localStorage.setItem("station1", "6");
            }
            img.removeEventListener("pointerdown", handleDown);
            console.log(localStorage.getItem("station1"));
            next.style.display = "block";
            final();
        }
        else {
            btn.innerHTML = "Nicht ganz, schau Dir die Aussicht nochmal genauer an.";
            btn.classList.add("wrong");
            tries--;
            if (tries == 0) {
                localStorage.setItem("station1", "2");
                img.removeEventListener("pointerdown", handleDown);
                next.style.display = "block";
                final();
            }
        }
    }
    function final() {
        let station = Number(localStorage.getItem("station1"));
        localStorage.setItem("points", station + "");
        localStorage.setItem("current", "1");
    }
})(station1 || (station1 = {}));
//# sourceMappingURL=station1.js.map