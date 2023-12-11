"use strict";
var Station10;
(function (Station10) {
    window.addEventListener("load", handleLoad);
    let fbBtn;
    let next;
    let instance;
    let pointCount = 15;
    function handleLoad() {
        setup();
        instance = new DragDrop();
    }
    class DragDrop {
        parentContainer;
        containerA;
        containerB;
        containerC;
        containerD;
        containerE;
        button;
        imgcontainer;
        lastID;
        isDragging = false;
        aRect = [];
        bRect = [];
        cRect = [];
        dRect = [];
        eRect = [];
        mouseMover;
        constructor() {
            this.parentContainer = document.querySelector("#dragdropBox");
            this.containerA = this.parentContainer.querySelector("#drop1");
            this.containerB = this.parentContainer.querySelector("#drop2");
            this.containerC = this.parentContainer.querySelector("#drop3");
            this.containerD = this.parentContainer.querySelector("#drop4");
            this.containerE = this.parentContainer.querySelector("#drop5");
            this.mouseMover = document.querySelector("#touchMover");
            this.parentContainer.addEventListener("touchmove", this.allowDrop);
            this.parentContainer.addEventListener("touchend", this.drop);
            this.imgcontainer = this.parentContainer.querySelector("#imagesCont");
            instance = this;
            this.getRects();
            this.createDrag();
        }
        getRects() {
            let pos = this.containerA.getBoundingClientRect();
            this.aRect = [pos.x, pos.y, pos.x + pos.width, pos.y + pos.height];
            let posB = this.containerB.getBoundingClientRect();
            this.bRect = [posB.x, posB.y, posB.x + posB.width, posB.y + posB.height];
            let posC = this.containerC.getBoundingClientRect();
            this.cRect = [posC.x, posC.y, posC.x + posC.width, posC.y + posC.height];
            let posD = this.containerD.getBoundingClientRect();
            this.dRect = [posD.x, posD.y, posD.x + posD.width, posD.y + posD.height];
            let posE = this.containerE.getBoundingClientRect();
            this.eRect = [posE.x, posE.y, posE.x + posE.width, posE.y + posE.height];
        }
        createDrag() {
            new DragElement(instance.parentContainer.querySelector("#dragA"));
            new DragElement(instance.parentContainer.querySelector("#dragB"));
            new DragElement(instance.parentContainer.querySelector("#dragC"));
            new DragElement(instance.parentContainer.querySelector("#dragD"));
            new DragElement(instance.parentContainer.querySelector("#dragE"));
        }
        allowDrop(_event) {
            let target = _event.target;
            if (target.children.length == 0) {
                _event.preventDefault();
            }
            instance.mouseMover.style.top = _event.changedTouches[0].clientY + 5 + "px";
            instance.mouseMover.style.left = _event.changedTouches[0].clientX + 5 + "px";
        }
        drop(_event) {
            _event.preventDefault();
            instance.mouseMover.style.display = "none";
            let trigger = instance.parentContainer.querySelector("#" + instance.lastID);
            if (instance.isDragging && instance.containerA.children.length == 0 && instance.checkInside(instance.aRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY)) {
                instance.containerA.appendChild(trigger);
                instance.isDragging = false;
            }
            else if (instance.isDragging && instance.containerB.children.length == 0 && instance.checkInside(instance.bRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY)) {
                instance.containerB.appendChild(trigger);
                instance.isDragging = false;
            }
            else if (instance.isDragging && instance.containerC.children.length == 0 && instance.checkInside(instance.cRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY)) {
                instance.containerC.appendChild(trigger);
                instance.isDragging = false;
            }
            else if (instance.isDragging && instance.containerD.children.length == 0 && instance.checkInside(instance.dRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY)) {
                instance.containerD.appendChild(trigger);
                instance.isDragging = false;
            }
            else if (instance.isDragging && instance.containerE.children.length == 0 && instance.checkInside(instance.eRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY)) {
                instance.containerE.appendChild(trigger);
                instance.isDragging = false;
            }
            else if (instance.isDragging) {
                instance.imgcontainer.appendChild(trigger);
                instance.isDragging = false;
            }
            if (instance.imgcontainer.children.length == 0) {
                instance.check();
            }
        }
        check() {
            let aChild = instance.containerA.querySelector("p");
            let bChild = instance.containerB.querySelector("p");
            let cChild = instance.containerC.querySelector("p");
            let dChild = instance.containerD.querySelector("p");
            let eChild = instance.containerE.querySelector("p");
            if (!aChild.classList.contains("contA")) {
                instance.imgcontainer.appendChild(aChild);
                instance.timeoutWiggle(aChild);
                pointCount -= 1;
            }
            if (!bChild.classList.contains("contB")) {
                instance.imgcontainer.appendChild(bChild);
                instance.timeoutWiggle(bChild);
                pointCount -= 1;
            }
            if (!cChild.classList.contains("contC")) {
                instance.imgcontainer.appendChild(cChild);
                instance.timeoutWiggle(cChild);
                pointCount -= 1;
            }
            if (!dChild.classList.contains("contD")) {
                instance.imgcontainer.appendChild(dChild);
                instance.timeoutWiggle(dChild);
                pointCount -= 1;
            }
            if (!eChild.classList.contains("contE")) {
                instance.imgcontainer.appendChild(eChild);
                instance.timeoutWiggle(eChild);
                pointCount -= 1;
            }
            if (instance.imgcontainer.children.length == 0) {
                localStorage.setItem("station10", pointCount + "");
                instance.containerA.classList.add("right");
                instance.containerB.classList.add("right");
                instance.containerC.classList.add("right");
                instance.containerD.classList.add("right");
                instance.containerE.classList.add("right");
                final();
                next.style.display = "block";
            }
        }
        timeoutWiggle(_ele) {
            _ele.classList.add("wiggle");
            window.setTimeout(function () {
                _ele.classList.remove("wiggle");
            }, 2500);
        }
        checkInside(_rect, _x, _y) {
            if (_x > _rect[0] && _x < _rect[2] && _y > _rect[1] && _y < _rect[3]) {
                return true;
            }
            else
                return false;
        }
    }
    Station10.DragDrop = DragDrop;
    class DragElement {
        htmlElement;
        constructor(_ele) {
            this.htmlElement = _ele;
            this.htmlElement.addEventListener("touchstart", this.drag);
        }
        drag(_event) {
            _event.preventDefault();
            instance.mouseMover.style.display = "block";
            let target = _event.target;
            instance.lastID = target.id;
            instance.isDragging = true;
            instance.mouseMover.style.top = _event.changedTouches[0].clientY + 3 + "px";
            instance.mouseMover.style.left = _event.changedTouches[0].clientX + 3 + "px";
            instance.mouseMover.appendChild(document.querySelector("#" + target.id));
        }
    }
    Station10.DragElement = DragElement;
    function setup() {
        localStorage.setItem("station9", "0");
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
        let station9 = Number(localStorage.getItem("station9"));
        localStorage.setItem("points", station1 + station2 + station22 + station3 + station4 + station5 + station6 + station7 + station72 + station8 + station9 + "");
        localStorage.setItem("current", "9");
    }
})(Station10 || (Station10 = {}));
//# sourceMappingURL=station10.js.map