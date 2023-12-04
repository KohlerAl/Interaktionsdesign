"use strict";
var Station6;
(function (Station6) {
    window.addEventListener("load", handleLoad);
    let next;
    let fbBtn;
    let memoryBox;
    let isOneturned = false;
    let firstClicked;
    function handleLoad() {
        setup();
        memoryBox = document.querySelector("#memoryBox");
        let arr = Array.from(memoryBox.childNodes);
        for (let child of arr) {
            if (child instanceof HTMLElement)
                child.addEventListener("pointerdown", check);
        }
    }
    function check(_event) {
        let target = _event.target;
        if (!isOneturned) {
            let img = target.querySelector("img");
            img.style.display = "initial";
            firstClicked = target;
            isOneturned = true;
            target.removeEventListener("pointerdown", check);
        }
        else if (isOneturned) {
            let img = target.querySelector("img");
            img.style.display = "initial";
            if (firstClicked.classList[1] == target.classList[1]) {
                target.removeEventListener("pointerdown", check);
            }
            else {
                firstClicked.addEventListener("pointerdown", check);
                let firstImg = firstClicked.querySelector("img");
                firstImg.style.display = "none";
                img.style.display = "none";
            }
        }
    }
    function setup() {
        localStorage.setItem("station6", "0");
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
        localStorage.setItem("points", station1 + station2 + station22 + station3 + station4 + "");
        localStorage.setItem("current", "4");
    }
})(Station6 || (Station6 = {}));
//# sourceMappingURL=station6.js.map