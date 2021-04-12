const isPrime = function (n) {
    if (n < 2) {
      return false;
    }
    if (n == 2) {
      return true;
    }
    for (let i = 2; i < n; i++) {
      if (n % i == 0) {
        return false;
      }
    }
    return true;
  };
  
  const EventEmitter = require('events');
  // const { emit } = require('process');
  
  const findPrime = (str, min, max) => {
    let event = new EventEmitter();
  
    // let prime = [];
    let lo = min;
    let hi = Math.min(lo + 100, max);
    let count = 0;
    let abc = setInterval(() => {
      if (min > max) {
        event.emit('ERROR', { min, max });
        return event;
      }
      event.emit('Started', str);
      for (let i = lo; i < hi; i++) {
        if (isPrime(i)) {
          ++count;
          event.emit('prime', { str, count, i });
  
          //     prime.push(i);
          //   //  callback(i);
          //   let num=prime[i];
        }
      }
      lo = hi;
      hi = Math.min(lo + 100, max);
      let percentage = (lo / max) * 100;
      event.emit('percentage', percentage);
      if (lo >= max) {
        clearInterval(abc);
        // callback(prime);
        event.emit('done', str);
      }
    }, 500);
    return event;
  };
  
  function testFindPrimes(str, min, max){
    let result = findPrime(str, min, max);
    result
      .on('ERROR', (data) => console.log(`data Entered is wrong ${data.min} and ${data.max}`))
      .on('Started', (str) => console.log(`---------------------start ${str}------------------------`))
      .on('prime', (value) => console.log(`Prime Number of ${value.str} at ${value.count} is ${value.i}`))
      .on('done', (str) => console.log(`-------------------------done ${str}-------------------`))
      .on('percentage', (data) => console.log(`----------The % covered is ${data}-----------------`));
  
    //     findPrime(min, max, (primes) => {
    //         console.log(`Total number of primes between ${min} - ${max} is ${primes.length}`);
    //     });
    //     console.log(`finding primes between ${min}-${max}`);
  }
  
  testFindPrimes('', 2000, 100);
  testFindPrimes('second', 2, 100);
  testFindPrimes('third', 2, 1000);
  testFindPrimes('First', 2, 10);
  