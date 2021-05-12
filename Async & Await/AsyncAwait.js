/*In the async function, await keyword waits for the promise to be complete (resolve or reject).
Promises are better than callbacks and solved the problems that the callbacks introduced , but
     this type of unnatural way of dealing with asyncronous code.So we used async/await which helped
    to deal async code naturally and with no more Mess.*/

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
    async function main(){
        console.log("Starts.....");
        try{
            let result=await positiveOrNegavtie(-22);
            console.log(result);
        }
        catch(error){
            console.log(error);
        }
        console.log("Ends......");
    }
    main();
    
    
    /*-----Conclusions------
    Prmise can never called be again and again (returns whole array)
    but callbacks can be called multiple times (can be used to evaluate set of numbers)
    async function will always return a promise
    we can call the .then method to to the name of the async function 
    The code is more readable than using a callback or a promise.
    Error handling is simpler.
    Debugging is easier.
    */