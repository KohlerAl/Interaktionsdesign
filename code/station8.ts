namespace Station8 {
    let next: HTMLAnchorElement;
    let fbBtn: HTMLElement;
    let pointCount: number = 10; 
    let wrapper: HTMLDivElement; 


    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        setup(); 

        wrapper = <HTMLDivElement>document.querySelector("#moleBtnWrapper"); 
        wrapper.addEventListener("pointerdown", handleClick); 
    }

    function handleClick(_event: Event): void {
        let target: HTMLElement = <HTMLElement>_event.target; 

        if(target.classList.contains("true")) {
            next.style.display = "block"; 
            target.classList.add("right"); 
            localStorage.setItem("station8", pointCount + ""); 
            wrapper.removeEventListener("pointerdown", handleClick); 
            final(); 
        }
        else {
            target.classList.add("wrong"); 
            pointCount -= 2; 
        }
    }

    function setup(): void {
        localStorage.setItem("station8", "0");
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
        let station5: number = Number(localStorage.getItem("station5"));
        let station6: number = Number(localStorage.getItem("station6"));
        let station7: number = Number(localStorage.getItem("station7"));
        let station72: number = Number(localStorage.getItem("station72"));
        let station8: number = Number(localStorage.getItem("station8"));


        localStorage.setItem("points", station1 + station2 + station22 + station3 + station4 + station5 + station6 + station7 + station72 + station8 +"");
        localStorage.setItem("current", "8");
    }
}