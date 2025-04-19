//Task1
function removeDuplicates(arr) {
    return [...new Set(arr)];
}


    const numbers = [1, 2, 2, 3, 4, 4];
    const unique = [...new Set(numbers)];

    console.log(unique);
//-----------------------------------------------------------
//Task2

function intersection(...arrays) {
    const firstArray = arrays[0];
    const result = [];

    for (let i = 0; i < firstArray.length; i++) {
        const item = firstArray[i];

        if (
            !result.includes(item) &&
            arrays.every(arr => arr.includes(item))
        ) {
            result.push(item);
        }
    }

    return result;
}

console.log(intersection([1, 2], [2, 3], [2,3,4]));
console.log(intersection([3,7,2],[3,8],[3,7,9]));
//-----------------------------------------------------------
//Task3

function isEmptyDeep(obj) {
    function isEmptyValue(val) {
        if (val === "" || val === null || val === undefined) return true;
        if (typeof val === "number" && isNaN(val)) return true;
        if (Array.isArray(val) && val.length === 0) return true;
        if (typeof val === "object" && val !== null) {
            return isEmptyDeep(val);
        }
        return false;
    }

    for (let key in obj) {
        if (!isEmptyValue(obj[key])) {
            return false;
        }
    }
    return true;
}
// -------------------------------------------------------------
//Task4



















