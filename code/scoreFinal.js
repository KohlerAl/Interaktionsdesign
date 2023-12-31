"use strict";
var scoreFinal;
(function (scoreFinal) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        console.log(localStorage.getItem("points"));
        let points = document.querySelector("#score");
        points.innerHTML = localStorage.getItem("points") + "";
        let div = document.querySelector("div");
        div.style.height = window.innerHeight + "px";
        document.body.style.margin = 0 + "px";
    }
})(scoreFinal || (scoreFinal = {}));
//# sourceMappingURL=scoreFinal.js.map