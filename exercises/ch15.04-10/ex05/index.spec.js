import { test, expect } from "@playwright/test";

function gotoTestTarget(page) {
    return page.goto("http://127.0.0.1:5500/exercises/ch15.04-10/ex05/");
}

test.describe("カスタム要素 <inline-circle>", () => {
    test("初期状態 属性を指定が反映されている", async ({ page }) => {
        await gotoTestTarget(page);
        const circle = page.locator("inline-circle").nth(1);
        await expect(circle).toHaveCSS("width", "19.1875px");
        await expect(circle).toHaveCSS("background-color", "rgb(0, 0, 255)");
        await expect(circle).toHaveCSS("border-color", "rgb(255, 215, 0)");
    });
    test("diameter属性を変更すると、大きさが変わる", async ({ page }) => {
        await gotoTestTarget(page);
        const circle = page.locator("inline-circle").first();
        await circle.evaluate(el => {
            el.setAttribute("diameter", "50px");
        }); 
        await expect(circle).toHaveCSS("width", "50px");
        await expect(circle).toHaveCSS("height", "50px");
    });
    test("color属性を変更すると、色が変わる", async ({ page }) => {
        await gotoTestTarget(page);
        const circle = page.locator("inline-circle").first();
        await circle.evaluate(el => {
            el.setAttribute("color", "green");
        });
        await expect(circle).toHaveCSS("background-color", "rgb(0, 128, 0)");
    });
    test("border-color属性を変更すると、枠線の色が変わる", async ({ page }) => {
        await gotoTestTarget(page);
        const circle = page.locator("inline-circle").first();
        await circle.evaluate(el => {
            el.setAttribute("border-color", "red");
        });
        await expect(circle).toHaveCSS("border-color", "rgb(255, 0, 0)");
    });
});