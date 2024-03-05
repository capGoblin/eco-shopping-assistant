const extractNumbers = (str: any): number => {
    if (typeof str === 'string') {
        let numStr = '';
        for (let char of str) {
            if ('0123456789'.includes(char)) {
                numStr += char;
            }
        }
        return numStr.length > 0 ? parseInt(numStr) : 0;
    }
    return 0;
};

export default extractNumbers;
