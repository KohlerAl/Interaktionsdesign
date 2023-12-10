namespace Station9 {
    window.addEventListener("load", handleLoad);
    let fbBtn: HTMLButtonElement;
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
        next.addEventListener("pointerdown", change);
    }

    function handleDown(_event: PointerEvent): void {
        fbBtn.style.display = "block";
        next.style.display = "block";
        
        let target: HTMLElement = <HTMLElement>_event.target;
        let currentPoints: number = Number(localStorage.getItem("station9"));

        if (target.classList.contains("true")) {
            target.classList.add("right");
            localStorage.setItem("station9", currentPoints + 3 + "");

            if (current == 1)
                fbBtn.innerHTML = "Genau, ich kann total gut riechen!";
            else if (current == 2)
                fbBtn.innerHTML = "Genau, manchmal sind meine Verstecke einfach zu gut!";
            else if (current == 3)
                fbBtn.innerHTML = "Genau, ich bin nämlich ziemlich hungrig und wache daher alle ein bis zwei Stunden auf.";
        }
        else {
            target.classList.add("wrong");
            localStorage.setItem("station9", currentPoints + 1 + "");
            if (current == 1)
                fbBtn.innerHTML = "Doch, ich kann total gut riechen!";
            else if (current == 2)
                fbBtn.innerHTML = "Nein, denn manchmal sind meine Verstecke einfach zu gut!";
            else if (current == 3)
                fbBtn.innerHTML = "Nein, das reicht nicht, denn ich bin ziemlich hungrig und wache daher alle ein bis zwei Stunden auf.";
        }


        if (current == 1)
            question1.removeEventListener("pointerdown", handleDown);
        else if (current == 2)
            question2.removeEventListener("pointerdown", handleDown);
        else if (current == 3)
            question3.removeEventListener("pointerdown", handleDown);

        current++;

    }

    function change(): void {
        switch (current) {

            case 2:
                question1.style.display = "none";
                question2.style.display = "block"
                next.style.display = "none";
                fbBtn.style.display = "none";
                break;

            case 3:
                question2.style.display = "none";
                question3.style.display = "block"
                next.style.display = "none";
                fbBtn.style.display = "none";

                break;

            case 4:
                next.setAttribute("href", "score.html");
                final();
                break;
        }
    }

    function setup(): void {
        localStorage.setItem("station9", "0");
        fbBtn = <HTMLButtonElement>document.querySelector(".feedbackCont")
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
        let station5: number = Number(localStorage.getItem("station5"));
        let station6: number = Number(localStorage.getItem("station6"));
        let station7: number = Number(localStorage.getItem("station7"));
        let station72: number = Number(localStorage.getItem("station72"));
        let station8: number = Number(localStorage.getItem("station8"));
        let station9: number = Number(localStorage.getItem("station9"));


        localStorage.setItem("points", station1 + station2 + station22 + station3 + station4 + station5 + station6 + station7 + station72 + station8 + station9 + "");
        localStorage.setItem("current", "9");
    }
}