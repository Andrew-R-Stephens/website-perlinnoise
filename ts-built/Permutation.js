"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permutation = void 0;
var Permutation = function (tableDimension) {
    function init(tableDimension) {
        var defaultTable = buildDefault(tableDimension);
        console.log("Default Permutation", defaultTable);
        var newTable = randomizeDefaultPermutation(defaultTable);
        console.log("Randomized Permutation", newTable);
        return newTable;
    }
    function buildDefault(n) {
        var min = 0;
        var max = n - (min + 1);
        var orderedArr = new Array(n);
        for (var i = min; i <= max; i++) {
            orderedArr[i] = i;
        }
        return orderedArr;
    }
    function randomizeDefaultPermutation(orderedArr) {
        var _a;
        var newArr = new Array(orderedArr.length);
        orderedArr.map(function (item, index) {
            newArr[index] = item;
        });
        var currentIndex = newArr.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            _a = [
                newArr[randomIndex], newArr[currentIndex]
            ], newArr[currentIndex] = _a[0], newArr[randomIndex] = _a[1];
        }
        return newArr;
    }
    return init(tableDimension);
};
exports.Permutation = Permutation;
