namespace station1 {
    window.addEventListener("load", handleLoad);
    let btn: HTMLButtonElement;
    let img: HTMLImageElement;
    let tries: number = 3;

    let next: HTMLAnchorElement;

    function handleLoad(): void {
        btn = <HTMLButtonElement>document.querySelector(".feedbackBtn");
        img = <HTMLImageElement>document.querySelector("img");
        img.addEventListener("pointerdown", handleDown);
        document.body.style.marginLeft = 0 + "px";
        document.body.style.marginRight = 0 + "px";

        btn.style.display = "none";

        next = <HTMLAnchorElement>document.querySelector(".next"); 
        next.style.display = "none"; 

        let div: HTMLDivElement = <HTMLDivElement>document.querySelector("div");
        div.style.height = window.innerHeight + "px";
        localStorage.setItem("station1", "0"); 
    }


    function handleDown(_event: PointerEvent): void {
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        btn.style.display = "block";
        localStorage.setItem("current", "1"); 
        if (x > 150 && x < 240 && y > 320 && y < 380 && tries > 0) {
            btn.innerHTML = "Genau! Hier liegt der Feldberg.";
            btn.classList.add("right");
            if(btn.classList.contains("wrong"))
                btn.classList.remove("wrong")

            if (tries == 3) {
                localStorage.setItem("station1", "10");
            }

            else if (tries == 2) {
                localStorage.setItem("station1", "8");
            }

            else if (tries == 1) {
                localStorage.setItem("station1", "6");
            }

            img.removeEventListener("pointerdown", handleDown); 
            console.log(localStorage.getItem("station1")); 
            next.style.display = "block"; 
            final(); 
        }
        else {
            btn.innerHTML = "Nicht ganz, schau Dir die Aussicht nochmal genauer an.";
            btn.classList.add("wrong");
            tries-- 

            if(tries == 0) {
                localStorage.setItem("station1", "2");
                img.removeEventListener("pointerdown", handleDown); 
                next.style.display = "block"; 
                final(); 
            }
        }

    }

    function final(): void {
        let station: number = Number(localStorage.getItem("station1")); 
        localStorage.setItem("points", station + ""); 
        localStorage.setItem("current", "1"); 
    }
}