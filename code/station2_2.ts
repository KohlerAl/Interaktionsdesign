namespace Station2_2 {
    window.addEventListener("load", handleLoad); 
    
    let question1: HTMLDivElement; 
    let question2: HTMLDivElement;
    let question3: HTMLDivElement;
    let question4: HTMLDivElement;

    let answer1: boolean = false; 
    let answer2: boolean = false; 
    let answer3: boolean = false; 
    let answer4: boolean = false; 

    let current: number = 1; 

    function handleLoad(): void {
        localStorage.setItem("station22", "0");      
        
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
    }


    function handleDown(_event: PointerEvent): void {
        console.log(_event.target); 
    }
}