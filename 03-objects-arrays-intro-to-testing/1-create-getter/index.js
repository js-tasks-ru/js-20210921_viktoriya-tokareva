/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    let arr = path.split(".");
    return function (obj) {
        for (let prop of arr) {
            if (!obj[prop]) {
                return undefined;
            }
            obj = obj[prop];
        }
        return obj; 
    }
}
