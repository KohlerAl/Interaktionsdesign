namespace DragDropTwoBoxes {

    window.addEventListener("load", handleLoad);
    let instance: DragDrop;

    function handleLoad(): void {
        instance = new DragDrop();
    }


    export class DragDrop {
        parentContainer: HTMLDivElement;
        containerA: HTMLDivElement;
        containerB: HTMLDivElement;

        button: HTMLButtonElement;
        imgcontainer: HTMLDivElement;


        lastID: string;
        isDragging: boolean = false;

        aRect: number[] = [];
        bRect: number[] = [];

        mouseMover: HTMLDivElement;

        constructor() {
            this.parentContainer = <HTMLDivElement>document.querySelector("#dragdropContainer");
            this.containerA = <HTMLDivElement>this.parentContainer.querySelector("#dropA");
            this.containerB = <HTMLDivElement>this.parentContainer.querySelector("#dropB");
            this.mouseMover = <HTMLDivElement>document.querySelector("#touchMover");

            this.parentContainer.addEventListener("touchmove", this.over);
            this.parentContainer.addEventListener("touchend", this.drop);
            this.button = <HTMLButtonElement>this.parentContainer.querySelector("#checkButton");
            this.button.addEventListener("pointerdown", this.check);
            instance = this;

            this.getRects();
            this.createDrag();
        }


        getRects(): void {
            let pos = this.containerA.getBoundingClientRect();
            this.aRect = [pos.x, pos.y, pos.x + pos.width, pos.y + pos.height];

            let posB = this.containerB.getBoundingClientRect();
            this.bRect = [posB.x, posB.y, posB.x + posB.width, posB.y + posB.height];
        }


        createDrag(): void {
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#drag1"))
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#drag2"))
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#drag3"))
        }

        over(_event: TouchEvent): void {
            _event.preventDefault();
            instance.mouseMover.style.top = _event.changedTouches[0].clientY + 10 + "px";
            instance.mouseMover.style.left = _event.changedTouches[0].clientX + 10 + "px";
        }

        drop(_event: TouchEvent) {
            _event.preventDefault();
            instance.mouseMover.style.display = "none";
            let trigger: HTMLElement = <HTMLElement>instance.parentContainer.querySelector("#" + instance.lastID);
            console.log(trigger); 
            if (instance.isDragging && instance.checkInside(instance.aRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY)) {
                instance.containerA.appendChild(trigger);
                instance.isDragging = false;
            }
            else if ((instance.isDragging && instance.checkInside(instance.bRect, _event.changedTouches[0].clientX, _event.changedTouches[0].clientY))) {
                instance.containerB.appendChild(trigger);
                instance.isDragging = false;
            }
            else if(instance.isDragging) {
                instance.imgcontainer.appendChild(trigger); 
                instance.isDragging = false;
            }
        }

        check(): void {
            let allAchildren: HTMLCollection = instance.containerA.children;
            for (let ele of allAchildren) {
                if (ele.classList.contains("contB")) {
                    instance.parentContainer.appendChild(ele);
                    ele.classList.add("wiggle");

                    window.setTimeout(function () {
                        ele.classList.remove("wiggle")
                    }, 2500)
                }
            }

            let allBchildren: HTMLCollection = instance.containerB.children;
            for (let ele of allBchildren) {
                if (ele.classList.contains("contA")) {
                    instance.parentContainer.appendChild(ele);
                    instance.timeoutWiggle(ele);
                }
            }
        }

        timeoutWiggle(_ele: Element): void {
            _ele.classList.add("wiggle");

            window.setTimeout(function () {
                _ele.classList.remove("wiggle")
            }, 2500)
        }

        checkInside(_rect: number[], _x: number, _y: number): boolean {
            if (_x > _rect[0] && _x < _rect[2] && _y > _rect[1] && _y < _rect[3]) {
                return true
            }
            else
                return false;
        }
    }

    export class DragElement {
        htmlElement: HTMLElement;

        constructor(_ele: HTMLElement) {
            this.htmlElement = _ele;
            this.htmlElement.addEventListener("touchstart", this.drag);
        }

        drag(_event: TouchEvent) {
            _event.preventDefault();
            instance.mouseMover.style.display = "block";
            let target: HTMLElement = <HTMLElement>_event.target; 
            instance.lastID = target.id;
            instance.isDragging = true;
            instance.mouseMover.style.top = _event.changedTouches[0].clientY + 10 + "px";
            instance.mouseMover.style.left = _event.changedTouches[0].clientX + 10 + "px";

            instance.mouseMover.appendChild(<HTMLImageElement>document.querySelector("#" + target.id))
        }
    }
}