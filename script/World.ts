
export class World {

    world:Array<Array<Chunk>> = new Array<Array<Chunk>>();
    worldSize:number = 0;
    worldHeight:number = 0;
    min:number = 0;
    max:number = 0;

    constructor(worldSize:number, worldHeight:number) {
        this.worldSize = worldSize;
        this.worldHeight = worldHeight;
    }

    build(noise:Array<Array<number>>, heightData) {
        this.min = heightData.min
        this.max = heightData.max;

        for(let y = 0; y < noise.length; y++) {
            this.expandH();
            for(let x = 0; x < noise[y].length; x++) {
                this.expandW(new Chunk(noise[y][x]));
            }
        }
    }

    private expandH() {
        this.world.push(new Array<Chunk>());
    }

    private expandW(c:Chunk) {
        this.world[this.world.length-1].push(c);
    }

}

class Chunk {

    data: number;

    constructor(data: number) {
        this.data = data;
    }

}