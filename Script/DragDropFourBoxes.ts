namespace DragDropFourBoxes {

    window.addEventListener("load", handleLoad);
    let instance: DragDrop;

    function handleLoad(): void {
        instance = new DragDrop();
    }


    export class DragDrop {
        parentContainer: HTMLDivElement;
        containerA: HTMLDivElement;
        containerB: HTMLDivElement;
        containerC: HTMLDivElement;
        containerD: HTMLDivElement;

        button: HTMLButtonElement;
        imgcontainer: HTMLDivElement;


        constructor() {
            this.parentContainer = <HTMLDivElement>document.querySelector("#dragdropBox");
            this.containerA = <HTMLDivElement>this.parentContainer.querySelector("#drop1");
            this.containerB = <HTMLDivElement>this.parentContainer.querySelector("#drop2");
            this.containerC = <HTMLDivElement>this.parentContainer.querySelector("#drop3");
            this.containerD = <HTMLDivElement>this.parentContainer.querySelector("#drop4");

            this.containerA.addEventListener("dragover", this.allowDrop);
            this.containerA.addEventListener("drop", this.drop);

            this.containerB.addEventListener("dragover", this.allowDrop);
            this.containerB.addEventListener("drop", this.drop);

            this.containerC.addEventListener("dragover", this.allowDrop);
            this.containerC.addEventListener("drop", this.drop);

            this.containerD.addEventListener("dragover", this.allowDrop);
            this.containerD.addEventListener("drop", this.drop);
            this.imgcontainer = <HTMLDivElement>this.parentContainer.querySelector("#imagesCont")

            this.button = <HTMLButtonElement>this.parentContainer.querySelector("#controlButton");
            this.button.addEventListener("pointerdown", this.check);
            instance = this;
            this.createDrag();
        }


        createDrag(): void {
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#dragA"))
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#dragB"))
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#dragC"))
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#dragD"))
        }

        allowDrop(_event: Event): void {
            let target: HTMLElement = <HTMLElement>_event.target;
            if (target.children.length == 0) {
                _event.preventDefault();
            }
        }

        drop(_event: any) {
            _event.preventDefault();
            let target: HTMLElement = <HTMLElement>_event.target;
            if (target.tagName == "DIV") {
                let data = _event.dataTransfer.getData("text");
                let trigger: HTMLElement = <HTMLElement>instance.parentContainer.querySelector("#" + data)
                if (_event.target.children.length == 0)
                    _event.target.appendChild(trigger);

                else
                    instance.imgcontainer.appendChild(trigger);

            }
        }

        check(): void {
            let aChild: HTMLImageElement = <HTMLImageElement>instance.containerA.querySelector("img");
            let bChild: HTMLImageElement = <HTMLImageElement>instance.containerB.querySelector("img");
            let cChild: HTMLImageElement = <HTMLImageElement>instance.containerC.querySelector("img");
            let dChild: HTMLImageElement = <HTMLImageElement>instance.containerD.querySelector("img");

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

        timeoutWiggle(_ele: HTMLElement): void {
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
            this.htmlElement.addEventListener("dragstart", this.drag);
        }

        drag(_event: any) {
            _event.dataTransfer.setData("text", _event.target.id);
        }
    }
}
