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


        constructor() {
            this.parentContainer = <HTMLDivElement>document.querySelector("#dragdropContainer");
            this.containerA = <HTMLDivElement>this.parentContainer.querySelector("#dropA");
            this.containerB = <HTMLDivElement>this.parentContainer.querySelector("#dropB");
            this.containerA.addEventListener("pointerover", this.drop);
            this.containerB.addEventListener("pointerover", this.drop);
            this.containerA.addEventListener("pointerup", this.drop);
            this.containerB.addEventListener("pointerup", this.drop);
            this.button = <HTMLButtonElement>this.parentContainer.querySelector("#checkButton");
            this.button.addEventListener("pointerdown", this.check);
            instance = this;
            this.createDrag();
        }


        createDrag(): void {
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#drag1"))
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#drag2"))
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#drag3"))
        }

        drop(_event: any) {
            _event.preventDefault();
            if (instance.isDragging) {
                let trigger: HTMLElement = <HTMLElement>instance.parentContainer.querySelector("#" + instance.lastID)

                //Error Handling: Not allowing wrong drags
                /* if (trigger.classList.contains("contA") && _event.target.id == "dropA" || trigger.classList.contains("contB") && _event.target.id == "dropB") {
                    _event.target.appendChild(trigger);
                } */

                _event.target.appendChild(trigger);
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
    }

    export class DragElement {
        htmlElement: HTMLElement;

        constructor(_ele: HTMLElement) {
            this.htmlElement = _ele;
            this.htmlElement.addEventListener("pointerdown", this.drag);
        }

        drag(_event: any) {
            _event.preventDefault(); 
            instance.lastID = _event.target.id;
            instance.isDragging = true;
        }
    }
}