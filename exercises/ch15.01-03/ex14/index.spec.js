import { test, expect } from "@playwright/test";

function gotoTestTarget(page) {
    return page.goto("http://127.0.0.1:5500/exercises/ch15.01-03/ex14/");
}

test.describe("商品リスト", () => {
    test("初期表示ではすべての商品が表示されている", async ({ page }) => {
        await gotoTestTarget(page);
        const products = page.locator("#productList li");
        await expect(products).toHaveCount(3);
    });
    test("食品カテゴリを選択すると、食品カテゴリの商品だけが表示される", async ({ page }) => {
        await gotoTestTarget(page);

        const food = page.getByTestId("food1");
        const products = page.locator("#productList li");
        await expect(food).toBeVisible();
        await expect(products.nth(0)).toHaveText("お菓子 - ¥1000");
    });
    test("文房具カテゴリーを選択したとき、文房具のみ表示される", async ({ page }) => {
        await gotoTestTarget(page);
        const stationery1 = page.getByTestId("stationery1");
        const stationery2 = page.getByTestId("stationery2");
        const products = page.locator("#productList li");
        await expect(stationery1).toBeVisible();
        await expect(stationery2).toBeVisible();
        await expect(products.nth(1)).toHaveText("消しゴム - ¥200");
        await expect(products.nth(2)).toHaveText("ものさし - ¥300");

    });
    test("すべてのカテゴリを選択したとき、すべての商品が表示される", async ({ page }) => {
        await gotoTestTarget(page);
        const select = page.getByTestId("select");
        await select.selectOption("all");

        const products = page.locator("#productList li");
        for (let i = 0; i < 3; i++) {
            await expect(products.nth(i)).toBeVisible();
        }
    });

});
