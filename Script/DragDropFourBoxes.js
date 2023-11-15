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
        constructor() {
            this.parentContainer = document.querySelector("#dragdropBox");
            this.containerA = this.parentContainer.querySelector("#drop1");
            this.containerB = this.parentContainer.querySelector("#drop2");
            this.containerC = this.parentContainer.querySelector("#drop3");
            this.containerD = this.parentContainer.querySelector("#drop4");
            this.containerA.addEventListener("dragover", this.allowDrop);
            this.containerA.addEventListener("drop", this.drop);
            this.containerB.addEventListener("dragover", this.allowDrop);
            this.containerB.addEventListener("drop", this.drop);
            this.containerC.addEventListener("dragover", this.allowDrop);
            this.containerC.addEventListener("drop", this.drop);
            this.containerD.addEventListener("dragover", this.allowDrop);
            this.containerD.addEventListener("drop", this.drop);
            this.imgcontainer = this.parentContainer.querySelector("#imagesCont");
            this.button = this.parentContainer.querySelector("#controlButton");
            this.button.addEventListener("pointerdown", this.check);
            instance = this;
            this.createDrag();
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
        }
        drop(_event) {
            _event.preventDefault();
            let target = _event.target;
            if (target.tagName == "DIV") {
                let data = _event.dataTransfer.getData("text");
                let trigger = instance.parentContainer.querySelector("#" + data);
                if (_event.target.children.length == 0)
                    _event.target.appendChild(trigger);
                else
                    instance.imgcontainer.appendChild(trigger);
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
    }
    DragDropFourBoxes.DragDrop = DragDrop;
    class DragElement {
        htmlElement;
        constructor(_ele) {
            this.htmlElement = _ele;
            this.htmlElement.addEventListener("dragstart", this.drag);
        }
        drag(_event) {
            _event.dataTransfer.setData("text", _event.target.id);
        }
    }
    DragDropFourBoxes.DragElement = DragElement;
})(DragDropFourBoxes || (DragDropFourBoxes = {}));
//# sourceMappingURL=DragDropFourBoxes.js.map