/**
 * Author: silence
 * Create Time: 2018-09-20 14:34
 * Description:
 */
const util = require('util');

let colorCodes = {
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],

    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [94, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    grey: [90, 39],

    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],

    // legacy styles for colors pre v1.0.0
    blackBG: [40, 49],
    redBG: [41, 49],
    greenBG: [42, 49],
    yellowBG: [43, 49],
    blueBG: [44, 49],
    magentaBG: [45, 49],
    cyanBG: [46, 49],
    whiteBG: [47, 49]

};

const makeColor = (color, msg) => {
    // const msg = consoleFormat.apply(null, arguments);

    if (!color) {
        return msg;
    }

    let args = [];

    return `\x1b[${ colorCodes[color][0] }m${ msg }\x1b[${ colorCodes[color][1] }m`;
};

class Colors{
    constructor(){
        Object.keys(colorCodes).map(value => {
            this[value] = function (test) {
                return makeColor(value, test)
            }
        })
    }

    init(){
        const x = Object.keys(colorCodes);
        x.forEach(value => {
            this.addEvent(value)
        });
    }

    addEvent(value){
        String.prototype.__defineGetter__(value, function() {
            return makeColor(value, this + '')
        });
    }

    setTheme(options){
        Object.keys(options).map(value => {
            colorCodes[value] = colorCodes[options[value]];
            this[value] = function (test) {
                return makeColor(value, test)
            }
            this.addEvent(colorCodes[value])
        })
    }
}
exports.Colors =  new Colors();

const colors = new Colors();
colors.init();
// console.log('silence'.red.bold);
// console.log('silence'.yellow.dim.bold);
// console.log('silence'.green.italic.bold);
// console.log('silence'.blue.underline.bold);
// console.log('silence'.cyan.inverse.bold);
// console.log('silence'.magenta.hidden.bold);
// console.log('silence'.grey.strikethrough.bold);
colors.setTheme({
    error: 'red',
});

console.log(colors.red('123').bold);
console.log(colors.error(123123));
