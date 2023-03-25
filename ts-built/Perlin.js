"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perlin = void 0;
var Perlin = function (permutation, world) {
    var data = { mapSize: 0, noise: new Array };
    function noise(x, y, z) {
        // Find unit cube that contains point
        var xi = Math.floor(x) & (permutation.length - 1);
        var yi = Math.floor(y) & (permutation.length - 1);
        var zi = Math.floor(z) & (permutation.length - 1);
        // Find relative x, y, z of point in cube
        var xx = x - Math.floor(x);
        var yy = y - Math.floor(y);
        var zz = z - Math.floor(z);
        // Compute fade curves for each of xx, yy, zz
        var u = fade(xx);
        var v = fade(yy);
        var w = fade(zz);
        // Hash co-ordinates of the 8 cube corners
        // and add blended results from 8 corners of cube
        var a = permutation[xi] + yi;
        var aa = permutation[a] + zi;
        var ab = permutation[a + 1] + zi;
        var b = permutation[xi + 1] + yi;
        var ba = permutation[b] + zi;
        var bb = permutation[b + 1] + zi;
        return lerp(w, lerp(v, lerp(u, grad(permutation[aa], xx, yy, zz), grad(permutation[ba], xx - 1, yy, zz)), lerp(u, grad(permutation[ab], xx, yy - 1, zz), grad(permutation[bb], xx - 1, yy - 1, zz))), lerp(v, lerp(u, grad(permutation[aa + 1], xx, yy, zz - 1), grad(permutation[ba + 1], xx - 1, yy, zz - 1)), lerp(u, grad(permutation[ab + 1], xx, yy - 1, zz - 1), grad(permutation[bb + 1], xx - 1, yy - 1, zz - 1))));
    }
    function fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }
    function lerp(t, a, b) {
        return a + t * (b - a);
    }
    function grad(hash, x, y, z) {
        // Convert low 4 bits of hash code into 12 gradient directions
        var h = hash & 15;
        var u = (h < 8) ? x : y;
        var v = (h < 4) ? y : (h == 12 || h == 14) ? x : z;
        return (((h & 1) == 0) ? u : -u) +
            (((h & 2) == 0) ? v : -v);
    }
    function build() {
        var highest = 0.0;
        var lowest = 0.0;
        var mapSize = world.worldSize;
        var scale = mapSize * .0001;
        var output = new Array;
        for (var i = 0; i < mapSize; i++) {
            output.push(new Array());
            for (var j = 0; j < mapSize; j++) {
                var randomNoise = Math.abs(noise(scale * j, scale * i, scale));
                output[i].push(randomNoise);
                if (randomNoise > highest)
                    highest = randomNoise;
                if (randomNoise < lowest)
                    lowest = randomNoise;
            }
        }
        var maxDifference = (highest - lowest);
        for (var i = 0; i < output.length; i++) {
            for (var j = 0; j < output[i].length; j++) {
                output[i][j] /= maxDifference;
            }
        }
        data = { mapSize: mapSize, noise: output };
        world.build(data.noise, { lowest: lowest, highest: highest });
    }
    console.log("Building perlin");
    build();
};
exports.Perlin = Perlin;
