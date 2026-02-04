import { expect, test } from "@playwright/test";

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} todo
 */
async function addToDo(page, todo) {
  await page.getByRole("textbox").fill(todo);
  await page.getByRole("button", { name: "Add" }).click();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function checkToDo(page, index) {
  // index番目のToDoリストのチェックボックスをクリックする
  // await page.getByRole("listitem").nth(index).getByRole("checkbox").check();
  // ↑はIndexedDBの反映が完了する前に次の処理に進んでしまうため、以下のように分ける
  // チェック付けるまで待つようにする
  const checkbox = page
    .getByRole("listitem")
    .nth(index)
    .getByRole("checkbox");
  await checkbox.check();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function deleteToDo(page, index) {
  await page
    .getByRole("listitem")
    .nth(index)
    .getByRole("button", { name: "❌" })
    .click();
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function countToDos(page) {
  return await page.getByRole("listitem").count();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
function queryToDo(page, index) {
  return page.getByRole("listitem").nth(index);
}

test.describe.skip("simple todo app with IndexedDB", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/exercises/ch15.11-15/ex05/index.html");
    // IndexedDBのデータをクリアする
    await page.evaluate(() => {
      indexedDB.deleteDatabase("ToDoApp");
    });
    // 再度読み込み
    await page.reload();
  });

  test("はじめは何もToDoリストに表示されていない", async ({ page }) => {
    expect(await countToDos(page)).toBe(0);
  });

  test("ToDoリストに追加し、リロードするとリストが保持されている", async ({ page }) => {
    // リスト追加
    await addToDo(page, "質問表に質問を記載する");
    // ページをリロードする
    await page.reload();

    expect(await countToDos(page)).toBe(1);

    const todoAfterReload = queryToDo(page, 0);
    const labelAfterReload = todoAfterReload.getByText("質問表に質問を記載する");
    await expect(labelAfterReload).toBeVisible();
    await expect(labelAfterReload).toHaveCSS("text-decoration-line", "none");
  });

  test("複数追加し、一つをチェック済みにしてリロードすると状態が保持されている", async ({ page }) => {
    // リスト追加
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    // 2つ目をチェック済みにする
    await checkToDo(page, 1);
    // UIがチェック済みになるのを待つ(ここがLocalStorageとの違い…)
    await page.waitForFunction(() => {
      const todoItems = document.querySelectorAll(
        "#todo-list li:nth-child(2) input[type='checkbox']"
      );
      return todoItems.length > 0 && todoItems[0].checked === true;
    });
    // ページをリロードする
    await page.reload();

    expect(await countToDos(page)).toBe(2);
    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("質問表に質問を記載する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("練習問題を完了する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "line-through");
  });

  test("複数追加した後、1つを削除してリロードすると状態が保持されている", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await deleteToDo(page, 0);
    // IndexedDB反映＆UI更新を待つ
    await page.waitForFunction(() => {
      return document.querySelectorAll("#todo-list li").length === 1;
    });
    // リロード
    await page.reload();

    expect(await countToDos(page)).toBe(1);
    const todo = queryToDo(page, 0);
    const label = todo.getByText("練習問題を完了する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
    // 消したToDoリストは表示されない
    const deletedTodo = page.getByText("質問表に質問を記載する");
    await expect(deletedTodo).toHaveCount(0);
  });
});

test.describe("multi tab sync", () => {
  test("別タブで追加したToDoリストが反映される", async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:5500/exercises/ch15.11-15/ex05/index.html");
    // 初期化
    await page.evaluate(() => {
      indexedDB.deleteDatabase("ToDoApp");
    });
    await page.reload();
    page.close();
    
    const page1 = await browser.newPage();
    await page1.goto("http://127.0.0.1:5500/exercises/ch15.11-15/ex05/index.html");
    const page2 = await browser.newPage();
    await page2.goto("http://127.0.0.1:5500/exercises/ch15.11-15/ex05/index.html");
    page1.on("console", msg => {
      console.log("PAGE1:", msg.type(), msg.text());
    });

    page2.on("console", msg => {
      console.log("PAGE2:", msg.type(), msg.text());
    });



    // page1でリスト追加
    await addToDo(page1, "質問表に質問を記載する");

    await expect.poll(async () => {
      return await countToDos(page2);
    }).toBe(1);

    const todoInPage2 = queryToDo(page2, 0);
    const labelInPage2 = todoInPage2.getByText("質問表に質問を記載する");
    await expect(labelInPage2).toBeVisible();
    await expect(labelInPage2).toHaveCSS("text-decoration-line", "none");

    page1.close();
    page2.close();
  });
});
