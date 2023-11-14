"use strict";
var Interaktionsdesign;
(function (Interaktionsdesign) {
    window.addEventListener("load", handleLoad);
    let instance;
    function handleLoad() {
        instance = new DragDrop();
        console.log("load");
    }
    class DragDrop {
        parentContainer;
        containerA;
        containerB;
        button;
        imgcontainer;
        constructor() {
            this.parentContainer = document.querySelector("#dragdropContainer");
            this.containerA = this.parentContainer.querySelector("#dropA");
            this.containerB = this.parentContainer.querySelector("#dropB");
            this.containerA.addEventListener("dragover", this.allowDrop);
            this.containerA.addEventListener("drop", this.drop);
            this.containerB.addEventListener("dragover", this.allowDrop);
            this.containerB.addEventListener("drop", this.drop);
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
        allowDrop(_event) {
            _event.preventDefault();
        }
        drop(_event) {
            _event.preventDefault();
            let data = _event.dataTransfer.getData("text");
            console.log(_event.target.id);
            let trigger = instance.parentContainer.querySelector("#" + data);
            //Error Handling: Not allowing wrong drags
            /* if (trigger.classList.contains("contA") && _event.target.id == "dropA" || trigger.classList.contains("contB") && _event.target.id == "dropB") {
                _event.target.appendChild(trigger);
            } */
            _event.target.appendChild(trigger);
        }
        check() {
            let allAchildren = instance.containerA.children;
            for (let ele of allAchildren) {
                if (ele.classList.contains("contB"))
                    instance.parentContainer.appendChild(ele);
                ele.classList.add("wiggle");
                window.setTimeout(function () {
                    ele.classList.remove("wiggle");
                }, 2500);
            }
            let allBchildren = instance.containerB.children;
            for (let ele of allBchildren) {
                if (ele.classList.contains("contA"))
                    instance.parentContainer.appendChild(ele);
                ele.classList.add("wiggle");
                window.setTimeout(function () {
                    ele.classList.remove("wiggle");
                }, 2500);
            }
        }
    }
    Interaktionsdesign.DragDrop = DragDrop;
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
    Interaktionsdesign.DragElement = DragElement;
})(Interaktionsdesign || (Interaktionsdesign = {}));
//# sourceMappingURL=Playground.js.map