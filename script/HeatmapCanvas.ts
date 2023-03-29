import {World} from "./World";

let s = 1;
let scale = 1;

let drawHeight:number = undefined;
let slice:boolean = false;

let worldMiddleHeight:number = undefined;

export const HeatmapCanvas = (ctx, world:World, worldSize, mult) => {
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.canvas.width = worldSize * mult;
    ctx.canvas.height = worldSize * mult;
    scale = mult;
    worldMiddleHeight = Math.floor(world.worldHeight * .5)
    redraw(ctx, world)

    return this;
}

function redraw(ctx: any, world:World): boolean {

    function pixelHeat(minimum:number, maximum:number, value:number) {
        const ratio = 2 * (value - minimum) / (maximum - minimum)
        const b = Math.max(0, 255 * (1 - ratio))
        const r = Math.max(0, 255 * (ratio - 1))
        const g = 255 - b - r
        /*
        let b = value < .1 ? 255 / (maximum-minimum) * value : 0
        const r = 0
        const g = value >= .1 ? 255 / (maximum-minimum) * value : 0
        */
        /*let b = 255 / (maximum-minimum) * value
        const r = b
        const g = b
*/
        return {r, g, b}
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let y = 0; y < world.world.length; y++) {
        for (let x = 0; x < world.world[y].length; x++) {
            let v = Math.floor(Math.abs(world.world[y][x].data * world.worldHeight));
            let color = pixelHeat(0, world.worldHeight, v);
            ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
            if(drawHeight === undefined) {
                ctx.fillRect(Math.floor(x * s * scale), Math.floor(y * s * scale), Math.floor(s * scale), Math.floor(s * scale));
            } else {
                if(slice) {
                    if (v <= drawHeight) {
                        let color = pixelHeat(0, world.worldHeight, Math.min(v, drawHeight));
                        ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
                    } else {
                        let color = pixelHeat(0, world.worldHeight, Math.min(v, drawHeight));
                        ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
                    }
                    ctx.fillRect(Math.floor(x * s * scale), Math.floor(y * s * scale), Math.floor(s * scale), Math.floor(s * scale));
                } else {
                    if (v == drawHeight) {
                        ctx.fillRect(Math.floor(x * s * scale), Math.floor(y * s * scale), Math.floor(s * scale), Math.floor(s * scale));
                    }
                }
            }
        }
    }

    return true;
}

export default redraw;