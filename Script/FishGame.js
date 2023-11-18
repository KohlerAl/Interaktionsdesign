"use strict";
var Fishgame;
(function (Fishgame) {
    window.addEventListener("load", handleLoad);
    let fish;
    let canvas;
    let crc2;
    let width;
    let height;
    let obsta;
    let back;
    let points = 0;
    let cooldown = true;
    let run = true;
    let anim;
    let pointCount;
    function handleLoad() {
        canvas = document.querySelector("canvas");
        canvas.addEventListener("touchstart", tappyTap);
        width = window.innerWidth;
        canvas.setAttribute("width", width + "px");
        height = window.innerHeight;
        canvas.setAttribute("height", height + "px");
        crc2 = canvas.getContext("2d");
        crc2.fillStyle = "lightblue";
        crc2.fillRect(0, 0, width, height);
        document.body.setAttribute("overflow", "hidden");
        fish = new Fishy();
        obsta = new Obstacle();
        back = new Background();
        anim = window.setInterval(animate, 50);
        pointCount = window.setInterval(updatePoints, 1000);
    }
    function animate() {
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
    function updatePoints() {
        points++;
    }
    function tappyTap() {
        fish.jumping = true;
    }
    class Fishy {
        yPos;
        xPos;
        width = 70;
        height = 50;
        yMin;
        yMax;
        jumping = false;
        rising = true;
        falling = false;
        constructor() {
            this.yPos = height - 150;
            this.xPos = 50;
            this.yMin = height - 150;
            this.yMax = 350;
            this.draw();
        }
        draw() {
            crc2.fillStyle = "red";
            crc2.fillRect(this.xPos, this.yPos, this.width, this.height);
            this.animate();
        }
        animate() {
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
                    this.jumping = false;
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
        alive = false;
        xPos = width;
        yPos = height - 150;
        width = 70;
        height = 50;
        constructor() {
            this.spawn();
        }
        draw() {
            if (this.alive) {
                crc2.fillStyle = "teal";
                crc2.fillRect(this.xPos, this.yPos, this.width, this.height);
            }
            this.detectCollision();
        }
        animate() {
            if (this.xPos <= width && this.xPos > -this.width) {
                this.xPos -= 6;
                this.draw();
            }
            else if (this.xPos <= -70) {
                this.alive = false;
            }
        }
        spawn() {
            let random = 3000 + Math.random() * (6000 - 3000);
            window.setInterval(function () {
                random = 2000 + Math.random() * (5000 - 2000);
                if (!obsta.alive) {
                    obsta.alive = true;
                    obsta.xPos = width;
                    cooldown = false;
                }
            }, random);
        }
        detectCollision() {
            let fishMax = fish.xPos + fish.width;
            let obstaMax = obsta.xPos + obsta.width;
            let fishMaxY = fish.yPos + fish.height;
            let obstaMaxY = obsta.yPos + obsta.height;
            if (!(fishMax < obsta.xPos || obstaMax < fish.xPos) && !(fishMaxY < obsta.yPos || obstaMaxY < fish.yPos)) {
                if (cooldown == false) {
                    points -= 10;
                    cooldown = true;
                    window.setTimeout(function () {
                        cooldown = false;
                    }, 2500);
                }
            }
        }
    }
    class Background {
        countries = ["Deutschland", "Österreich", "Slowakei", "Ungarn", "Kroatien", "Serbien", "Rumänien", "Bulgarien", "Republik Moldau", "Ukraine"];
        counter = 0;
        xPos;
        yPos = 100;
        positionY;
        width = 200;
        height = 50;
        constructor() {
            this.xPos = width;
            this.update();
        }
        update() {
            window.setInterval(function () {
                if (back.counter < back.countries.length) {
                    back.counter++;
                }
                else {
                    run = false;
                }
                back.xPos = width;
            }, 7000);
        }
        draw() {
            crc2.fillStyle = "yellow";
            crc2.fillRect(this.xPos, this.yPos, this.width, this.height);
            crc2.strokeText(this.countries[this.counter], this.xPos + 10, this.yPos + 30);
        }
        animate() {
            if (this.xPos <= width) {
                this.xPos -= 6;
                this.draw();
            }
        }
    }
})(Fishgame || (Fishgame = {}));
//# sourceMappingURL=FishGame.js.map