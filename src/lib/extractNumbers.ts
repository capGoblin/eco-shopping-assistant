const extractNumbers = (str: string): number => {
    const numbers = str.match(/\d+/); 
    return numbers ? parseInt(numbers[0]) : 0;
}

export default extractNumbers;
