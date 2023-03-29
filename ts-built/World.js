"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
var World = /** @class */ (function () {
    function World(worldSize, worldHeight) {
        this.world = new Array();
        this.worldSize = 0;
        this.worldHeight = 0;
        this.min = 0;
        this.max = 0;
        this.worldSize = worldSize;
        this.worldHeight = worldHeight;
    }
    World.prototype.build = function (noise, heightData) {
        this.min = heightData.min;
        this.max = heightData.max;
        for (var y = 0; y < noise.length; y++) {
            this.expandH();
            for (var x = 0; x < noise[y].length; x++) {
                this.expandW(new Chunk(noise[y][x]));
            }
        }
    };
    World.prototype.expandH = function () {
        this.world.push(new Array());
    };
    World.prototype.expandW = function (c) {
        this.world[this.world.length - 1].push(c);
    };
    World.prototype.getZ = function (x, y) {
        return this.world[y][x].data;
    };
    return World;
}());
exports.World = World;
var Chunk = /** @class */ (function () {
    function Chunk(data) {
        this.data = data;
    }
    return Chunk;
}());
