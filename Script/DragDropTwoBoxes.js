"use strict";
var DragDropTwoBoxes;
(function (DragDropTwoBoxes) {
    window.addEventListener("load", handleLoad);
    let instance;
    function handleLoad() {
        instance = new DragDrop();
    }
    class DragDrop {
        parentContainer;
        containerA;
        containerB;
        button;
        imgcontainer;
        lastID;
        isDragging = false;
        aRect = [];
        bRect = [];
        mouseMover;
        constructor() {
            this.parentContainer = document.querySelector("#dragdropContainer");
            this.containerA = this.parentContainer.querySelector("#dropA");
            this.containerB = this.parentContainer.querySelector("#dropB");
            this.mouseMover = document.querySelector("#touchMover");
            this.parentContainer.addEventListener("touchmove", this.over);
            this.parentContainer.addEventListener("touchend", this.drop);
            this.button = this.parentContainer.querySelector("#checkButton");
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
        }
        createDrag() {
            new DragElement(instance.parentContainer.querySelector("#drag1"));
            new DragElement(instance.parentContainer.querySelector("#drag2"));
            new DragElement(instance.parentContainer.querySelector("#drag3"));
        }
        over(_event) {
            _event.preventDefault();
            instance.mouseMover.style.top = _event.changedTouches[0].clientY + 10 + "px";
            instance.mouseMover.style.left = _event.changedTouches[0].clientX + 10 + "px";
        }
        drop(_event) {
            _event.preventDefault();
            instance.mouseMover.style.display = "none";
            let trigger = instance.parentContainer.querySelector("#" + instance.lastID);
            console.log(trigger);
            if (instance.isDragging && instance.checkInside(instance.aRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY)) {
                instance.containerA.appendChild(trigger);
                instance.isDragging = false;
            }
            else if ((instance.isDragging && instance.checkInside(instance.bRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY))) {
                instance.containerB.appendChild(trigger);
                instance.isDragging = false;
            }
            else if (instance.isDragging) {
                instance.imgcontainer.appendChild(trigger);
                instance.isDragging = false;
            }
        }
        check() {
            let allAchildren = instance.containerA.children;
            for (let ele of allAchildren) {
                if (ele.classList.contains("contB")) {
                    instance.parentContainer.appendChild(ele);
                    ele.classList.add("wiggle");
                    window.setTimeout(function () {
                        ele.classList.remove("wiggle");
                    }, 2500);
                }
            }
            let allBchildren = instance.containerB.children;
            for (let ele of allBchildren) {
                if (ele.classList.contains("contA")) {
                    instance.parentContainer.appendChild(ele);
                    instance.timeoutWiggle(ele);
                }
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
    DragDropTwoBoxes.DragDrop = DragDrop;
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
    DragDropTwoBoxes.DragElement = DragElement;
})(DragDropTwoBoxes || (DragDropTwoBoxes = {}));
//# sourceMappingURL=DragDropTwoBoxes.js.map