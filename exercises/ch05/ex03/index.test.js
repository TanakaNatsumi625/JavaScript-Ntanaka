import { isThirtyOneDaysIf } from "./index-if";
import { isThirtyOneDaysSwitch } from "./index-switch";

describe("isThirtyOneDays", () => {
    it("should return true for months with 31 days using if", () => {
        console.log(isThirtyOneDaysIf("Jan"));
        expect(isThirtyOneDaysIf("Jan")).toBe(true);
        expect(isThirtyOneDaysIf("Mar")).toBe(true);
        expect(isThirtyOneDaysIf("May")).toBe(true);
        expect(isThirtyOneDaysIf("Jul")).toBe(true);
        expect(isThirtyOneDaysIf("Aug")).toBe(true);
        expect(isThirtyOneDaysIf("Oct")).toBe(true);
        expect(isThirtyOneDaysIf("Dec")).toBe(true);
    });

    it("should return false for months with less than 31 days using if", () => {
        expect(isThirtyOneDaysIf("Feb")).toBe(false);
        expect(isThirtyOneDaysIf("Apr")).toBe(false);
        expect(isThirtyOneDaysIf("Jun")).toBe(false);
        expect(isThirtyOneDaysIf("Sep")).toBe(false);
        expect(isThirtyOneDaysIf("Nov")).toBe(false);
    });

    it("should return 'Invalid month' for invalid inputs using if", () => {
        expect(isThirtyOneDaysIf("Month")).toBe("Invalid month");
        expect(isThirtyOneDaysSwitch(3)).toBe("Invalid month");
    });

    it("should return true for months with 31 days using switch", () => {
        expect(isThirtyOneDaysSwitch("Jan")).toBe(true);
        expect(isThirtyOneDaysSwitch("Mar")).toBe(true);
        expect(isThirtyOneDaysSwitch("May")).toBe(true);
        expect(isThirtyOneDaysSwitch("Jul")).toBe(true);
        expect(isThirtyOneDaysSwitch("Aug")).toBe(true);
        expect(isThirtyOneDaysSwitch("Oct")).toBe(true);
        expect(isThirtyOneDaysSwitch("Dec")).toBe(true);
    });

    it("should return false for months with less than 31 days using switch", () => {
        expect(isThirtyOneDaysSwitch("Feb")).toBe(false);
        expect(isThirtyOneDaysSwitch("Apr")).toBe(false);
        expect(isThirtyOneDaysSwitch("Jun")).toBe(false);
        expect(isThirtyOneDaysSwitch("Sep")).toBe(false);
        expect(isThirtyOneDaysSwitch("Nov")).toBe(false);
    });

    it("should return 'Invalid month' for invalid inputs using switch", () => {
        expect(isThirtyOneDaysSwitch("Month")).toBe("Invalid month");
        expect(isThirtyOneDaysSwitch(3)).toBe("Invalid month");
    });
})