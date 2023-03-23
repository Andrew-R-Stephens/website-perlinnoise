import {World} from "./World";

export const Perlin = (permutation:Array<number>, world:World) => {

    let data = {mapSize: 0, noise: undefined};

    function init(defaultPermutation: Array<number>):Array<number> {
        defaultPermutation.forEach((item)=>{
            permutation[item] = item;
        })

        return permutation;
    }

    function noise(x: number, y: number, z: number): number {
        // Find unit cube that contains point
        let xi = Math.floor(x) & 255
        let yi = Math.floor(y) & 255
        let zi = Math.floor(z) & 255

        // Find relative x, y, z of point in cube
        let xx = x - Math.floor(x)
        let yy = y - Math.floor(y)
        let zz = z - Math.floor(z)

        // Compute fade curves for each of xx, yy, zz
        let u = fade(xx)
        let v = fade(yy)
        let w = fade(zz)

        // Hash co-ordinates of the 8 cube corners
        // and add blended results from 8 corners of cube

        let a  = permutation[xi] + yi
        let aa = permutation[a] + zi
        let ab = permutation[a + 1] + zi
        let b  = permutation[xi + 1] + yi
        let ba = permutation[b] + zi
        let bb = permutation[b + 1] + zi

        return lerp(w, lerp(v, lerp(u, grad(permutation[aa], xx, yy, zz),
                    grad(permutation[ba], xx - 1, yy, zz)
                ),
                lerp(u, grad(permutation[ab], xx, yy - 1, zz),
                    grad(permutation[bb], xx - 1, yy - 1, zz)
                )
            ),
            lerp(v, lerp(u, grad(permutation[aa + 1], xx, yy, zz - 1),
                    grad(permutation[ba + 1], xx - 1, yy, zz - 1)
                ),
                lerp(u, grad(permutation[ab + 1], xx, yy - 1, zz - 1),
                    grad(permutation[bb + 1], xx - 1, yy - 1, zz - 1)
                )
            )
        )
    }

    function fade(t: number) {
        return t * t * t * (t * (t * 6 - 15) + 10)
    }

    function lerp(t: number, a: number, b: number) {
        return a + t * (b - a)
    }

    function grad(hash: number, x: number, y: number, z: number): number {
        // Convert low 4 bits of hash code into 12 gradient directions
        let h = hash & 15;
        let u = (h < 8) ? x : y;
        let v = (h < 4) ? y : (h == 12 || h == 14) ? x : z;
        return (
                ((h & 1) == 0) ? u : -u) +
            (((h & 2) == 0) ? v : -v)
    }

    function build() {

        let highest = 0.0
        let lowest = 0.0

        let mapSize = world.worldSize
        let scale = mapSize*.01

        for (let i = 0; i < mapSize; i++) {
            for (let j = 0; j < mapSize; j++) {
                let randomNoise = Math.abs(noise(
                    scale*j,
                    scale*i,
                    scale * world.worldHeight
                ))
                if(randomNoise > highest)
                    highest = randomNoise
                if(randomNoise < lowest)
                    lowest = randomNoise
            }
        }

        let output = [[], []];
        for (let i = 0; i < mapSize; i++) {
            output.push(new Array<number>())
            for (let j = 0; j < mapSize; j++) {
                let randomNoise = Math.abs(noise(
                    scale*j,
                    scale*i,
                    scale*world.worldHeight
                ))/(highest-lowest)

                output[i].push(randomNoise)
            }
        }

        data = {mapSize: mapSize, noise: output}

        world.build(data.noise, {lowest, highest});
    }

    init(permutation);
    build();

}

export function combine(noiseA:[[], []], noiseB:[[], []]): Array<Array<number>> {
    let noise = [[], []]
    for(let y = 0; y < noiseA.length; y++) {
        for(let x=0; x < noiseA[y].length; x++) {
            noise[y][x] = (noiseA[y][x] + noiseB[y][x])*.5;
        }
    }
    return noise;
}