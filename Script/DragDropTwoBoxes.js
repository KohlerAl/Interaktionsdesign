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
        constructor() {
            this.parentContainer = document.querySelector("#dragdropContainer");
            this.containerA = this.parentContainer.querySelector("#dropA");
            this.containerB = this.parentContainer.querySelector("#dropB");
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
        }
        drop(_event) {
            _event.preventDefault();
            console.log(instance.isDragging);
            if (instance.isDragging && instance.checkInside(instance.aRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY)) {
                let trigger = instance.parentContainer.querySelector("#" + instance.lastID);
                instance.containerA.appendChild(trigger);
                instance.isDragging = false;
            }
            else if ((instance.isDragging && instance.checkInside(instance.bRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY))) {
                let trigger = instance.parentContainer.querySelector("#" + instance.lastID);
                instance.containerB.appendChild(trigger);
                console.log("aaaaaaaaaaaaaaaaa");
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
            this.htmlElement.addEventListener("pointerdown", this.drag);
        }
        drag(_event) {
            console.log("drag");
            _event.preventDefault();
            instance.lastID = _event.target.id;
            instance.isDragging = true;
        }
    }
    DragDropTwoBoxes.DragElement = DragElement;
})(DragDropTwoBoxes || (DragDropTwoBoxes = {}));
//# sourceMappingURL=DragDropTwoBoxes.js.map