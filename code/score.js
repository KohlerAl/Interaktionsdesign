"use strict";
var score;
(function (score) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        console.log(localStorage.getItem("points"));
        let points = document.querySelector("#score");
        points.innerHTML = localStorage.getItem("points") + "";
        let div = document.querySelector("div");
        div.style.height = window.innerHeight + "px";
        document.body.style.margin = 0 + "px";
        let current = Number(localStorage.getItem("current"));
        current++;
        console.log(current);
        let a = document.querySelector(".next");
        a.setAttribute("href", "station" + current + "_1.html");
    }
})(score || (score = {}));
//# sourceMappingURL=score.js.map