"use strict";
var Station4;
(function (Station4) {
    window.addEventListener("load", handleLoad);
    let next;
    let question1;
    let question2;
    let question3;
    let current = 1;
    function handleLoad() {
        setup();
        question1 = document.querySelector("#question1");
        question2 = document.querySelector("#question2");
        question3 = document.querySelector("#question3");
        question1.addEventListener("pointerdown", handleDown);
        question2.addEventListener("pointerdown", handleDown);
        question3.addEventListener("pointerdown", handleDown);
        question2.style.display = "none";
        question3.style.display = "none";
    }
    function handleDown(_event) {
        console.log(_event.target);
        let target = _event.target;
        let currentPoints = Number(localStorage.getItem("station4"));
        if (target.nodeName == "P") {
            next.style.display = "block";
            if (target.classList.contains("true")) {
                target.classList.add("right");
                localStorage.setItem("station4", currentPoints + 3 + "");
            }
            else {
                target.classList.add("wrong");
                localStorage.setItem("station4", currentPoints + 1 + "");
                if (current == 1) {
                    let rightAns = question1.querySelector(".true");
                    rightAns.classList.add("florian");
                }
                if (current == 2) {
                    let rightAns = question2.querySelector(".true");
                    rightAns.classList.add("florian");
                }
                if (current == 3) {
                    let rightAns = question3.querySelector(".true");
                    rightAns.classList.add("florian");
                }
            }
            if (current == 1)
                question1.removeEventListener("pointerdown", handleDown);
            else if (current == 2)
                question2.removeEventListener("pointerdown", handleDown);
            else if (current == 3)
                question3.removeEventListener("pointerdown", handleDown);
            current++;
        }
    }
    function change() {
        console.log(current);
        switch (current) {
            case 2:
                question1.style.display = "none";
                question2.style.display = "block";
                next.style.display = "none";
                break;
            case 3:
                question2.style.display = "none";
                question3.style.display = "block";
                next.style.display = "none";
                break;
            case 4:
                next.setAttribute("href", "score.html");
                final();
                break;
        }
    }
    function setup() {
        localStorage.setItem("station4", "0");
        let div = document.querySelector(".contentWrapper");
        div.style.height = window.innerHeight + "px";
        next = document.querySelector(".next");
        next.style.display = "none";
        next.addEventListener("pointerdown", change);
        document.body.style.marginLeft = 0 + "px";
        document.body.style.marginRight = 0 + "px";
    }
    function final() {
        let station1 = Number(localStorage.getItem("station1"));
        let station2 = Number(localStorage.getItem("station2"));
        let station22 = Number(localStorage.getItem("station22"));
        let station3 = Number(localStorage.getItem("station3"));
        let station4 = Number(localStorage.getItem("station4"));
        localStorage.setItem("points", station1 + station2 + station22 + station3 + station4 + "");
        localStorage.setItem("current", "4");
    }
})(Station4 || (Station4 = {}));
//# sourceMappingURL=station4.js.map