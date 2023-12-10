namespace Station7_2 {
    window.addEventListener("load", handleLoad);
    let next: HTMLAnchorElement;
    let fbBtn: HTMLElement;

    let allClicked: Element[] = [];
    let allright: number = 0;

    let done: boolean = false; 

    let pointCount: number = 15; 

    function handleLoad(): void {
        setup();

        let clickyBox: HTMLDivElement = <HTMLDivElement>document.querySelector("#gameContainer");
        let allClickies: Element[] = Array.from(clickyBox.children);

        for (let ele of allClickies) {
            ele.addEventListener("pointerdown", function (): void {
                if (!ele.classList.contains("clicked") && !ele.classList.contains("right")) {
                    ele.classList.add("clicked");
                    allClicked.push(ele);
                }
            });
        }

        let btn: HTMLDivElement = <HTMLDivElement>document.querySelector("#checkButton");
        btn.addEventListener("pointerdown", check);
    }

    function check(): void {
        allright = 0;
        if(!done) {
            for (let ele of Array.from(allClicked)) {
                if (ele.classList.contains("true")) {
                    ele.classList.add("right")
                    ele.classList.remove("clicked");
    
                    allright++;
                }
                else {
                    ele.classList.add("wrong");
                    ele.classList.remove("clicked");
                    let index: number = allClicked.indexOf(ele);
                    allClicked.splice(index, 1);
                    fbBtn.style.display = "block"; 
                    fbBtn.innerHTML = "Noch nicht ganz!"; 
                    pointCount -= 2; 
                    if(pointCount <= 0) {
                        pointCount = 0; 
                    }
                }
            }
    
            if (allright == 10) {
                next.style.display = "block";
                localStorage.setItem("station72", pointCount + "");
                done = true; 
                fbBtn.style.display = "block"; 
                fbBtn.innerHTML = "Super, alles richtig!"; 
                final();
            }
        }
        
    }




    function setup(): void {
        localStorage.setItem("station72", "0");
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
        console.log(pointCount); 


        localStorage.setItem("points", station1 + station2 + station22 + station3 + station4 + station5 + station6 + station7 + station72 + "");
        localStorage.setItem("current", "7");
    }
}