namespace Station2_2 {
    window.addEventListener("load", handleLoad);
    let fbCont: HTMLButtonElement;
    let next: HTMLAnchorElement;

    let question1: HTMLDivElement;
    let question2: HTMLDivElement;
    let question3: HTMLDivElement;
    let question4: HTMLDivElement;

    let current: number = 1;

    function handleLoad(): void {
        fbCont = <HTMLButtonElement>document.querySelector(".feedbackCont");
        fbCont.style.display = "none";

        localStorage.setItem("station22", "0");

        let div: HTMLDivElement = <HTMLDivElement>document.querySelector(".contentWrapper");
        div.style.height = window.innerHeight + "px";

        next = <HTMLAnchorElement>document.querySelector(".next");
        next.addEventListener("pointerdown", change);
        next.style.display = "none";

        document.body.style.marginLeft = 0 + "px";
        document.body.style.marginRight = 0 + "px";

        question1 = <HTMLDivElement>document.querySelector("#question1");
        question2 = <HTMLDivElement>document.querySelector("#question2");
        question3 = <HTMLDivElement>document.querySelector("#question3");
        question4 = <HTMLDivElement>document.querySelector("#question4");

        question1.addEventListener("pointerdown", handleDown);
        question2.addEventListener("pointerdown", handleDown);
        question3.addEventListener("pointerdown", handleDown);
        question4.addEventListener("pointerdown", handleDown);

        question2.style.display = "none";
        question3.style.display = "none";
        question4.style.display = "none";

        console.log("hullo")
    }


    function handleDown(_event: PointerEvent): void {
        console.log(_event.target);
        fbCont.style.display = "block";
        next.style.display = "block";

        let target: HTMLElement = <HTMLElement>_event.target;
        let currentPoints: number = Number(localStorage.getItem("station22"));

        if (target.classList.contains("true")) {
            target.classList.add("right");
            localStorage.setItem("station22", currentPoints + 3 + "");

            if (current == 1)
                fbCont.innerHTML = "Genau, das ist sehr praktisch!";
            else if (current == 2)
                fbCont.innerHTML = "Genau, denn meine spitzen Krallen helfen mir beim Klettern.";
            else if (current == 3)
                fbCont.innerHTML = "Genau, denn Eichhörnchen, die in Mischwäldern leben, haben eher helles, rötliches Fell.";
            else if (current == 4)
                fbCont.innerHTML = "Genau, ich bin tagaktiv!";
        }
        else {
            target.classList.add("wrong");
            localStorage.setItem("station22", currentPoints + 1 + "");
            if (current == 1)
                fbCont.innerHTML = "Doch, das ist sehr praktisch!";
            else if (current == 2)
                fbCont.innerHTML = "Nein, denn meine spitzen Krallen helfen mir beim Klettern.";
            else if (current == 3)
                fbCont.innerHTML = "Genau, denn Eichhörnchen, die in Mischwäldern leben, haben eher helles, rötliches Fell.";
            else if (current == 4)
                fbCont.innerHTML = "Nein, ich bin tagaktiv!";
        }


        if (current == 1)
            question1.removeEventListener("pointerdown", handleDown);
        else if (current == 2)
            question2.removeEventListener("pointerdown", handleDown);
        else if (current == 3)
            question3.removeEventListener("pointerdown", handleDown);
        else if (current == 4)
            question4.removeEventListener("pointerdown", handleDown);


        current++;

    }

    function change(): void {

        switch (current) {

            case 2:
                question1.style.display = "none";
                question2.style.display = "block"
                next.style.display = "none";
                fbCont.style.display = "none";
                break;

            case 3:
                question2.style.display = "none";
                question3.style.display = "block"
                next.style.display = "none";
                fbCont.style.display = "none";

                break;

            case 4:
                question3.style.display = "none";
                question4.style.display = "block"
                next.style.display = "none";
                fbCont.style.display = "none";

                break;

            case 5:
                next.setAttribute("href", "score.html");
                final();
                break;
        }


    }

    function final(): void {
        let station1: number = Number(localStorage.getItem("station1"));
        let station2: number = Number(localStorage.getItem("station2"));
        let station22: number = Number(localStorage.getItem("station22"));
        localStorage.setItem("points", station1 + station2 + station22 + "");
        localStorage.setItem("current", "2");
    }
}