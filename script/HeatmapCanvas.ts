import {World} from "./World";

let s = 1;
let scale = 1;

export const HeatmapCanvas = (ctx, world:World, worldSize, mult) => {
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.canvas.width = worldSize * mult;
    ctx.canvas.height = worldSize * mult;
    scale = mult;

    redraw(ctx, world)

    return this;
}

function redraw(ctx: any, world:World) {

    function pixelHeat(minimum:number, maximum:number, value:number) {

        const min = minimum
        const max = maximum
        const ratio = 2 * (value - min) / (max - min)
        const b = Math.max(0, 255 * (1 - ratio))
        const r = Math.max(0, 255 * (ratio - 1))
        const g = 255 - b - r
        /*let b = value < .1 ? 255 / (maximum-minimum) * value : 0
        const r = 0
        const g = value >= .1 ? 255 / (maximum-minimum) * value : 0*/
        return {r, g, b}
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let y = 0; y < world.world.length; y++) {
        for (let x = 0; x < world.world[y].length; x++) {

            let v = Math.floor(Math.abs(world.world[y][x].data * world.worldHeight));
            let color = pixelHeat(0, world.worldHeight, v);
            console.log(v, color)

            ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
            ctx.fillRect(Math.floor(x * s * scale), Math.floor(y * s * scale), Math.floor(s * scale), Math.floor(s * scale));

        }
    }
}

export default redraw;