"use strict";
var Station7_2;
(function (Station7_2) {
    window.addEventListener("load", handleLoad);
    let next;
    let fbBtn;
    let allClicked = [];
    let allright = 0;
    let done = false;
    let pointCount = 15;
    function handleLoad() {
        setup();
        let clickyBox = document.querySelector("#gameContainer");
        let allClickies = Array.from(clickyBox.children);
        for (let ele of allClickies) {
            ele.addEventListener("pointerdown", function () {
                if (!ele.classList.contains("clicked") && !ele.classList.contains("right")) {
                    ele.classList.add("clicked");
                    allClicked.push(ele);
                }
            });
        }
        let btn = document.querySelector("#checkButton");
        btn.addEventListener("pointerdown", check);
    }
    function check() {
        allright = 0;
        if (!done) {
            for (let ele of Array.from(allClicked)) {
                if (ele.classList.contains("true")) {
                    ele.classList.add("right");
                    ele.classList.remove("clicked");
                    allright++;
                }
                else {
                    ele.classList.add("wrong");
                    ele.classList.remove("clicked");
                    let index = allClicked.indexOf(ele);
                    allClicked.splice(index, 1);
                    fbBtn.style.display = "block";
                    fbBtn.innerHTML = "Noch nicht ganz!";
                    pointCount -= 2;
                    if (pointCount <= 0) {
                        pointCount = 0;
                    }
                }
            }
            if (allright == 10) {
                next.style.display = "block";
                localStorage.setItem("station72", pointCount + "");
                done = true;
                fbBtn.style.display = "block";
                fbBtn.innerHTML = "Super, alles richtig!";
                final();
            }
        }
    }
    function setup() {
        localStorage.setItem("station72", "0");
        fbBtn = document.querySelector(".feedbackBtn");
        fbBtn.style.display = "none";
        let div = document.querySelector(".contentWrapper");
        div.style.height = window.innerHeight + "px";
        next = document.querySelector(".next");
        next.style.display = "none";
        document.body.style.marginLeft = 0 + "px";
        document.body.style.marginRight = 0 + "px";
    }
    function final() {
        let station1 = Number(localStorage.getItem("station1"));
        let station2 = Number(localStorage.getItem("station2"));
        let station22 = Number(localStorage.getItem("station22"));
        let station3 = Number(localStorage.getItem("station3"));
        let station4 = Number(localStorage.getItem("station4"));
        let station5 = Number(localStorage.getItem("station5"));
        let station6 = Number(localStorage.getItem("station6"));
        let station7 = Number(localStorage.getItem("station7"));
        let station72 = Number(localStorage.getItem("station72"));
        console.log(pointCount);
        localStorage.setItem("points", station1 + station2 + station22 + station3 + station4 + station5 + station6 + station7 + station72 + "");
        localStorage.setItem("current", "7");
    }
})(Station7_2 || (Station7_2 = {}));
//# sourceMappingURL=station7_2.js.map