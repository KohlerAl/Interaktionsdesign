namespace Station2_1 {
    window.addEventListener("load", handleLoad);
    let btn: HTMLButtonElement;
    let canvas: HTMLCanvasElement;
    let crc: CanvasRenderingContext2D;

    let next: HTMLAnchorElement;
    let mapImage: HTMLImageElement;

    let green: HTMLImageElement;
    let brown: HTMLImageElement;
    let beige: HTMLImageElement;
    let pink: HTMLImageElement;

    let gr: boolean = false;
    let be: boolean = false;
    let pi: boolean = false;
    let br: boolean = false;

    let tries: number = 0;


    function handleLoad(): void {
        btn = <HTMLButtonElement>document.querySelector(".feedbackBtn");
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        canvas.addEventListener("pointerdown", handleDown);
        crc = <CanvasRenderingContext2D>canvas.getContext("2d");

        mapImage = <HTMLImageElement>document.querySelector("#mapImg")

        brown = <HTMLImageElement>document.querySelector("#brown")
        beige = <HTMLImageElement>document.querySelector("#beige")
        green = <HTMLImageElement>document.querySelector("#green")
        pink = <HTMLImageElement>document.querySelector("#pink")

        document.body.style.marginLeft = 0 + "px";
        document.body.style.marginRight = 0 + "px";

        btn.style.display = "none";

        next = <HTMLAnchorElement>document.querySelector(".next");
        next.style.display = "none";

        let div: HTMLDivElement = <HTMLDivElement>document.querySelector("div");
        div.style.height = window.innerHeight + "px";

        canvas.width = 740;
        canvas.height = 500;
        /* crc.fillStyle = "white"; 
        crc.fillRect(0, 0, 370, 185); */
        crc.drawImage(mapImage, -350, 0, 740 * 1.5 , 500 * 1.5);
        /* crc.drawImage(pink, -350, 0, 740 * 1.5 , 500 * 1.5);
        crc.drawImage(beige, -350, 0, 740 * 1.5 , 500 * 1.5);
        crc.drawImage(green, -350, 0, 740 * 1.5 , 500 * 1.5);
        crc.drawImage(brown, -350, 0, 740 * 1.5 , 500 * 1.5); */
        /* 
        crc.drawImage(mapImage, -0, 0, 740, 500); */

        localStorage.setItem("station2", "0");
        localStorage.setItem("points", "0");
    }

    function handleDown(_event: PointerEvent): void {
        let x: number = _event.clientX;
        let y: number = _event.clientY - canvas.getBoundingClientRect().y;
        /* let y: number = _event.clientY;  */
        console.log("X: " + x, "  Y: " + y); 
        if (tries < 12) {
            /* if (checkInside(x, y, 165, 315, 205, 350)) */ 
            if (checkInside(x, y, 65, 95, 135, 155)){
                console.log("beige clicky"); 
                if (!be) {
                    crc.drawImage(beige,-350, 0, 740 * 1.5 , 500 * 1.5);
                    be = true;
                    btn.style.display = "block";
                    btn.innerHTML = "Fast geschafft!";
                    if (!btn.classList.contains("florian"))
                        btn.classList.add("florian");
                }
            }
            /* else if (checkInside(x, y, 205, 310, 250, 340)) */ 
            else if (checkInside(x, y, 135, 110, 200, 140)){
                console.log("green clicky")
                if (!gr) {
                    crc.drawImage(green,-350, 0, 740 * 1.5 , 500 * 1.5);
                    gr = true;
                    btn.style.display = "block";
                    btn.innerHTML = "Fast geschafft!";
                    if (!btn.classList.contains("florian"))
                        btn.classList.add("florian");
                }
            }
            /* else if (checkInside(x, y, 250, 310, 310, 330))  */
            else if (checkInside(x, y, 200, 100, 345, 135)) {
                console.log("brown clicky")
                if (!br) {
                    crc.drawImage(brown, -350, 0, 740 * 1.5 , 500 * 1.5);
                    br = true;
                    btn.style.display = "block";
                    btn.innerHTML = "Fast geschafft!";
                    if (!btn.classList.contains("florian"))
                        btn.classList.add("florian");
                }
            }
            /* else if (checkInside(x, y, 255, 330, 345, 355)) */
            else if (checkInside(x, y, 200, 130, 290, 165)) {
                console.log("pink clicky")
                if (!pi) {
                    crc.drawImage(pink, -350, 0, 740 * 1.5 , 500 * 1.5);
                    pi = true;
                    btn.style.display = "block";
                    btn.innerHTML = "Fast geschafft!";
                    if (!btn.classList.contains("florian"))
                        btn.classList.add("florian");
                }
            }
            crc.drawImage(mapImage, -350, 0, 740 * 1.5 , 500 * 1.5);
            if (pi && gr && br && be) {
                next.style.display = "block";
                btn.classList.add("right");
                if (btn.classList.contains("florian"))
                    btn.classList.remove("florian");
                btn.innerHTML = "Toll! Du hast alle Orte gefunden.";

                let points: number = Number(localStorage.getItem("points"));
                points += 10;
                localStorage.setItem("points", points + "");
                canvas.removeEventListener("pointerdown", handleDown);

                localStorage.setItem("station2", "10");
                final();
            }

        }
        else {
            btn.style.display = "block";
            btn.classList.add("wrong");
            btn.innerHTML = "Schade! Beim nächsten Mal klappt es bestimmt.";
            if (btn.classList.contains("florian"))
                btn.classList.add("florian");

            canvas.removeEventListener("pointerdown", handleDown);
            localStorage.setItem("station2", "2");
            final();
        }

        tries++;

    }

    function checkInside(x: number, y: number, xMin: number, yMin: number, xMax: number, yMax: number): boolean {
        if (x > xMin && x < xMax && y > yMin && y < yMax) {
            return true;
        }

        else {
            return false;
        }
    }

    function final(): void {
        let station1: number = Number(localStorage.getItem("station1"));
        let station2: number = Number(localStorage.getItem("station2"));
        localStorage.setItem("points", station1 + station2 + "");
        console.log(localStorage.getItem("points"))
    }
}