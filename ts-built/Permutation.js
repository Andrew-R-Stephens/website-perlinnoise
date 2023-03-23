"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permutation = void 0;
var Permutation = function (tableDimension) {
    var data = { table: undefined };
    function init(tableDimension) {
        var defaultTable = buildDefault(tableDimension);
        console.log("Default Permutation", defaultTable);
        data.table = randomizeDefaultPermutation(defaultTable);
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
        var newArr = new Array(orderedArr.length);
        var lastItem = 0;
        for (var i = 0; i < newArr.length; i++) {
            var pullIndex = Math.floor(Math.random() * orderedArr.length);
            newArr[i] = lastItem = orderedArr[pullIndex];
            orderedArr.splice(pullIndex, 1);
        }
        return newArr;
    }
    init(tableDimension);
    console.log("Randomized Permutation", data.table);
    return data;
};
exports.Permutation = Permutation;
