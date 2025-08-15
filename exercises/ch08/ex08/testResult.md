
> preset-js@1.0.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand ch08/ex08

  console.log
    0

      at log (exercises/ch08/ex08/index.js:49:9)

  console.log                                                                                                                                                                                                                              
    1                                                                                                                                                                                                                                      

      at log (exercises/ch08/ex08/index.js:50:9)

  console.log                                                                                                                                                                                                                              
    2                                                                                                                                                                                                                                      

      at log (exercises/ch08/ex08/index.js:51:9)

  console.log                                                                                                                                                                                                                              
    3                                                                                                                                                                                                                                      

      at log (exercises/ch08/ex08/index.js:54:9)

  console.log                                                                                                                                                                                                                              
    0                                                                                                                                                                                                                                      

      at log (exercises/ch08/ex08/index.js:57:9)

  console.log                                                                                                                                                                                                                              
    1                                                                                                                                                                                                                                      

      at log (exercises/ch08/ex08/index.js:58:9)

  console.log                                                                                                                                                                                                                              
    2                                                                                                                                                                                                                                      

      at log (exercises/ch08/ex08/index.js:59:9)

(node:8144) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  exercises/ch08/ex08/index.test.js
  counterGroup
    Counter                                                                                                                                                                                                                                
      #count                                                                                                                                                                                                                               
        √ It returns incremented value (4 ms)                                                                                                                                                                                              
      #reset                                                                                                                                                                                                                               
        √ It resets incrementedd value                                                                                                                                                                                                     
      Isolation between Counter                                                                                                                                                                                                            
        √ States in counters are isolated (1 ms)                                                                                                                                                                                           
    #total
      √ It returns total amount of all counters in CounterGroup (1 ms)
    #average
      √ It returns average amount of all counters in CounterGroup (11 ms)
    #variance
      √ It returns variance of all counters in CounterGroup (2 ms)
    Isolation between CounterGroup
      √ States in CounterGroups are isolated

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        0.543 s, estimated 1 s
Ran all test suites matching /ch08\\ex08/i.