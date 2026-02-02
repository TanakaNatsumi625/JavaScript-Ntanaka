const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// localStorageが使えるかどうか確認
const localStorageAvailable = (() => {
   try {
    const testKey = "__test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
})();
// localStorageが使えるか使えないかで呼び出す関数を分ける
if (!localStorageAvailable) {
  console.warn("localStorage is not available. ToDo list functionality will be limited.");
  //UIのみ変更する仕様の関数を呼び出す
  ToDoListWithoutLocalStorage();
}else {
  //localStorageを使った仕様の関数を呼び出す
  ToDoListWithLocalStorage();
}

// localStorageが使えない場合のToDoリスト関数
//../ch15.01-03/ex01/index.jsとほぼ同じ
function ToDoListWithoutLocalStorage() {
  form.addEventListener("submit", (e) => {
    // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
    //form送信するとページがリロードしてしまうので、ロードをキャンセルする必要がある
    //15.2.5 イベントのキャンセル
    e.preventDefault();

    // 両端からホワイトスペースを取り除いた文字列を取得する
    if (input.value.trim() === "") {
      return;
    }
    const todo = input.value.trim();
    // new-todo の中身は空にする
    input.value = "";

    // ここから #todo-list に追加する要素を構築する
    //15.3.5 ノードの作成、挿入、削除
    //リストの要素を作成( <li>～</li>の部分)
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = todo;
    label.style.textDecorationLine = "none";

    // <input>タグとしてcheckboxを作成し、labelと連動させる
    const toggle = document.createElement("input");
    // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
    toggle.type = "checkbox";

    //ユーザーの操作によるイベントを検知するには、イベントリスナーを使う
    // 15.2.2.3 addEventListener( )
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        label.style.textDecorationLine = "line-through";
      } else {
        label.style.textDecorationLine = "none";
      }
    });

    const destroy = document.createElement("button");
    // TODO: destroy がクリック (click) された場合に elem を削除しなさい
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => {
      elem.remove();
    });
    // TODO: elem 内に toggle, label, destroy を追加しなさい
    elem.append(toggle, label, destroy);
    list.prepend(elem);
  });
}

function ToDoListWithLocalStorage() {
  document.addEventListener("DOMContentLoaded", () => {
    if (!localStorageAvailable) {//もしローカルストレージが使えないなら
      return;//この関数はスキップ
    }
    // ローカルストレージからToDoリストを読み込む
    const items = loadToDoListFromLocalStorage();
    if (items.tasks.length === 0) {
      return;
    }
    console.log("Loaded items from localStorage:", items);
    // 各アイテムをToDoリストに追加する
    items.tasks.forEach((item) => {
      // ここで item を使って ToDo リストに要素を追加する
      appendToDoItem(item);
    });
  });

  form.addEventListener("submit", (e) => {
    // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
    //form送信するとページがリロードしてしまうので、ロードをキャンセルする必要がある
    //15.2.5 イベントのキャンセル
    e.preventDefault();

    // 両端からホワイトスペースを取り除いた文字列を取得する
    if (input.value.trim() === "") {
      return;
    }

    if (!localStorageAvailable) {//もしローカルストレージが使えないなら
      // new-todo の中身は空にする
      const todo = { name: input.value.trim() };
      //UIにのみToDoリストを追加する
      appendToDoItem(todo);
      input.value = "";
      return;
    }
    //まず既存のToDoリストを配列に格納
    // { tasks: Array<string>, currentId: number }が返ってくる
    const existingItems = loadToDoListFromLocalStorage();
    const todo = { id: existingItems.currentId, name: input.value.trim(), status: "active" };
    console.log("New to-do item:", todo);

    //新しいアイテムを追加した配列を作成
    // currentIdも一つ増やす
    const updatedItems = { tasks: [...existingItems.tasks, todo], currentId: existingItems.currentId + 1 };
    //更新された配列をローカルストレージに保存
    saveToDoList(updatedItems);

    // ToDoリストに新しいアイテムを追加する
    appendToDoItem(todo);

    // new-todo の中身は空にする
    input.value = "";
  });

  /**
   * ToDoリストにアイテムを追加する関数
   * @param  {Array<string>} items ToDoリストのアイテム
   */
  function appendToDoItem(item) {
    const elem = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = item.name;
    label.style.textDecorationLine = "none";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";

    //それぞれのタスクの状態に応じてチェックボックスの初期状態を設定
    // もしタスクの状態が "completed" ならチェックを入れた状態で表示する
    toggle.checked = item.status === "completed";
    if (toggle.checked) {
      label.style.textDecorationLine = "line-through";
    }
    toggle.addEventListener("change", () => {
      // 現在のアイテムの状態をローカルストレージで取得
      const existingItems = loadToDoListFromLocalStorage();
      if (toggle.checked) {//もしチェックが入ったら
        const updatedItems = existingItems.tasks.map((task) => {//既存のタスクを一つずつ見ていく
          if (task.id === item.id) {//もし現在のタスクのidが変更されたタスクのidと同じなら
            return { ...task, status: "completed" };//そのタスクの状態をcompletedに更新して返す
          }
          return task;
        });
        saveToDoList({ tasks: updatedItems, currentId: existingItems.currentId });//更新されたタスク配列を保存
        label.style.textDecorationLine = "line-through";//UIはラインを入れる
      } else {
        const updatedItems = existingItems.tasks.map((task) => {//チェックが無しに変更されたら
          if (task.id === item.id) {
            return { ...task, status: "active" };//状態をactiveに更新して返す
          }
          return task;
        });
        saveToDoList({ tasks: updatedItems, currentId: existingItems.currentId });
        label.style.textDecorationLine = "none";
      }
    });
    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.addEventListener("click", () => {
      const id = item.id;
      //ローカルストレージからToDoリストを削除
      const existingItems = loadToDoListFromLocalStorage();//現在のローカルストレージの内容を取得
      const updatedItems = existingItems.tasks.filter((task) => task.id !== id);//クリックされたタスク以外のタスクを集めた新しい配列を作成
      saveToDoList({ tasks: updatedItems, currentId: existingItems.currentId });//更新された配列を保存
      //UIからToDoリストを削除
      elem.remove();
    });

    elem.append(toggle, label, destroy);
    list.appendChild(elem);
  }
}


/**
 * localStorageからToDoリストを読み込む関数
 * @return {Array<string>} もしToDoリストがなければ空の配列を返す
 * @return {Array<string>} 読み込んだToDoリストのアイテム
 * 期待する型: { tasks: Array<string>, currentId: number }
 */
function loadToDoListFromLocalStorage() {
  const items = JSON.parse(localStorage.getItem("todoList"));
  if (!items) {
    return { tasks: [], currentId: 0 };
  }
  console.log("Loaded to-do list:", items);
  return items;
}

/**
 * localStorageを使って、ToDoのリストを保存する関数
 * @param  {Array<string>} items ToDoリストのアイテム
 * @return {boolean} 保存が成功したかどうか
 */
function saveToDoList(items) {
  console.log("Saving to-do list:", items);
  localStorage.setItem("todoList", JSON.stringify(items));
  return true;
}


