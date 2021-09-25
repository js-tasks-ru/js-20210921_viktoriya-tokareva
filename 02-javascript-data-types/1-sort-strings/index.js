/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    let sortedArr = arr.slice();
    if (param == 'asc') {
        if (/[а-я]/i.test(sortedArr[0])) {
            return sortedArr.sort((a, b) => a.localeCompare(b, 'ru-u-kf-upper'));
        }
        if (/[a-z]/i.test(sortedArr[0])) {
            return sortedArr.sort((a, b) => a.localeCompare(b, 'en-u-kf-upper'));
        }
    } else {
        if (/[а-я]/i.test(sortedArr[0])) {
            return sortedArr.sort((a, b) => b.localeCompare(a, 'ru-u-kf-lower'));
        }
        if (/[a-z]/i.test(sortedArr[0])) {
            return sortedArr.sort((a, b) => b.localeCompare(a, 'en-u-kf-lower'));
        }
    }
}
