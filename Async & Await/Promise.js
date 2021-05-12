/*a promise is a good way to handle asynchronous operations. 
It is used to find out if the asynchronous operation is successfully completed or not.*/
function positiveOrNegavtie(num){
    return new Promise(
        (resolve,reject)=>{
            setTimeout(
                ()=>{
                    if(num>0)
            resolve("Positive");
            else
            reject("Negative");
                },3000);
        }
    )
}

console.log("Starts.....");
positiveOrNegavtie(-22)
    .then(result=>console.log(result))
    .catch(error=>console.log(error));
console.log("Ends......");