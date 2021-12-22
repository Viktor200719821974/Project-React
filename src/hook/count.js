
const count = (arr) => {
    let sum = 0;
    let num = arr.length;
    if (num === 0){
        return 0
    }else{
        arr.forEach(function(item){
            sum += item
        })}
    return Math.round(sum/num);
};

export {count};
