namespace Station6 {
    window.addEventListener("load", handleLoad);
    let next: HTMLAnchorElement;
    let fbBtn: HTMLElement;
    let memoryBox: HTMLDivElement;

    let isOneturned: boolean = false;
    let firstClicked: HTMLElement;

    function handleLoad(): void {
        setup();
        memoryBox = <HTMLDivElement>document.querySelector("#memoryBox");
        let arr = Array.from(memoryBox.childNodes);

        for (let child of arr) {
            if (child instanceof HTMLElement)
                child.addEventListener("pointerdown", check);
        }
    }

    function check(_event: PointerEvent): void {
        let target: HTMLElement = <HTMLElement>_event.target;

        if (!isOneturned) {
            let img: HTMLImageElement = <HTMLImageElement>target.querySelector("img");
            img.style.display = "initial";
            firstClicked = target;
            isOneturned = true;
            target.removeEventListener("pointerdown", check);
        }
        else if (isOneturned) {
            let img: HTMLImageElement = <HTMLImageElement>target.querySelector("img");
            img.style.display = "initial";

            if (firstClicked.classList[1] == target.classList[1]) {
                target.removeEventListener("pointerdown", check); 
            }
            else {
                firstClicked.addEventListener("pointerdown", check); 
                let firstImg: HTMLImageElement = <HTMLImageElement>firstClicked.querySelector("img")
                firstImg.style.display = "none";
                img.style.display = "none"; 
            }
        }
    }

    function setup(): void {
        localStorage.setItem("station6", "0");
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
        localStorage.setItem("points", station1 + station2 + station22 + station3 + station4 + "");
        localStorage.setItem("current", "4");
    }
}