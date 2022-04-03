import { HTML } from "imperative-html";
//import { Song } from "../synth/synth";
import { SongDocument } from "./SongDocument";

export class Oscilloscope {
    private readonly _doc: SongDocument;
    private readonly _oscilloCanvas: HTMLCanvasElement = HTML.canvas({ width: 300, height: 100 });
    private readonly _container: HTMLElement;

    constructor(doc: SongDocument, container: HTMLElement) {
        this._container = container;
        this._doc = doc;
        container.appendChild(this._oscilloCanvas);

        var canvas = this._oscilloCanvas;
        var ctx = this._oscilloCanvas.getContext("2d");
        
        if (ctx === null) {
            throw new Error("oscilloscope canvas is null");
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }
    
    public redraw(): void {
        var ctx = this._oscilloCanvas.getContext("2d");
        var canvas = this._oscilloCanvas;
        
        canvas.width = this._container.offsetWidth;
        
        if (ctx === null) {
            throw new Error("oscilloscope canvas is null");
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var oscilloL = this._doc.synth.oscilloL;

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        var stepx = 16;

        ctx.beginPath();

        ctx.moveTo(0, canvas.height / 2);

        for (let i = 0; i < oscilloL.length; i += stepx) {
            let x = canvas.width / oscilloL.length * i;
            let y = oscilloL[i] / 0.5 * canvas.height / 2 + canvas.height / 2;
            ctx.lineTo(x, y);
        }

        ctx.stroke();
        ctx.closePath();
    }
}