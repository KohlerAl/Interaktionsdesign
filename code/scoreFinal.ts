namespace scoreFinal {
    window.addEventListener("load", handleLoad)

    function handleLoad(): void {
        console.log(localStorage.getItem("points"));
        let points: HTMLParagraphElement = <HTMLParagraphElement>document.querySelector("#score");
        points.innerHTML = localStorage.getItem("points") + "";

        let div: HTMLDivElement = <HTMLDivElement>document.querySelector("div");
        div.style.height = window.innerHeight + "px";

        document.body.style.margin = 0 + "px";
    }
}