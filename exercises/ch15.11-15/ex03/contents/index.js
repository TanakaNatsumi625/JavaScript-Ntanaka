const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // Cookie をコンソールに出力する
  console.log("Document cookies:", document.cookie);
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  let url = "http://localhost:3001/api/tasks";
  try {
    const response = await fetch(url, {
      mode: 'cors',  // CORSモードを指定
      credentials: 'include' // Cookieを含める  
    }
      
    );//fetch APIでURLにアクセスしてデータを取得
    console.log(`Response status: ${response.status}`); //ステータスコードをコンソールに出力
    if (!response.ok) {
      //レスポンスが正常でない場合のエラーハンドリング
      // エラーメッセージにステータスコードを含める
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    //レスポンスが帰ってきたらJSON形式に変換
    const tasks = await response.json();
    console.log("Fetched tasks:", tasks);
    console.log("task items:", tasks.items);
    const taskItems = tasks.items;
    // 取得したタスクをToDoリストに追加
    //タスクがある限り繰り返し関数を呼ぶのは無駄にならない？？
    taskItems.forEach((item) => {
      appendToDoItem(item);
    });
    
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
});

form.addEventListener("submit", async (e) => {
  console.log("Form submitted");
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
  let url = "http://localhost:3001/api/tasks";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: 'cors',  // CORSモードを指定
    credentials: 'include', // Cookieを含める
    body: JSON.stringify({ name: todo }),
  });
  console.log(`Response status: ${response.status}`); //ステータスコードをコンソールに出力
  if (!response.ok) {
    //レスポンスが正常でない場合のエラーハンドリング
    // エラーメッセージにステータスコードを含める
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  //レスポンスが帰ってきたらJSON形式に変換
  const newTask = await response.json();
  console.log("Created task:", newTask);
  appendToDoItem(newTask);
} catch (error) {
  console.error("Error creating task:", error);
}
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
async function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  //それぞれのタスクの状態に応じてチェックボックスの初期状態を設定
  // もしタスクの状態が "completed" ならチェックを入れた状態で表示する
  toggle.checked = task.status === "completed";
  if (toggle.checked) {
    label.style.textDecorationLine = "line-through";
  }
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", async () => {
    try {
      let url = `http://localhost:3001/api/tasks/${task.id}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        mode: 'cors',  // CORSモードを指定
        credentials: 'include', // Cookieを含める
        body: JSON.stringify({id: task.id, name: task.name, status: toggle.checked ? "completed" : "active" }),
      });
      console.log(`Response status: ${response.status}`); //ステータスコードをコンソールに出力
      if (!response.ok) {
        //レスポンスが正常でない場合のエラーハンドリング
        // エラーメッセージにステータスコードを含める
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // レスポンスが帰ってきたらJSON形式に変換
      const updatedTask = await response.json();
      console.log("Updated task:", updatedTask);
      // label のスタイルを更新⇒取り消し線の有無
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    } catch (error) {
      console.error("Error updating task:", error);
    }
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click",  async () => {
    try {
      let url = `http://localhost:3001/api/tasks/${task.id}`;
      const response = await fetch(url, {
        method: "DELETE",
        mode: 'cors',  // CORSモードを指定
        credentials: 'include' // Cookieを含める
      });
      console.log(`Response status: ${response.status}`); //ステータスコードをコンソールに出力
      if (!response.ok) {
        //レスポンスが正常でない場合のエラーハンドリング
        // エラーメッセージにステータスコードを含める
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Deleted task:", task.id);
      // elem を削除
      elem.remove();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  });
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  list.prepend(elem);
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
}
