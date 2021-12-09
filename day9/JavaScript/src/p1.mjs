console.time('exec time');
import { readFileSync } from 'fs';
var array = readFileSync('data/input').toString().split('\n');
const toInt = (arr) => arr.map((i) => parseInt(i, 10));
array=array.map((vl)=>{
    return toInt(vl.split(""))
})


const isTrou= (arr,x,y) => {
    if (x==0){
        if (y==0){
            return (arr[y][x]< arr[y][x+1] && arr[y][x] < arr[y-1][x])
        }
        if (y==arr.length){
            return (arr[y][x]< arr[y-1][x] && arr[y][x]< arr[y][x+1])
        }
        return ( arr[y][x]< arr[y-1][x] && arr[y][x]< arr[y][x+1] && arr[y][x] < arr[y-1][x])

    }
    if (x==arr[0].length){
        if (y==0){
            return (arr[y][x]< arr[y][x-1] && arr[y][x] < arr[y-1][x])
        }
        if (y==arr.length){
            return (arr[y][x]< arr[y-1][x] && arr[y][x]< arr[y][x-1])
        }
        return ( arr[y][x]< arr[y-1][x] && arr[y][x]< arr[y][x-1] && arr[y][x] < arr[y-1][x])

    }
}

console.log(array)




console.timeEnd('exec time');
