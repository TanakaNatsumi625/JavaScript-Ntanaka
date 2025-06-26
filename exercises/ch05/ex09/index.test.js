import {parseJson} from './index.js';

describe('perseJson', () => {
  it('should return an object', () => {
    expect(parseJson('{"name": "John", "age": 30}')).toEqual(`{success: true, data: {"name":"John","age":30}}`);
  });
  it('should return an error message for invalid JSON', () => {
    expect(parseJson('Hello, World!')).toEqual(`{success: false, error: cant parse JSON: Unexpected token 'H', \"Hello, World!\" is not valid JSON}`);
  });
  it('should return an error message for invalid JSON with trailing comma', () => {
    expect(parseJson('{"name": "John", "age": 30, }')).toEqual(`{success: false, error: cant parse JSON: Expected double-quoted property name in JSON at position 28}`);
  });
});