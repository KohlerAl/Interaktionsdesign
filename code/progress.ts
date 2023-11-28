namespace Progress {
    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        let prog: HTMLElement = <HTMLElement>document.querySelector("progress");
        prog.style.top = window.innerHeight - 30 + "px"; 

        let next: HTMLElement = <HTMLElement>document.querySelector(".next"); 
        next.style.top = window.innerHeight - 70 + "px"; 
    }
}