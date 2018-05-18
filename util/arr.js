var permute = input => {
    var permArr = [],
        usedChars = [];
    return (function main(input){
        var ch;
        input.forEach((el, i) => {
            ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length === 0) {
                permArr.push(usedChars.join());
            }
            main(input);
            input.splice(i, 0, ch);
            usedChars.pop();
        });
        return permArr
    })(input);
};
debugger
console.log(permute(['a','b', 'c']));