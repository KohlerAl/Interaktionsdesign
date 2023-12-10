namespace Station5 {
    let next: HTMLAnchorElement;
    let fbBtn: HTMLElement;
    let checkBtn: HTMLButtonElement;

    let instance: DragDrop;
    let counter: number = 0; 

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        setup();

        checkBtn = <HTMLButtonElement>document.querySelector("#checkButton");
        instance = new DragDrop();
    }


    function setup(): void {
        localStorage.setItem("station5", "0");
        fbBtn = <HTMLElement>document.querySelector(".feedbackBtn")
        fbBtn.style.display = "none";

        let div: HTMLDivElement = <HTMLDivElement>document.querySelector(".contentWrapper");
        div.style.height = window.innerHeight + "px";

        next = <HTMLAnchorElement>document.querySelector(".next");
        next.style.display = "none";

        document.body.style.marginLeft = 0 + "px";
        document.body.style.marginRight = 0 + "px";
    }

    function final(): void {
        let station1: number = Number(localStorage.getItem("station1"));
        let station2: number = Number(localStorage.getItem("station2"));
        let station22: number = Number(localStorage.getItem("station22"));
        let station3: number = Number(localStorage.getItem("station3"));
        let station4: number = Number(localStorage.getItem("station4"));
        localStorage.setItem("station5", 15 + ""); 
        let station5: number = Number(localStorage.getItem("station5"));
        

        localStorage.setItem("points", station1 + station2 + station22 + station3 + station4 + station5 + "");
        localStorage.setItem("current", "5");
    }

    export class DragDrop {
        parentContainer: HTMLDivElement;
        containerA: HTMLDivElement;

        button: HTMLButtonElement;
        imgcontainer: HTMLDivElement;


        lastID: string;
        isDragging: boolean = false;

        aRect: number[] = [];

        mouseMover: HTMLDivElement;

        constructor() {
            this.parentContainer = <HTMLDivElement>document.querySelector("#dragdropContainer");
            this.containerA = <HTMLDivElement>this.parentContainer.querySelector("#dropA");
            this.mouseMover = <HTMLDivElement>document.querySelector("#touchMover");

            this.imgcontainer = <HTMLDivElement>document.querySelector("#charliesFood"); 

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
        }


        createDrag(): void {
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#drag1"))
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#drag2"))
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#drag3"))
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#drag4"))
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#drag5"))
            new DragElement(<HTMLElement>instance.parentContainer.querySelector("#drag6"))
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
            else if (instance.isDragging) {
                instance.imgcontainer.appendChild(trigger);
                instance.isDragging = false;
            }
        }

        check(): void {
            let allAchildren: Element[] = Array.from(instance.containerA.children);
            counter = 0; 
            for (let ele of allAchildren) {
                if (ele.classList.contains("false")) {
                    instance.imgcontainer.appendChild(ele);
                    ele.classList.add("wiggle");

                    window.setTimeout(function () {
                        ele.classList.remove("wiggle")
                    }, 2500)
                }
                else if(ele.classList.contains("true")) {
                    counter++; 
                }
            }

            if(counter == 4) {
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
                window.setTimeout(function(): void {
                    instance.removeFeedback(); 
                }, 2500)
            }
        }

        removeFeedback(): void {
            fbBtn.style.display = "none"; 
            checkBtn.style.display = "block"; 
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