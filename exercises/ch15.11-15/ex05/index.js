const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// BroadcastChannelを使って他のタブと通信する(後半課題内容)
const channel = new BroadcastChannel("todo_channel");
// 他のタブからメッセージを受け取ったときの処理
channel.addEventListener("message", async (event) => {
  console.log("Message received from other tab:", event.data);
  if (event.data.type === "updated") {
    // ToDoリストが更新されたので、再読み込みする
    list.innerHTML = "";
    const items = await getAllTasks();
    items.forEach((item) => {
      appendToDoItem(item);
    });
  }
});

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

//マジックコードは使わないように定義する(実務より)
const DB_NAME = "ToDoApp";
const DB_VERSION = 1;
const STORE_NAME = "tasks";
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

//タスク追加用関数
async function addTask(name) {
  const DB = await openDB();
  // この問い合わせ用の読み出し専用のトランザクションオブジェクトを作成する。
  // 引数には、使用する必要のあるオブジェクトストアの配列を指定する。(fromテキスト参照)
  const tx = DB.transaction([STORE_NAME], "readwrite");
  const store = tx.objectStore(STORE_NAME);

   const task = {
    name,
    status: "active"
  };

  store.add(task);

  await new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = reject;
    tx.onabort = reject;
  });
  // 他のタブに通知する
  channel.postMessage({ type: "updated" });

  // return result;
}

//タスク取得用関数
async function getAllTasks() {
  const DB = await openDB();
  const tx = DB.transaction([STORE_NAME], "readonly");
  const store = tx.objectStore(STORE_NAME);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

//タスク更新
async function updateTask(task) {
  const DB = await openDB();
  const tx = DB.transaction([STORE_NAME], "readwrite");
  const store = tx.objectStore(STORE_NAME);
  const result = await store.put(task);
  console.log("Task updated:", result);

// 他のタブに通知する
  channel.postMessage({ type: "updated" });

  return tx.complete;
}

//タスク削除
async function deleteTask(id) {
  const DB = await openDB();
  const tx = DB.transaction([STORE_NAME], "readwrite");
  const store = tx.objectStore(STORE_NAME);
  
  const result = await store.delete(id);
  console.log("Task deleted:", result);

  // 他のタブに通知する
  channel.postMessage({ type: "updated" });

  return tx.complete;
}

