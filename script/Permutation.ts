
export const Permutation = (tableDimension:number) => {

    let data = {table: undefined}

    function init(tableDimension:number) {
        let defaultTable = buildDefault(tableDimension)
        console.log("Default Permutation", defaultTable)
        data.table = randomizeDefaultPermutation(defaultTable);
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

    function randomizeDefaultPermutation(orderedArr: Array<number>):Array<number> {
        const newArr = new Array<number>(orderedArr.length);
        for(let i = 0; i < newArr.length; i++) {
            let pullIndex = Math.floor(Math.random() * orderedArr.length);
            newArr[i] = orderedArr[pullIndex];
            orderedArr.splice(pullIndex, 1);
        }
        return newArr;
    }

    init(tableDimension);
    console.log("Randomized Permutation", data.table)

    return data;

}
