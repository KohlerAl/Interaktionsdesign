namespace Fishgame {
    window.addEventListener("load", handleLoad);
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

    let anim;
    let pointCount; 


    function handleLoad(): void {
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
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
    }

    function animate(): void {
        if (run) {
            crc2.fillStyle = "lightblue";
            crc2.fillRect(0, 0, width, height);

            crc2.font = "25px serif";
            crc2.strokeText("" + points, 20, 50);

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
        width: number = 70;
        height: number = 50;

        yMin: number;
        yMax: number;
        jumping: boolean = false;

        rising: boolean = true;
        falling: boolean = false;

        constructor() {
            this.yPos = height - 150;
            this.xPos = 50;

            this.yMin = height - 150;
            this.yMax = 350;

            this.draw();
        }

        draw(): void {
            crc2.fillStyle = "red";
            crc2.fillRect(this.xPos, this.yPos, this.width, this.height);
            this.animate();
        }

        animate(): void {
            if (this.jumping) {
                if (this.yPos >= this.yMax && this.yPos <= this.yMin) {
                    if (this.rising) {
                        this.yPos -= 18;
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
        yPos: number = height - 150;
        width: number = 70;
        height: number = 50;

        constructor() {
            this.spawn();
        }

        draw(): void {
            if (this.alive) {
                crc2.fillStyle = "teal";
                crc2.fillRect(this.xPos, this.yPos, this.width, this.height);
            }
            this.detectCollision()
        }

        animate(): void {
            if (this.xPos <= width && this.xPos > -this.width) {
                this.xPos -= 6;
                this.draw();
            }
            else if (this.xPos <= -70) {
                this.alive = false;
            }
        }

        spawn(): void {
            let random: number = 3000 + Math.random() * (6000 - 3000);
            window.setInterval(function (): void {
                random = 2000 + Math.random() * (5000 - 2000);
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
            if (!(fishMax < obsta.xPos || obstaMax < fish.xPos) && !(fishMaxY < obsta.yPos || obstaMaxY < fish.yPos)) {
                if (cooldown == false) {
                    points -= 10;
                    cooldown = true;

                    window.setTimeout(function (): void {
                        cooldown = false;
                    }, 2500)
                }
            }
        }

    }

    class Background {
        countries: string[] = ["Deutschland", "Österreich", "Slowakei", "Ungarn", "Kroatien", "Serbien", "Rumänien", "Bulgarien", "Republik Moldau", "Ukraine"]
        counter: number = 0;
        xPos: number;
        yPos: number = 100;
        positionY: number;
        width: number = 200;
        height: number = 50;

        constructor() {
            this.xPos = width;
            this.update();
        }

        update(): void {
            window.setInterval(function (): void {
                if (back.counter < back.countries.length) {
                    back.counter++;
                }
                else {
                    run = false; 
                }
                back.xPos = width;
            }, 7000)

        }

        draw(): void {
            crc2.fillStyle = "yellow";
            crc2.fillRect(this.xPos, this.yPos, this.width, this.height);
            crc2.strokeText(this.countries[this.counter], this.xPos + 10, this.yPos + 30);

        }

        animate(): void {
            if (this.xPos <= width) {
                this.xPos -= 6;
                this.draw();
            }
        }
    }
}