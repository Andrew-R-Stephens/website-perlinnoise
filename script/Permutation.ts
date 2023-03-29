
export function Permutation(tableDimension:number) {

    function init(tableDimension:number) {
        let defaultTable = buildDefault(tableDimension)
        let newTable = randomizeDefaultPermutation(defaultTable);
        return newTable
    }

    function buildDefault(n:number):Array<number> {
        let min = 0;
        let max = n-(min+1);

        let orderedArr = new Array(n);
        for(let i = min; i <= max; i++) {
            orderedArr[i] = i;
        }

        return orderedArr;
    }

    function randomizeDefaultPermutation(orderedArr: Array<number>): Array<number> {
        let newArr = new Array<number>(orderedArr.length);
        orderedArr.map((item:number, index:number)=>{
            newArr[index] = item;
        })

        let currentIndex = newArr.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [newArr[currentIndex], newArr[randomIndex]] = [
                newArr[randomIndex], newArr[currentIndex]];
        }

        return newArr;
    }

    return init(tableDimension)

}
