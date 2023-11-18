"use strict";
var Question;
(function (Question) {
    window.addEventListener("load", handleLoad);
    let hasBeenClicked = false;
    function handleLoad() {
        let allQuestions = document.querySelectorAll(".answerWrapper");
        for (let i = 0; i < allQuestions.length; i++) {
            allQuestions[i].addEventListener("touchstart", handleTouch);
        }
    }
    function handleTouch(_event) {
        let target = _event.target;
        if (hasBeenClicked == false) {
            if (target.classList.contains("right")) {
                target.classList.add("rightAnswer");
            }
            else {
                target.classList.add("wrongAnswer");
                let right = document.querySelector(".right");
                right.classList.add("hint");
                right.classList.add("wiggle");
                window.setTimeout(function () {
                    right.classList.remove("wiggle");
                }, 2500);
            }
            hasBeenClicked = true;
        }
    }
})(Question || (Question = {}));
//# sourceMappingURL=Question.js.map