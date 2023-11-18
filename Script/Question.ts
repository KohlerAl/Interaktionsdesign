namespace Question {
    window.addEventListener("load", handleLoad);

    let hasBeenClicked: boolean = false;

    function handleLoad(): void {
        let allQuestions = document.querySelectorAll(".answerWrapper");
        for (let i: number = 0; i < allQuestions.length; i++) {
            allQuestions[i].addEventListener("touchstart", handleTouch)
        }
    }

    function handleTouch(_event: Event): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        if (hasBeenClicked == false) {
            if (target.classList.contains("right")) {
                target.classList.add("rightAnswer");
            }
            else {
                target.classList.add("wrongAnswer"); 

                let right: HTMLElement = <HTMLElement>document.querySelector(".right"); 
                right.classList.add("hint"); 
                right.classList.add("wiggle"); 

                window.setTimeout(function(): void {
                    right.classList.remove("wiggle"); 
                }, 2500)
            }
            hasBeenClicked = true;
        }
    }
}