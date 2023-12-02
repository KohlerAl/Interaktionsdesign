namespace score {
    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        console.log(localStorage.getItem("points"));
        let points: HTMLParagraphElement = <HTMLParagraphElement>document.querySelector("#score");
        points.innerHTML = localStorage.getItem("points") + "";

        let div: HTMLDivElement = <HTMLDivElement>document.querySelector("div");
        div.style.height = window.innerHeight + "px";

        document.body.style.margin = 0 + "px";

        let current: number = Number(localStorage.getItem("current"));
        let progress: HTMLProgressElement = <HTMLProgressElement>document.querySelector("progress"); 
        progress.setAttribute("value", "." + current); 
        current++; 
        console.log(current)

        let a: HTMLAnchorElement = <HTMLAnchorElement>document.querySelector(".next"); 
        a.setAttribute("href", "station" + current + "_1.html"); 
    }
}