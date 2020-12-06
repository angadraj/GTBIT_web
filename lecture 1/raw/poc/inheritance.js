
Array.prototype.sum = function () {
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        sum += this[i];
    }
    return sum;
}
var arr = [2, 3, 4, 5];
console.log(arr.sum());


