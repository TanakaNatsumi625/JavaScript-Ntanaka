テスト実行結果
> preset-js@1.0.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand ch01/ex06

(node:30508) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  exercises/ch01/ex06/index.test.js
  math                                                                                                                                                                                                                                       
    fib                                                                                                                                                                                                                                      
      √ returns fibonacci value = 5 when positive value = 5 given (2 ms)                                                                                                                                                                     
      √ returns fibonacci value= 2111485077978050 when value = 75 given                                                                                                                                                                      
                                                                                                                                                                                                                                             
Test Suites: 1 passed, 1 total                                                                                                                                                                                                               
Tests:       2 passed, 2 total                                                                                                                                                                                                               
Snapshots:   0 total
Time:        0.384 s
Ran all test suites matching /ch01\\ex06/i.