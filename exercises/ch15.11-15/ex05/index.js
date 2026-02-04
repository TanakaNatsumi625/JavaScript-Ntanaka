// BroadcastChannelを使って他のタブと通信する(後半課題内容)
const channel = new BroadcastChannel("todo_channel");

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// 他のタブからメッセージを受け取ったときの処理
channel.onmessage = async (event) => {
  if (event.data.type === "updated") {
    console.log("Received update message from another tab");
    // ToDoリストを再読み込みして表示を更新する
    list.innerHTML = "";
    const items = await getAllTasks();
    items.forEach((item) => {
      appendToDoItem(item);
    });
  }
};

// DOMContentLoadedイベントが発生したときの処理
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Document loaded");
  // IndexedDBからToDoリストを読み込む
  const items = await getAllTasks();
  console.log("Loaded items from IndexedDB:", items);
  if (items.length === 0) {
    return;
  }
  // 各アイテムをToDoリストに追加する
  items.forEach((item) => {
    // ここで item を使って ToDo リストに要素を追加する
    appendToDoItem(item);
  });
});

form.addEventListener("submit", async (e) => {
  console.log("Form submitted");
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  //form送信するとページがリロードしてしまうので、ロードをキャンセルする必要がある
  //15.2.5 イベントのキャンセル
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }

  //まず既存のToDoリストを配列に格納
  await addTask(input.value.trim());

  //追加したものを再描画
  list.innerHTML = "";
  const tasks = await getAllTasks();
  tasks.forEach(task => appendToDoItem(task));

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
  toggle.addEventListener("change", async () => {
   await updateTask({
     ...item,
     status: toggle.checked ? "completed" : "active"
   });
   //UIの更新
   if (toggle.checked) {
     label.style.textDecorationLine = "line-through";
   } else {
     label.style.textDecorationLine = "none";
    }
  });
  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    //DBからToDoリストを削除
    deleteTask(item.id);
    //UIからToDoリストを削除
    elem.remove();
  });

  elem.append(toggle, label, destroy);
  list.appendChild(elem);
}

// DBのオブジェクトストアのスキーマ
// {
//   id: number,          // keyPath
//   name: string,
//   status: "active" | "completed"
// }

// 参考：https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API/Using_IndexedDB
// 参考：https://web.dev/articles/indexeddb?hl=ja

//マジックコードは使わないように定義する(実務より)
const DB_NAME = "ToDoApp";
const DB_VERSION = 1;
const STORE_NAME = "tasks";
async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (event) => {
      console.error("Database error:", event.target.error);
      reject(event.target.error);
    };
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("name", "name");
        store.createIndex("status", "status");
      }
    };
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
}
// トランザクションを完了するまで待つユーティリティ関数
function waitForTransactionComplete(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event.target.error);
    transaction.onabort = (event) => reject(event.target.error);
  });
}

//タスク追加用関数
async function addTask(name) {
  const DB = await openDB();
  const transaction = DB.transaction([STORE_NAME], "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const id = Date.now(); // ユニークなIDを生成

  const task = {
    id: id,
    name: name,
    status: "active"
  };
  
  store.add(task);
  await waitForTransactionComplete(transaction);
  console.log("Task added:", task);

  // 他のタブに通知する
  channel.postMessage({ type: "updated" });

  return task;

  }

//タスク取得用関数
async function getAllTasks() {
  const DB = await openDB();
  const transaction = DB.transaction([STORE_NAME], "readonly");
  const store = transaction.objectStore(STORE_NAME);

  const allTasks = store.getAll();
  
  return new Promise((resolve, reject) => {
    allTasks.onsuccess = () => {
      resolve(allTasks.result);
    };
    allTasks.onerror = () => {
      reject(allTasks.error);
    };
  });

}

//タスク更新
async function updateTask(task) {
  const DB = await openDB();
  const transaction = DB.transaction([STORE_NAME], "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  //タスクを追加する
  store.put(task);
  console.log("Task updated:", task);

  // トランザクションが完了するまで待つ
  await waitForTransactionComplete(transaction);

// 他のタブに通知する
  channel.postMessage({ type: "updated" });

  return;
}

//タスク削除
async function deleteTask(id) {
  const DB = await openDB();
  const transaction = DB.transaction([STORE_NAME], "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  store.delete(id);
  
  // トランザクションが完了するまで待つ
  const tx = await waitForTransactionComplete(transaction);

  // 他のタブに通知する
  channel.postMessage({ type: "updated" });

  return;
}

