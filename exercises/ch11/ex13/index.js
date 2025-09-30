//参考：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
export function stringifyJSON(json) {
    if (json === null) {
        return "null";
    }
    if (typeof json === "boolean") {
        return json ? "true" : "false";
    }
    if (typeof json === "number") {
        return String(json);
    }
    if (typeof json === "string") {
        return '"' + escapeString(json) + '"';
    }
    if (Array.isArray(json)) {
        const elements = json.map(item => stringifyJSON(item) || "null");
        return `[${elements.join(",")}]`;
    }
    if (typeof json === "object") {
        const entries = Object.entries(json).map(([key, value]) => {
            const stringifiedValue = stringifyJSON(value);
            return `"${escapeString(key)}":${stringifiedValue}`;
        });
        return `{${entries.join(",")}}`;
    }
    return undefined; // undefined, function, symbolなどはJSONに変換できない
}
function escapeString(str) {
    return str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')
        .replace(/\x08/g, '\\b')
        .replace(/\f/g, '\\f')
        .replace(/[\u0000-\u0007\u000B\u000E-\u001F]/g, (c) => {
            return '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0');
        });
}

const testdata = [
    // array
    "[]",
    "[[]]",
    // values
    '[false, null, true, {}, [], 1, "HELLO"]',
    // number
    "[0, -0, 0.1, 0.1E1, 0.1e10, 100, -100, 3.14159, 32.12e1]",
    // string
    '["A", "\\"", "\\\\", "\\/", "\\b", "\\f", "\\n", "\\r", "\\t", "Hello, world!😇\\n", "あ and \\u3042"]',
    // object
    "{}",
    '{"A": "B"}',
    '{"A": false, "B": null, "C": true, "D": {"X": {}}, "E": [[]], "F": 2.71828, "G": "HELLO"}',
    // https://github.com/nst/JSONTestSuite/tree/master/test_parsing
    "[[]   ]",
    '[""]',
    "[]",
    '["a"]',
    "[false]",
    '[null, 1, "1", {}]',
    "[null]",
    "[1\n]",
    " [1]",
    "[1,null,null,null,2]",
    "[2] ",
    "[123e65]",
    "[0e+1]",
    "[0e1]",
    "[ 4]",
    "[-0.000000000000000000000000000000000000000000000000000000000000000000000000000001]\n",
    "[20e1]",
    "[-0]",
    "[-123]",
    "[-1]",
    "[-0]",
    "[1E22]",
    "[1E-2]",
    "[1E+2]",
    "[123e45]",
    "[123.456e78]",
    "[1e-2]",
    "[1e+2]",
    "[123]",
    "[123.456789]",
    '{"asd":"sdf", "dfg":"fgh"}',
    '{"asd":"sdf"}',
    '{"a":"b","a":"c"}',
    '{"a":"b","a":"b"}',
    "{}",
    '{"":0}',
    '{"foo\\u0000bar": 42}',
    '{ "min": -1.0e+28, "max": 1.0e+28 }',
    '{"x":[{"id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}], "id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}',
    '{"a":[]}',
    '{"title":"\\u041f\\u043e\\u043b\\u0442\\u043e\\u0440\\u0430 \\u0417\\u0435\\u043c\\u043b\\u0435\\u043a\\u043e\\u043f\\u0430" }',
    '{\n"a": "b"\n}',
    '["\\u0060\\u012a\\u12AB"]',
    '["\\uD801\\udc37"]',
    '["\\ud83d\\ude39\\ud83d\\udc8d"]',
    '["\\"\\\\\\/\\b\\f\\n\\r\\t"]',
    '["\\\\u0000"]',
    '["\\""]',
    '["a/*b*/c/*d//e"]',
    '["\\\\a"]',
    '["\\\\n"]',
    '["\\u0012"]',
    '["\\uFFFF"]',
    '["asd"]',
    '[ "asd"]',
    '["\\uDBFF\\uDFFF"]',
    '["new\\u00A0line"]',
    '["􏿿"]',
    '["￿"]',
    '["\\u0000"]',
    '["\\u002c"]',
    '["π"]',
    '["𛿿"]',
    '["asd "]',
    // '" "',
    '["\\uD834\\uDd1e"]',
    '["\\u0821"]',
    '["\\u0123"]',
    '["\\u0061\\u30af\\u30EA\\u30b9"]',
    '["new\\u000Aline"]',
    '[""]',
    '["\\uA66D"]',
    '["\\u005C"]',
    '["⍂㈴⍂"]',
    '["\\u0022"]',
    '["\\uDBFF\\uDFFE"]',
    '["\\uD83F\\uDFFE"]',
    '["\\u200B"]',
    '["\\u2064"]',
    '["\\uFDD0"]',
    '["\\uFFFE"]',
    '["€𝄞"]',
    '["aa"]',
    '["a"]\n',
    "[true]",
    " [] ",
];
// for (const str of testdata) {
//     const parsed = JSON.parse(str);
//     const result = JSON.stringify(parsed);
//     const myResult = stringifyJSON(parsed);
//     if (result !== myResult) {
//         console.log(`original: ${str}`);
//         console.log(`expected: ${result}`);
//         console.log(`actual  : ${myResult}`);
//     }

// }

// for (const str of testdata) {
//     const parsed = JSON.parse(str);
//     console.log(parsed);
//     console.log(JSON.stringify(parsed));
// }
const str = '{"foo\\u0000bar": 42}'
const parsed = JSON.parse(str);
console.log(parsed);
const myResult = stringifyJSON(parsed);
console.log(myResult);