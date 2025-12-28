import { expect, test } from "@playwright/test";

//以下はch15.01-03/ex01/index.spec.jsからの流用
/**
 * @param {import("@playwright/test").Page} page
 * @param {string} todo
 */
async function addToDo(page, todo) {
    await page.getByRole("textbox").fill(todo);//引数で与えられたtodo文字をテキストボックスに入力
    await page.getByRole("button", { name: "Add" }).click();//Addボタンをクリック
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function checkToDo(page, index) {
    await page.getByRole('listitem').nth(index).getByRole("checkbox").check();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function deleteToDo(page, index) {
    await page
        .getByRole('listitem')
        .nth(index)
        .getByRole("button", { name: "❌" })
        .click();
}
/**
 * @param {import("@playwright/test").Page} page
 */
async function countToDos(page) {
    const todoList = page.locator("#todo-list");//ul要素を取得
    return await todoList.getByRole("listitem").count();//その中のli要素の数を数える
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
function queryToDo(page, index) {
    return page.locator("#todo-list").getByRole("listitem").nth(index);//ul要素の中のli要素を取得
}

test.describe("simple todo app", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://127.0.0.1:5500/exercises/ch15.04-10/ex11");
    });
    //このあたりのテストは前回を思い出すためにいったん行った
    test("no default todos", async ({ page }) => {
        //初期状態ではtodoは0件であること
        expect(await countToDos(page)).toBe(0);
    });

    test("add multiple todos", async ({ page }) => {
        //addToDo関数を使って2件追加する
        await addToDo(page, "質問表に質問を記載する");
        await addToDo(page, "練習問題を完了する");

        expect(await countToDos(page)).toBe(2);

        const todo1 = queryToDo(page, 0);
        const label1 = todo1.getByText("質問表に質問を記載する");
        await expect(label1).toBeVisible();
        await expect(label1).toHaveCSS("text-decoration-line", "none");

        const todo2 = queryToDo(page, 1);
        const label2 = todo2.getByText("練習問題を完了する");
        await expect(label2).toBeVisible();
        await expect(label2).toHaveCSS("text-decoration-line", "none");
    });

    test("delete todo", async ({ page }) => {
        await addToDo(page, "質問表に質問を記載する");
        await addToDo(page, "練習問題を完了する");
        await deleteToDo(page, 0);

        expect(await countToDos(page)).toBe(1);

        const todo = queryToDo(page, 0);
        const label = todo.getByText("練習問題を完了する");
        await expect(label).toBeVisible();
        await expect(label).toHaveCSS("text-decoration-line", "none");
    });

    test("complete todo⇒#/complete", async ({ page }) => {
        await addToDo(page, "質問表に質問を記載する");
        await addToDo(page, "練習問題を完了する");
        await checkToDo(page, 1);

        expect(await countToDos(page)).toBe(2);

        const todo1 = queryToDo(page, 0);
        const label1 = todo1.getByText("質問表に質問を記載する");
        await expect(label1).toBeVisible();
        await expect(label1).toHaveCSS("text-decoration-line", "none");

        const todo2 = queryToDo(page, 1);
        const label2 = todo2.getByText("練習問題を完了する");
        await expect(label2).toBeVisible();
        await expect(label2).toHaveCSS("text-decoration-line", "line-through");
        //以下新規追加
        //#/completedに遷移する
        await page.evaluate(() => {
            window.location.hash = "#/completed";
        });
        //完了したtodoだけが表示されることを確認する
        expect(await countToDos(page)).toBe(1);
        const todoCompleted = queryToDo(page, 0);
        const labelCompleted = todoCompleted.getByText("練習問題を完了する");
        await expect(labelCompleted).toBeVisible();
        await expect(labelCompleted).toHaveCSS("text-decoration-line", "line-through");
        //完了していないTodoは表示されないことを確認する
        const todoNotCompleted = page.locator("#todo-list").getByText("質問表に質問を記載する");
        await expect(todoNotCompleted).toHaveCount(0);
    });
    test("complete todo⇒#/Active", async ({ page }) => {
        await addToDo(page, "質問表に質問を記載する");
        await addToDo(page, "練習問題を完了する");
        await addToDo(page, "練習問題を提出する");
        await checkToDo(page, 1);

        expect(await countToDos(page)).toBe(3);

        //#/Activeに遷移する
        await page.evaluate(() => {
            window.location.hash = "#/active";
        });
        //完了していないtodoだけが表示されることを確認する
        expect(await countToDos(page)).toBe(2);
        const todoCompleted = queryToDo(page, 0);
        const labelCompleted = todoCompleted.getByText("質問表に質問を記載する");
        await expect(labelCompleted).toBeVisible();
        await expect(labelCompleted).toHaveCSS("text-decoration-line", "none");
        const todoCompleted2 = queryToDo(page, 1);
        const labelCompleted2 = todoCompleted2.getByText("練習問題を提出する");
        await expect(labelCompleted2).toBeVisible();
        await expect(labelCompleted2).toHaveCSS("text-decoration-line", "none");
        //完了しているTodoは表示されないことを確認する
        const todoNotCompleted = page.locator("#todo-list").getByText("練習問題を完了する");
        await expect(todoNotCompleted).toHaveCount(0);
    });
    test("complete todo⇒#/Active⇒#/All", async ({ page }) => {
        await addToDo(page, "質問表に質問を記載する");
        await addToDo(page, "練習問題を完了する");
        await addToDo(page, "練習問題を提出する");
        await checkToDo(page, 1);

        expect(await countToDos(page)).toBe(3);

        //#/Activeに遷移する
        await page.evaluate(() => {
            window.location.hash = "#/active";
        });
        //完了していないtodoだけが表示されることを確認する
        expect(await countToDos(page)).toBe(2);
        const todoCompleted = queryToDo(page, 0);
        const labelCompleted = todoCompleted.getByText("質問表に質問を記載する");
        await expect(labelCompleted).toBeVisible();
        await expect(labelCompleted).toHaveCSS("text-decoration-line", "none");
        const todoCompleted2 = queryToDo(page, 1);
        const labelCompleted2 = todoCompleted2.getByText("練習問題を提出する");
        await expect(labelCompleted2).toBeVisible();
        await expect(labelCompleted2).toHaveCSS("text-decoration-line", "none");
        //完了しているTodoは表示されないことを確認する
        const todoNotCompleted = page.locator("#todo-list").getByText("練習問題を完了する");
        await expect(todoNotCompleted).toHaveCount(0);
        //#/Allに遷移する
        await page.evaluate(() => {
            window.location.hash = "#/";
        });
        //すべてのtodoが表示されることを確認する
        expect(await countToDos(page)).toBe(3);
    });

});
