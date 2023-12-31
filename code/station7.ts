namespace Station7 {
    let next: HTMLAnchorElement;
    let fbBtn: HTMLElement;

    let fish: Fishy;
    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;
    let width: number;
    let height: number;

    let obsta: Obstacle;
    let back: Background;

    let points: number = 0;
    let cooldown: boolean = true;
    let run: boolean = true;

    let anim: any;
    let pointCount: any;
    let spawn: any;
    let backgroundUpdate: any;

    let fishImg: HTMLImageElement;
    let bgImg: HTMLImageElement;

    let startBtn: HTMLButtonElement;


    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        setup();

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        canvas.style.display = "none";

        startBtn = <HTMLButtonElement>document.querySelector("#startGame");
        startBtn.addEventListener("pointerdown", startGame);

    }

    function startGame(): void {
        let prGame: HTMLDivElement = <HTMLDivElement>document.querySelector("#preGameWrapper");
        prGame.style.display = "none";
        canvas.style.display = "block";
        canvas.addEventListener("touchstart", tappyTap);

        width = window.innerWidth;
        canvas.setAttribute("width", width + "px");
        height = window.innerHeight;
        canvas.setAttribute("height", height + "px");

        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d")
        crc2.fillStyle = "lightblue";
        crc2.fillRect(0, 0, width, height);

        document.body.setAttribute("overflow", "hidden")

        fish = new Fishy();
        obsta = new Obstacle();
        back = new Background();

        anim = window.setInterval(animate, 50);
        pointCount = window.setInterval(updatePoints, 1000);

        bgImg = <HTMLImageElement>document.querySelector("#bg");
    }

    function animate(): void {
        if (run) {
            crc2.drawImage(bgImg, 0, 0, width + 50, height)

            crc2.font = "25px extrabold";
            crc2.strokeText("" + points, 20, 50);
            crc2.fillText("" + points, 20, 50);

            back.animate();
            fish.draw();
            obsta.animate();
        }
    }

    function updatePoints(): void {
        points++;
    }

    function tappyTap(): void {
        fish.jumping = true;
    }

    class Fishy {
        yPos: number;
        xPos: number;
        width: number = 90;
        height: number = 90;

        yMin: number;
        yMax: number;
        jumping: boolean = false;

        rising: boolean = true;
        falling: boolean = false;

        constructor() {
            this.yPos = height - 150;
            this.xPos = 50;

            this.yMin = height - 150;
            this.yMax = height - 350;

            fishImg = <HTMLImageElement>document.querySelector("#fishy")
            this.draw();
        }

        draw(): void {
            /* crc2.fillStyle = "red";
            crc2.fillRect(this.xPos, this.yPos, this.width, this.height); */
            crc2.drawImage(fishImg, this.xPos, this.yPos, this.width, this.height)
            this.animate();
        }

        animate(): void {
            if (this.jumping) {
                if (this.yPos >= this.yMax && this.yPos <= this.yMin) {
                    if (this.rising) {
                        this.yPos -= 17;
                    }

                    else {
                        this.yPos += 13;
                    }
                }
                else if (this.yPos > this.yMin) {
                    this.yPos = height - 150;
                    this.jumping = false
                    this.rising = true;
                    this.falling = false;
                }
                else if (this.yPos < this.yMax) {
                    this.rising = false;
                    this.falling = true;
                    this.yPos = this.yMax;
                }
            }
        }
    }

    class Obstacle {
        alive: boolean = false;
        xPos: number = width;
        yPos: number = height - 130;
        width: number = 70;
        height: number = 50;

        img: HTMLImageElement;

        constructor() {
            this.spawn();
            this.img = <HTMLImageElement>document.querySelector("#obsta")
        }

        draw(): void {
            if (this.alive) {/* 
                crc2.fillStyle = "teal";
                crc2.fillRect(this.xPos, this.yPos, this.width, this.height); */
                crc2.drawImage(this.img, this.xPos, this.yPos, this.width, this.height)
            }
            this.detectCollision()
        }

        animate(): void {
            if (this.xPos <= width && this.xPos > -this.width) {
                this.xPos -= 8;
                this.draw();
            }
            else if (this.xPos <= -70) {
                this.alive = false;
            }
        }

        spawn(): void {
            let random: number = 3000 + Math.random() * (6000 - 3000);
            spawn = window.setInterval(function (): void {
                random = 3000 + Math.random() * (6000 - 3000);
                if (!obsta.alive) {
                    obsta.alive = true;
                    obsta.xPos = width;
                    cooldown = false;
                }
            }, random)
        }

        detectCollision(): void {
            let fishMax: number = fish.xPos + fish.width;
            let obstaMax: number = obsta.xPos + obsta.width;

            let fishMaxY: number = fish.yPos + fish.height;
            let obstaMaxY: number = obsta.yPos + obsta.height;
            /* if (!(fishMax < obsta.xPos || obstaMax < fish.xPos) && !(fishMaxY < obsta.yPos || obstaMaxY < fish.yPos)) { */
            if (!(fishMax - 15 < obsta.xPos + 15 || obstaMax - 15 < fish.xPos + 15) && !(fishMaxY - 15 < obsta.yPos + 15 || obstaMaxY - 15 < fish.yPos + 15)) {

                if (cooldown == false) {
                    points -= 10;
                    cooldown = true; console.log("collide")


                    window.setTimeout(function (): void {
                        cooldown = false;
                    }, 2500)
                }
            }
        }

    }

    class Background {
        //countries: string[] = ["Deutschland", "Österreich", "Slowakei", "Ungarn", "Kroatien", "Serbien", "Rumänien", "Bulgarien", "Republik Moldau", "Ukraine"]
        countries: HTMLImageElement[] = [<HTMLImageElement>document.querySelector("#germany"), <HTMLImageElement>document.querySelector("#austria"), <HTMLImageElement>document.querySelector("#slowakia"), <HTMLImageElement>document.querySelector("#hungary"), <HTMLImageElement>document.querySelector("#croatia"), <HTMLImageElement>document.querySelector("#serbia"), <HTMLImageElement>document.querySelector("#romania"), <HTMLImageElement>document.querySelector("#bulgaria"), <HTMLImageElement>document.querySelector("#moldawia"), <HTMLImageElement>document.querySelector("#ukraine"),]
        counter: number = 0;
        xPos: number;
        yPos: number = 100;
        positionY: number;
        width: number = 200;
        height: number = 100;

        constructor() {
            this.xPos = width;
            this.update();

        }

        update(): void {
            backgroundUpdate = window.setInterval(function (): void {
                if (back.counter < back.countries.length) {
                    back.counter++;
                }
                else {
                    run = false;
                    console.log("hello")
                    clearInterval(backgroundUpdate);
                    clearInterval(spawn);
                    clearInterval(anim);
                    clearInterval(pointCount);

                    canvas.style.display = "none"; 
                    localStorage.setItem("station7", pointCount + ""); 
                    final(); 

                    next.style.display = "block"; 
                    fbBtn.style.display = "block"; 
                    fbBtn.classList.add("right"); 
                    fbBtn.innerHTML = "Toll Gemacht! Dank dir hat es Florian ans Ende der Donau geschafft!"; 
                }
                back.xPos = width;
            }, 7000)

        }

        draw(): void {
            crc2.fillStyle = "yellow";
            crc2.drawImage(this.countries[this.counter], this.xPos, this.yPos, this.width, this.height);
            //crc2.strokeText(this.countries[this.counter], this.xPos + 10, this.yPos + 30);

        }

        animate(): void {
            if (this.xPos <= width) {
                this.xPos -= 6;
                this.draw();
            }
        }
    }

    function setup(): void {
        localStorage.setItem("station7", "0");
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


        localStorage.setItem("points", station1 + station2 + station22 + station3 + station4 + station5 + station6 + station7 + "");
        localStorage.setItem("current", "7");
    }
}