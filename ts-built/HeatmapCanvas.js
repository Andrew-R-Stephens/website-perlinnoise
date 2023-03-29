"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatmapCanvas = void 0;
var s = 1;
var scale = 1;
var drawFull = true;
var drawHeight = undefined;
var slice = false;
var worldMiddleHeight = undefined;
var canRedrawFrame = true;
var HeatmapCanvas = function (ctx, world, worldSize, mult) {
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.canvas.width = worldSize * mult;
    ctx.canvas.height = worldSize * mult;
    scale = mult;
    worldMiddleHeight = Math.floor(world.worldHeight * .5);
    redraw(ctx, world);
    return _this;
};
exports.HeatmapCanvas = HeatmapCanvas;
function redraw(ctx, world) {
    if (!canRedrawFrame) {
        return false;
    }
    function pixelHeat(minimum, maximum, value) {
        var ratio = 2 * (value - minimum) / (maximum - minimum);
        var b = Math.max(0, 255 * (1 - ratio));
        var r = Math.max(0, 255 * (ratio - 1));
        var g = 255 - b - r;
        /*
        let b = value < .1 ? 255 / (maximum-minimum) * value : 0
        const r = 0
        const g = value >= .1 ? 255 / (maximum-minimum) * value : 0
        */
        /*
        let b = 255 / (maximum-minimum) * value
        const r = b
        const g = b
        */
        return { r: r, g: g, b: b };
    }
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var y = 0; y < world.world.length; y++) {
        for (var x = 0; x < world.world[y].length; x++) {
            var v = Math.floor(Math.abs(world.world[y][x].data * world.worldHeight));
            var color = pixelHeat(0, world.worldHeight, v);
            ctx.fillStyle = "rgb(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ")");
            if (drawFull) {
                ctx.fillRect(Math.floor(x * s * scale), Math.floor(y * s * scale), Math.floor(s * scale), Math.floor(s * scale));
            }
            else {
                if (slice) {
                    if (v <= drawHeight) {
                        color = pixelHeat(0, world.worldHeight, Math.min(v, drawHeight));
                        ctx.fillStyle = "rgb(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ")");
                    }
                    else {
                        color = pixelHeat(0, world.worldHeight, Math.min(v, drawHeight));
                        ctx.fillStyle = "rgb(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ")");
                    }
                    ctx.fillRect(Math.floor(x * s * scale), Math.floor(y * s * scale), Math.floor(s * scale), Math.floor(s * scale));
                }
                else {
                    if (v >= drawHeight) {
                        color = pixelHeat(0, world.worldHeight, drawHeight);
                        ctx.fillStyle = "rgb(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ")");
                        ctx.fillRect(Math.floor(x * s * scale), Math.floor(y * s * scale), Math.floor(s * scale), Math.floor(s * scale));
                    }
                }
            }
        }
    }
    return canRedrawFrame = true;
}
exports.default = redraw;
