"use strict";
var Station5;
(function (Station5) {
    let next;
    let fbBtn;
    let checkBtn;
    let instance;
    let counter = 0;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        setup();
        checkBtn = document.querySelector("#checkButton");
        instance = new DragDrop();
    }
    function setup() {
        localStorage.setItem("station5", "0");
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
        localStorage.setItem("station5", 15 + "");
        let station5 = Number(localStorage.getItem("station5"));
        localStorage.setItem("points", station1 + station2 + station22 + station3 + station4 + station5 + "");
        localStorage.setItem("current", "5");
    }
    class DragDrop {
        parentContainer;
        containerA;
        button;
        imgcontainer;
        lastID;
        isDragging = false;
        aRect = [];
        mouseMover;
        constructor() {
            this.parentContainer = document.querySelector("#dragdropContainer");
            this.containerA = this.parentContainer.querySelector("#dropA");
            this.mouseMover = document.querySelector("#touchMover");
            this.imgcontainer = document.querySelector("#charliesFood");
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
        }
        createDrag() {
            new DragElement(instance.parentContainer.querySelector("#drag1"));
            new DragElement(instance.parentContainer.querySelector("#drag2"));
            new DragElement(instance.parentContainer.querySelector("#drag3"));
            new DragElement(instance.parentContainer.querySelector("#drag4"));
            new DragElement(instance.parentContainer.querySelector("#drag5"));
            new DragElement(instance.parentContainer.querySelector("#drag6"));
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
            else if (instance.isDragging) {
                instance.imgcontainer.appendChild(trigger);
                instance.isDragging = false;
            }
        }
        check() {
            let allAchildren = Array.from(instance.containerA.children);
            counter = 0;
            for (let ele of allAchildren) {
                if (ele.classList.contains("false")) {
                    instance.imgcontainer.appendChild(ele);
                    ele.classList.add("wiggle");
                    window.setTimeout(function () {
                        ele.classList.remove("wiggle");
                    }, 2500);
                }
                else if (ele.classList.contains("true")) {
                    counter++;
                }
            }
            if (counter == 4) {
                checkBtn.style.display = "none";
                fbBtn.innerHTML = "Toll gemacht! PS: Am allerliebsten mag ich Haselnüsse.";
                fbBtn.style.display = "block";
                next.style.display = "block";
                fbBtn.classList.add("right");
                final();
            }
            else {
                checkBtn.style.display = "none";
                fbBtn.innerHTML = "Fast geschafft! PS: Am allerliebsten mag ich Haselnüsse.";
                fbBtn.style.display = "block";
                window.setTimeout(function () {
                    instance.removeFeedback();
                }, 2500);
            }
        }
        removeFeedback() {
            fbBtn.style.display = "none";
            checkBtn.style.display = "block";
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
    Station5.DragDrop = DragDrop;
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
    Station5.DragElement = DragElement;
})(Station5 || (Station5 = {}));
//# sourceMappingURL=station5.js.map