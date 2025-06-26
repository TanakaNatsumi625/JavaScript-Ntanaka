import {switchConvertEscapedChars} from './index-switch';
import {ifConvertEscapedChars} from './index-if-else';

describe('Convert escaped characters', () => {
    it('should convert escaped characters using if-else', () => {
        expect(ifConvertEscapedChars("Hello\nWorld\t\\Test")).toBe("Hello\\nWorld\\t\\\\Test");
        expect(ifConvertEscapedChars("My\vName\fIs\rRicoh")).toBe("My\\vName\\fIs\\rRicoh");
        expect(ifConvertEscapedChars("Alice\tin\nwonderland")).toBe("Alice\\tin\\nwonderland");
    });

    it('should convert escaped characters using switch', () => {
        expect(switchConvertEscapedChars("Hello\nWorld\t\\Test")).toBe("Hello\\nWorld\\t\\\\Test");
        expect(switchConvertEscapedChars("My\vName\fIs\rRicoh")).toBe("My\\vName\\fIs\\rRicoh");
        expect(switchConvertEscapedChars("Alice\tin\nwonderland")).toBe("Alice\\tin\\nwonderland");
    });
})