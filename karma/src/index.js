function isNum(num) {
    if (typeof num === 'number') {
        return true
    } else {
        return false
    }
};

function add(x) {
    return (y) => {
        return x + y
    }
};

function add(x){
    return(y)=>{
        return x + y
    }
}

export {
    add
}