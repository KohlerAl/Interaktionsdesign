"use strict";
var DragDropFourBoxes;
(function (DragDropFourBoxes) {
    window.addEventListener("load", handleLoad);
    let instance;
    function handleLoad() {
        instance = new DragDrop();
    }
    class DragDrop {
        parentContainer;
        containerA;
        containerB;
        containerC;
        containerD;
        button;
        imgcontainer;
        lastID;
        isDragging = false;
        aRect = [];
        bRect = [];
        cRect = [];
        dRect = [];
        mouseMover;
        constructor() {
            this.parentContainer = document.querySelector("#dragdropBox");
            this.containerA = this.parentContainer.querySelector("#drop1");
            this.containerB = this.parentContainer.querySelector("#drop2");
            this.containerC = this.parentContainer.querySelector("#drop3");
            this.containerD = this.parentContainer.querySelector("#drop4");
            this.mouseMover = document.querySelector("#touchMover");
            this.parentContainer.addEventListener("touchmove", this.allowDrop);
            this.parentContainer.addEventListener("touchend", this.drop);
            this.imgcontainer = this.parentContainer.querySelector("#imagesCont");
            this.button = this.parentContainer.querySelector("#controlButton");
            this.button.addEventListener("pointerdown", this.check);
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
        }
        createDrag() {
            new DragElement(instance.parentContainer.querySelector("#dragA"));
            new DragElement(instance.parentContainer.querySelector("#dragB"));
            new DragElement(instance.parentContainer.querySelector("#dragC"));
            new DragElement(instance.parentContainer.querySelector("#dragD"));
        }
        allowDrop(_event) {
            let target = _event.target;
            if (target.children.length == 0) {
                _event.preventDefault();
            }
            instance.mouseMover.style.top = _event.changedTouches[0].clientY + 10 + "px";
            instance.mouseMover.style.left = _event.changedTouches[0].clientX + 10 + "px";
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
            else if (instance.isDragging) {
                instance.imgcontainer.appendChild(trigger);
                instance.isDragging = false;
            }
        }
        check() {
            let aChild = instance.containerA.querySelector("img");
            let bChild = instance.containerB.querySelector("img");
            let cChild = instance.containerC.querySelector("img");
            let dChild = instance.containerD.querySelector("img");
            if (!aChild.classList.contains("contA")) {
                instance.imgcontainer.appendChild(aChild);
                instance.timeoutWiggle(aChild);
            }
            if (!bChild.classList.contains("contB")) {
                instance.imgcontainer.appendChild(bChild);
                instance.timeoutWiggle(bChild);
            }
            if (!cChild.classList.contains("contC")) {
                instance.imgcontainer.appendChild(cChild);
                instance.timeoutWiggle(cChild);
            }
            if (!dChild.classList.contains("contD")) {
                instance.imgcontainer.appendChild(dChild);
                instance.timeoutWiggle(dChild);
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
    DragDropFourBoxes.DragDrop = DragDrop;
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
            instance.mouseMover.style.top = _event.changedTouches[0].clientY + 10 + "px";
            instance.mouseMover.style.left = _event.changedTouches[0].clientX + 10 + "px";
            instance.mouseMover.appendChild(document.querySelector("#" + target.id));
        }
    }
    DragDropFourBoxes.DragElement = DragElement;
})(DragDropFourBoxes || (DragDropFourBoxes = {}));
//# sourceMappingURL=DragDropFourBoxes.js.map