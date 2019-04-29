export default const permute = (input) => {
    var permArr = [],
        usedChars = [];
    function main(input){
        var i, ch;
        for (i = 0; i < input.length; i++) {
            ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length == 0) {
                permArr.push(usedChars.slice());
            }
            main(input);
            input.splice(i, 0, ch);
            usedChars.pop();
        }
        return permArr
    }
    return main(input);
};

// function test() {
//     console.log(arguments)
// }
// const handler = test.bind(null, {roomId: 1})
//
// function arr() {
//     handler.apply(handler, [[{root:23123}]])
// }

function handler({callback, id}){
    console.log(id)
}

var build = handler.bind(null, {
    id: 123,
})

function arr() {
    build.apply(build, [[id: 123}]])
}