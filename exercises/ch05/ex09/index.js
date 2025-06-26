export function parseJson(jsonString) {
  try {
    console.log(`{success: true, data: ${JSON.stringify(JSON.parse(jsonString))}}`);
    return  `{success: true, data: ${JSON.stringify(JSON.parse(jsonString))}}`;
  } catch (error) {
    console.log(`Error parsing JSON string: ${error.message}`);
    return `{success: false, error: cant parse JSON: ${error.message}}`;
  }
}

console.log(parseJson('{"name": "John", "age": 30}'));
console.log(parseJson('Hello, World!'));
console.log(parseJson('{"name": "John", "age": 30, }')); 