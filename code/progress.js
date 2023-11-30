"use strict";
var Progress;
(function (Progress) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let prog = document.querySelector("progress");
        prog.style.top = window.innerHeight - 30 + "px";
        let next = document.querySelector(".next");
        next.style.top = window.innerHeight - 75 + "px";
    }
})(Progress || (Progress = {}));
//# sourceMappingURL=progress.js.map