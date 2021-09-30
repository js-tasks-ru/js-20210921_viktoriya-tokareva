/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    const arr = [];
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if(size === 0) {
            break;
        }
        if (string[i] == string[i-1]) {
            count++;
            if (count >= size) {
                continue;
            }
            arr[i] = string[i];
        } else if (string[i] != string[i-1] ){
            count = 0;
            arr[i] = string[i];
        }
    }
    return arr.join('');
}
