function printEven(x){
    if(x < 0)
        return
    if(x%2==1){
        return printEven(x-1)
    }
    printEven(x-2);
    console.log(x);
}

const x = 11 // set any number
printEven(x)