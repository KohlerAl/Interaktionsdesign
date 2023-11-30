"use strict";
var Station2_2;
(function (Station2_2) {
    window.addEventListener("load", handleLoad);
    let question1;
    let question2;
    let question3;
    let question4;
    let answer1 = false;
    let answer2 = false;
    let answer3 = false;
    let answer4 = false;
    let current = 1;
    function handleLoad() {
        localStorage.setItem("station22", "0");
        question1 = document.querySelector("#question1");
        question2 = document.querySelector("#question2");
        question3 = document.querySelector("#question3");
        question4 = document.querySelector("#question4");
        question1.addEventListener("pointerdown", handleDown);
        question2.addEventListener("pointerdown", handleDown);
        question3.addEventListener("pointerdown", handleDown);
        question4.addEventListener("pointerdown", handleDown);
        question2.style.display = "none";
        question3.style.display = "none";
        question4.style.display = "none";
    }
    function handleDown(_event) {
        console.log(_event.target);
    }
})(Station2_2 || (Station2_2 = {}));
//# sourceMappingURL=station2_2.js.map