"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatmapCanvas = void 0;
var s = 1;
var scale = 1;
var HeatmapCanvas = function (ctx, world, worldSize, mult) {
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.canvas.width = worldSize * mult;
    ctx.canvas.height = worldSize * mult;
    scale = mult;
    redraw(ctx, world);
    return _this;
};
exports.HeatmapCanvas = HeatmapCanvas;
function redraw(ctx, world) {
    function pixelHeat(minimum, maximum, value) {
        var min = minimum;
        var max = maximum;
        /*const ratio = 2 * (value - min) / (max - min)
        const b = Math.max(0, 255 * (1 - ratio))
        const r = Math.max(0, 255 * (ratio - 1))
        const g = 255 - b - r*/
        var b = value < .1 ? 255 / (maximum - minimum) * value : 0;
        var r = 0;
        var g = value >= .1 ? 255 / (maximum - minimum) * value : 0;
        return { r: r, g: g, b: b };
    }
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var y = 0; y < world.world.length; y++) {
        for (var x = 0; x < world.world[y].length; x++) {
            var v = Math.abs(world.world[y][x].data * world.worldHeight);
            var color = pixelHeat(0, world.worldHeight, v);
            ctx.fillStyle = "rgb(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ")");
            ctx.fillRect(Math.floor(x * s * scale), Math.floor(y * s * scale), Math.floor(s * scale), Math.floor(s * scale));
        }
    }
}
exports.default = redraw;
