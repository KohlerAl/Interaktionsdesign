"use strict";
var station3;
(function (station3) {
    window.addEventListener("load", handleLoad);
    let dragDrop;
    let dragA;
    let dragB;
    let dragC;
    let dragD;
    let next;
    let imgcontainer;
    let instance;
    let currentOff = 0;
    function handleLoad() {
        dragDrop = document.querySelector("#dragdropContainer");
        dragA = document.querySelector("#dropA");
        dragB = document.querySelector("#dropB");
        dragC = document.querySelector("#dropC");
        dragD = document.querySelector("#dropD");
        let div = document.querySelector(".contentWrapper");
        div.style.height = window.innerHeight + "px";
        document.body.style.marginLeft = 0 + "px";
        document.body.style.marginRight = 0 + "px";
        next = document.querySelector(".next");
        next.style.display = "none";
        localStorage.setItem("station3", "0");
        setup();
        instance = new DragDrop();
    }
    function setup() {
        let width = dragDrop.getBoundingClientRect().width;
        let contwidth = (width / 3) - 10;
        let offset = (width - contwidth - contwidth) / 2;
        dragA.style.width = contwidth + "px";
        dragB.style.width = contwidth + "px";
        dragC.style.width = contwidth + "px";
        dragD.style.width = contwidth + "px";
        dragA.style.height = contwidth + "px";
        dragB.style.height = contwidth + "px";
        dragC.style.height = contwidth + "px";
        dragD.style.height = contwidth + "px";
        dragA.style.left = offset - 20 + "px";
        dragC.style.left = offset - 20 + "px";
        dragB.style.left = contwidth - 10 + offset + "px";
        dragD.style.left = contwidth - 10 + offset + "px";
        dragC.style.top = width / 3 + 20 + "px";
        dragD.style.top = width / 3 + 20 + "px";
        imgcontainer = document.querySelector("#imgContainer");
        imgcontainer.style.top = contwidth * 2 + 80 + "px";
        let labelA = document.querySelector("#a");
        let labelB = document.querySelector("#b");
        let labelC = document.querySelector("#c");
        let labelD = document.querySelector("#d");
        labelA.style.left = contwidth - 25 + "px";
        labelB.style.left = contwidth * 2 - 15 + "px";
        labelC.style.left = contwidth - 25 + "px";
        labelD.style.left = contwidth * 2 - 15 + "px";
        labelA.style.top = contwidth + 5 + "px";
        labelB.style.top = contwidth + 5 + "px";
        labelC.style.top = contwidth * 2 + 35 + "px";
        labelD.style.top = contwidth * 2 + 35 + "px";
    }
    function final() {
        let station1 = Number(localStorage.getItem("station1"));
        let station2 = Number(localStorage.getItem("station2"));
        let station22 = Number(localStorage.getItem("station22"));
        localStorage.setItem("points", station1 + station2 + station22 + 15 + "");
        localStorage.setItem("current", "3");
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
            this.parentContainer = document.querySelector("#dragdropContainer");
            this.containerA = this.parentContainer.querySelector("#dropA");
            this.containerB = this.parentContainer.querySelector("#dropB");
            this.containerC = this.parentContainer.querySelector("#dropC");
            this.containerD = this.parentContainer.querySelector("#dropD");
            this.mouseMover = document.querySelector("#touchMover");
            this.imgcontainer = document.querySelector("#imgContainer");
            this.parentContainer.addEventListener("touchmove", this.over);
            this.parentContainer.addEventListener("touchend", this.drop);
            instance = this;
            this.getRects();
            this.createDrag();
            let allCchildren = this.imgcontainer.querySelectorAll("img");
            for (let child of allCchildren) {
                child.style.left = currentOff.toFixed(2) + "px";
                child.setAttribute("value", currentOff.toFixed(2) + "");
                currentOff += child.getBoundingClientRect().width + 4;
            }
        }
        getRects() {
            let pos = this.containerA.getBoundingClientRect();
            this.aRect = [pos.x, pos.y, pos.x + pos.width, pos.y + pos.height];
            let posB = this.containerB.getBoundingClientRect();
            this.bRect = [posB.x, posB.y, posB.x + posB.width, posB.y + posB.height];
            let posC = this.containerC.getBoundingClientRect();
            this.cRect = [posC.x, posC.y, posC.x + posC.width, posC.y + posC.height];
            let posD = this.containerD.getBoundingClientRect();
            this.dRect = [posD.x, pos.y, posD.x + posD.width, posD.y + posD.height];
        }
        createDrag() {
            new DragElement(instance.parentContainer.querySelector("#drag1"));
            new DragElement(instance.parentContainer.querySelector("#drag2"));
            new DragElement(instance.parentContainer.querySelector("#drag3"));
            new DragElement(instance.parentContainer.querySelector("#drag4"));
            new DragElement(instance.parentContainer.querySelector("#drag5"));
            new DragElement(instance.parentContainer.querySelector("#drag6"));
            new DragElement(instance.parentContainer.querySelector("#drag7"));
            new DragElement(instance.parentContainer.querySelector("#drag8"));
        }
        over(_event) {
            _event.preventDefault();
            instance.mouseMover.style.top = _event.changedTouches[0].clientY + 5 + "px";
            instance.mouseMover.style.left = _event.changedTouches[0].clientX + 5 + "px";
        }
        drop(_event) {
            _event.preventDefault();
            instance.mouseMover.style.display = "none";
            let trigger = instance.parentContainer.querySelector("#" + instance.lastID);
            if (instance.isDragging && instance.checkInside(instance.aRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY)) {
                instance.containerA.appendChild(trigger);
                trigger.style.position = "unset";
                instance.isDragging = false;
            }
            else if ((instance.isDragging && instance.checkInside(instance.bRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY))) {
                instance.containerB.appendChild(trigger);
                trigger.style.position = "unset";
                instance.isDragging = false;
            }
            else if ((instance.isDragging && instance.checkInside(instance.cRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY))) {
                instance.containerC.appendChild(trigger);
                trigger.style.position = "unset";
                instance.isDragging = false;
            }
            else if ((instance.isDragging && instance.checkInside(instance.dRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY))) {
                instance.containerD.appendChild(trigger);
                trigger.style.position = "unset";
                instance.isDragging = false;
            }
            else if (instance.isDragging) {
                instance.imgcontainer.appendChild(trigger);
                let off = trigger.getAttribute("value");
                trigger.style.left = off + "px";
                trigger.style.position = "absolute";
                instance.isDragging = false;
            }
            if (instance.imgcontainer.children.length == 0) {
                instance.check();
                if (instance.imgcontainer.children.length == 0) {
                    final();
                }
            }
        }
        check() {
            let allAchildren = instance.containerA.children;
            for (let ele of allAchildren) {
                if (ele.classList.contains("contB") || ele.classList.contains("contC") || ele.classList.contains("contD")) {
                    instance.imgcontainer.appendChild(ele);
                    if (ele instanceof HTMLElement) {
                        let off = ele.getAttribute("value");
                        ele.style.left = off + "px";
                        ele.style.position = "absolute";
                    }
                    instance.timeoutWiggle(ele);
                }
            }
            let allBchildren = instance.containerB.children;
            for (let ele of allBchildren) {
                if (ele.classList.contains("contA") || ele.classList.contains("contC") || ele.classList.contains("contD")) {
                    instance.imgcontainer.appendChild(ele);
                    if (ele instanceof HTMLElement) {
                        let off = ele.getAttribute("value");
                        ele.style.left = off + "px";
                        ele.style.position = "absolute";
                    }
                    instance.timeoutWiggle(ele);
                }
            }
            let allCchildren = instance.containerC.children;
            for (let ele of allCchildren) {
                if (ele.classList.contains("contA") || ele.classList.contains("contB") || ele.classList.contains("contD")) {
                    instance.imgcontainer.appendChild(ele);
                    if (ele instanceof HTMLElement) {
                        let off = ele.getAttribute("value");
                        ele.style.left = off + "px";
                        ele.style.position = "absolute";
                    }
                    instance.timeoutWiggle(ele);
                }
            }
            let allDchildren = instance.containerD.children;
            for (let ele of allDchildren) {
                if (ele.classList.contains("contA") || ele.classList.contains("contB") || ele.classList.contains("contC")) {
                    instance.imgcontainer.appendChild(ele);
                    if (ele instanceof HTMLElement) {
                        let off = ele.getAttribute("value");
                        ele.style.left = off + "px";
                        ele.style.position = "absolute";
                    }
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
    station3.DragDrop = DragDrop;
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
            let dragged = document.querySelector("#" + target.id);
            instance.mouseMover.appendChild(dragged);
            dragged.style.left = "0px";
        }
    }
    station3.DragElement = DragElement;
})(station3 || (station3 = {}));
//# sourceMappingURL=station3.js.map