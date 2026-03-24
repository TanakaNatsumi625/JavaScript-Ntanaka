- 参考：https://zenn.dev/sawao/articles/6ad32596a82174
- `npm run lint ex01/lint_sample.js `
    - 修正前：withを指摘される
        ```
        > lint
        > eslint ex01/lint_sample.js


        C:\Users\r00000625\myRipository\JavaScript-Ntanaka\exercises\ch17\ex01\lint_sample.js
        4:1  error  Parsing error: 'with' in strict mode

        ✖ 1 problem (1 error, 0 warnings)
        ```
    - withを修正後、以下の指摘を受けた
         ```
        1:1  error  Split 'let' declarations into multiple statements  one-var
        12:1  error  'a' is never reassigned. Use 'const' instead       prefer-const
        13:1  error  'x' is never reassigned. Use 'const' instead       prefer-const
        14:1  error  'y' is never reassigned. Use 'const' instead       prefer-const
        16:1  error  'console' is not defined                           no-undef

        ✖ 5 problems (5 errors, 0 warnings)
        1 error and 0 warnings potentially fixable with the `--fix` option.
        ```
    - 最終的に何も出なくなった
        ```
        > lint
        > eslint ex01/lint_sample.js
        ```
- `npm run lint ex01/format_sample.js`
    - 除外しているので、その警告が出る
        ```
        0:0  warning  File ignored because of a matching ignore pattern. Use "--no-ignore" to disable file ignore settings or use "--no-warn-ignored" to suppress this warning

        ✖ 1 problem (0 errors, 1 warning)
        ```
- `npm run format  ex01/lint_sample.js`, `npm run format  ex01/format_sample.js`
    - `.prettierrc` で以下のように設定したので、それぞれインデントが4でフォーマットされる
        ```
        {
            "doubleQuote": true,
            "trailingComma": "all",
            "tabWidth": 4
        }
        ```