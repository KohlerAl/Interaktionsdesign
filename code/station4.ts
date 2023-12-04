namespace Station4 {
    window.addEventListener("load", handleLoad);
    let next: HTMLAnchorElement;

    let question1: HTMLDivElement;
    let question2: HTMLDivElement;
    let question3: HTMLDivElement;


    let current: number = 1;

    function handleLoad(): void {
        setup();

        question1 = <HTMLDivElement>document.querySelector("#question1");
        question2 = <HTMLDivElement>document.querySelector("#question2");
        question3 = <HTMLDivElement>document.querySelector("#question3");

        question1.addEventListener("pointerdown", handleDown);
        question2.addEventListener("pointerdown", handleDown);
        question3.addEventListener("pointerdown", handleDown);

        question2.style.display = "none";
        question3.style.display = "none";
    }

    function handleDown(_event: PointerEvent): void {
        console.log(_event.target);

        let target: HTMLElement = <HTMLElement>_event.target;
        let currentPoints: number = Number(localStorage.getItem("station4"));

        if (target.nodeName == "P") {
            next.style.display = "block";
            if (target.classList.contains("true")) {
                target.classList.add("right");
                localStorage.setItem("station4", currentPoints + 3 + "");
            }
            else {
                target.classList.add("wrong");
                localStorage.setItem("station4", currentPoints + 1 + "");
                if (current == 1) {
                    let rightAns: HTMLElement = <HTMLElement>question1.querySelector(".true");
                    rightAns.classList.add("florian")
                }
                if (current == 2) {
                    let rightAns: HTMLElement = <HTMLElement>question2.querySelector(".true");
                    rightAns.classList.add("florian")
                }
                if (current == 3) {
                    let rightAns: HTMLElement = <HTMLElement>question3.querySelector(".true");
                    rightAns.classList.add("florian")
                }
            }

            if (current == 1)
                question1.removeEventListener("pointerdown", handleDown);
            else if (current == 2)
                question2.removeEventListener("pointerdown", handleDown);
            else if (current == 3)
                question3.removeEventListener("pointerdown", handleDown);

            current++;
        }
    }


    function change(): void {
        console.log(current); 
        switch (current) {

            case 2:
                question1.style.display = "none";
                question2.style.display = "block"
                next.style.display = "none";
                break;

            case 3:
                question2.style.display = "none";
                question3.style.display = "block"
                next.style.display = "none";

                break;

            case 4:
                next.setAttribute("href", "score.html");
                final();
                break;
        }
    }

    function setup(): void {
        localStorage.setItem("station4", "0");

        let div: HTMLDivElement = <HTMLDivElement>document.querySelector(".contentWrapper");
        div.style.height = window.innerHeight + "px";

        next = <HTMLAnchorElement>document.querySelector(".next");
        next.style.display = "none";
        next.addEventListener("pointerdown", change)

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