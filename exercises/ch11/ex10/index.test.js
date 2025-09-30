import { countDaysInMonth, countWorkingDays, getDayOfWeek, getStartLastMonth } from "./index.js";

describe('countDaysInMonth', () => {
    test('should return correct number of days for each month', () => {
        expect(countDaysInMonth(2025, 0)).toBe(31); // January
        expect(countDaysInMonth(2025, 1)).toBe(28); // February (not a leap year)
        expect(countDaysInMonth(2025, 2)).toBe(31); // March
        expect(countDaysInMonth(2025, 3)).toBe(30); // April
        expect(countDaysInMonth(2025, 4)).toBe(31); // May
        expect(countDaysInMonth(2025, 5)).toBe(30); // June
        expect(countDaysInMonth(2025, 6)).toBe(31); // July
        expect(countDaysInMonth(2025, 7)).toBe(31); // August
        expect(countDaysInMonth(2025, 8)).toBe(30); // September
        expect(countDaysInMonth(2025, 9)).toBe(31); // October
        expect(countDaysInMonth(2025, 10)).toBe(30); // November
        expect(countDaysInMonth(2025, 11)).toBe(31); // December
    });
    test('should throw error for invalid month', () => {
        expect(() => countDaysInMonth(2025, -1)).toThrow(Error);
        expect(() => countDaysInMonth(2025, 12)).toThrow(Error);
    });
});

describe('countWorkingDays', () => {
    test('should count working days correctly', () => {
        const startDate = new Date('2024-09-01');
        const endDate = new Date('2024-09-30');
        expect(countWorkingDays(startDate, endDate)).toBe(21); // September 2024 has 21 working days
    });
    test('should throw error for invalid date objects', () => {
        expect(() => countWorkingDays('2024-09-01', new Date('2024-09-30'))).toThrow(Error);
        expect(() => countWorkingDays(new Date('2024-09-01'), '2024-09-30')).toThrow(Error);
    });
    test('should throw error if startDate is after endDate', () => {
        expect(() => countWorkingDays(new Date('2024-10-01'), new Date('2024-09-30'))).toThrow(Error);
    });
});

describe('getDayOfWeek', () => {
    test('should return correct day of the week in different locales', () => {
        expect(getDayOfWeek('2025-09-01', 'ja-JP')).toBe('月曜日'); // Monday in Japanese
        expect(getDayOfWeek('2025-09-01', 'en-US')).toBe('Monday'); // Monday in English
        expect(getDayOfWeek('2025-09-01', 'fr-FR')).toBe('lundi'); // Monday in French
    });
    test('should throw error for invalid date string', () => {
        expect(() => getDayOfWeek('invalid-date', 'ja-JP')).toThrow(Error);
    });
});
describe('getStartLastMonth', () => {
    test('should return the first day of the previous month', () => {
        const result = getStartLastMonth();
        const expected = new Date();
        expected.setMonth(expected.getMonth() - 1);
        expected.setDate(1);
        expected.setHours(0, 0, 0, 0);
        expect(result).toEqual(expected);
    });
});