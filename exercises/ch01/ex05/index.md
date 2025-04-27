テストコード実行の結果
> preset-js@1.0.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand ch01/ex05

(node:23996) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  exercises/ch01/ex05/index.test.js
  math                                                                                                                                                                                                                                       
    abs                                                                                                                                                                                                                                      
      √ returns same value when positive value given (2 ms)                                                                                                                                                                                  
      √ returns negated value when negative value given                                                                                                                                                                                      
      √ returns zero value when zero given                                                                                                                                                                                                   
    sum                                                                                                                                                                                                                                      
      √ return sum value when two values given (1 ms)                                                                                                                                                                                        
    factorial                                                                                                                                                                                                                                
      √ returns 1 when 0 given                                                                                                                                                                                                               
      √ returns 3 when 3*(3-1)! given                                                                                                                                                                                                        
                                                                                                                                                                                                                                             
Test Suites: 1 passed, 1 total                                                                                                                                                                                                               
Tests:       6 passed, 6 total                                                                                                                                                                                                               
Snapshots:   0 total
Time:        0.397 s, estimated 1 s
Ran all test suites matching /ch01\\ex05/i.