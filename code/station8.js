"use strict";
var Station8;
(function (Station8) {
    let next;
    let fbBtn;
    let pointCount = 10;
    let wrapper;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        setup();
        wrapper = document.querySelector("#moleBtnWrapper");
        wrapper.addEventListener("pointerdown", handleClick);
    }
    function handleClick(_event) {
        let target = _event.target;
        if (target.classList.contains("true")) {
            next.style.display = "block";
            target.classList.add("right");
            localStorage.setItem("station8", pointCount + "");
            wrapper.removeEventListener("pointerdown", handleClick);
            final();
        }
        else {
            target.classList.add("wrong");
            pointCount -= 2;
        }
    }
    function setup() {
        localStorage.setItem("station8", "0");
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
        let station8 = Number(localStorage.getItem("station8"));
        localStorage.setItem("points", station1 + station2 + station22 + station3 + station4 + station5 + station6 + station7 + station72 + station8 + "");
        localStorage.setItem("current", "8");
    }
})(Station8 || (Station8 = {}));
//# sourceMappingURL=station8.js.map