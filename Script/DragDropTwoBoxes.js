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
        constructor() {
            this.parentContainer = document.querySelector("#dragdropContainer");
            this.containerA = this.parentContainer.querySelector("#dropA");
            this.containerB = this.parentContainer.querySelector("#dropB");
            this.containerA.addEventListener("pointerover", this.drop);
            this.containerB.addEventListener("pointerover", this.drop);
            this.containerA.addEventListener("pointerup", this.drop);
            this.containerB.addEventListener("pointerup", this.drop);
            this.button = this.parentContainer.querySelector("#checkButton");
            this.button.addEventListener("pointerdown", this.check);
            instance = this;
            this.createDrag();
        }
        createDrag() {
            new DragElement(instance.parentContainer.querySelector("#drag1"));
            new DragElement(instance.parentContainer.querySelector("#drag2"));
            new DragElement(instance.parentContainer.querySelector("#drag3"));
        }
        drop(_event) {
            _event.preventDefault();
            if (instance.isDragging) {
                let trigger = instance.parentContainer.querySelector("#" + instance.lastID);
                //Error Handling: Not allowing wrong drags
                /* if (trigger.classList.contains("contA") && _event.target.id == "dropA" || trigger.classList.contains("contB") && _event.target.id == "dropB") {
                    _event.target.appendChild(trigger);
                } */
                _event.target.appendChild(trigger);
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
    }
    DragDropTwoBoxes.DragDrop = DragDrop;
    class DragElement {
        htmlElement;
        constructor(_ele) {
            this.htmlElement = _ele;
            this.htmlElement.addEventListener("pointerdown", this.drag);
        }
        drag(_event) {
            _event.preventDefault();
            instance.lastID = _event.target.id;
            instance.isDragging = true;
        }
    }
    DragDropTwoBoxes.DragElement = DragElement;
})(DragDropTwoBoxes || (DragDropTwoBoxes = {}));
//# sourceMappingURL=DragDropTwoBoxes.js.map