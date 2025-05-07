import { createRequire } from "module";
const require = createRequire(import.meta.url);

const esprima = require('esprima');

const ast1 = esprima.parseScript(`
    let a
    a
    =
    3
    console.log(a)
`);
console.log(JSON.stringify(ast1, null, 2));

const ast2 = esprima.parseScript(`let a; a = 3; console.log(a);`);
console.log(JSON.stringify(ast2, null, 2));
