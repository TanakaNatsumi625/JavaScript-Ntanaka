const app = document.querySelector("#app");
const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const loading = document.querySelector("#loading");


document.addEventListener("DOMContentLoaded", async () => {
  console.log("取得開始");
  try {
    setLoading(true); // ローディング開始
    // TODO: ここで API を呼び出してタスク一覧を取得し、
    // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
    let url = "http://localhost:3000/api/tasks";
    //試行回数5回のうち、成功したらリトライを抜ける⇒一回目200も含めた(if(status===500)と場合分けしない)
    const response = await retryWithExponentialBackoff(async () => {
      // 第一引数の関数
      // リトライ対象のステータスを定義
      const RETRY_STATUS = [408, 429, 500, 502, 503, 504];
      // fetchWithTimeout関数を使用してタイムアウト付きでfetchを実行
      const retryResponse = await fetchWithTimeout(url, { timeout: 3000 });
      console.log(`Retry Response status: ${retryResponse.status}`);
      // レスポンスが正常でない場合のエラーハンドリング
      if (!retryResponse.ok && !RETRY_STATUS.includes(retryResponse.status)) {
        throw new Error(`HTTP error: ${retryResponse.status}`);
      }
      return retryResponse;
    }, 5);

    console.log('取得成功:', response);
    const tasks = await response.json();
    console.log("task items:", tasks);
    // 取得したタスクをToDoリストに追加
    tasks.items.forEach((task) => {
      appendToDoItem(task);
    });
  } catch (error) {
    //エラーはタイムアウトの場合と、そのほかの場合で場合分け
    if (error.name === 'AbortError') {
      alert("リクエストがタイムアウトしました");
    } else {
      //例えば試行回数が超えた時もこちらに行く
      alert("データ取得に失敗しました");
      console.error(error);
    }
  } finally {
    setLoading(false); // ローディング終了
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
  let url = "http://localhost:3000/api/tasks";
  // 以下はTodo取得時とほぼ同じなので、関数書いてもよいかも
  try {
    setLoading(true); // ローディング開始
    const response = await retryWithExponentialBackoff(async () => {
      // 第一引数の関数
      // リトライ対象のステータスを定義
      const RETRY_STATUS = [408, 429, 500, 502, 503, 504];
      // fetchWithTimeout関数を使用してタイムアウト付きでfetchを実行
      const retryResponse = await fetchWithTimeout(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: todo }),
        timeout: 3000,
      });
      console.log(`Retry Response status: ${retryResponse.status}`);
      // レスポンスが正常でない場合のエラーハンドリング
      if (!retryResponse.ok && !RETRY_STATUS.includes(retryResponse.status)) {
        throw new Error(`HTTP error: ${retryResponse.status}`);
      }
      return retryResponse;
    }, 5);

    console.log('作成成功:', response);
    const newTask = await response.json();
    console.log("Created task:", newTask);
    appendToDoItem(newTask);
  } catch (error) {
    if (error.name === 'AbortError') {
      alert("リクエストがタイムアウトしました");
    } else {
      alert("タスクの作成に失敗しました");
      console.error(error);
    }
  } finally {
    setLoading(false); // ローディング終了
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
      setLoading(true); // ローディング開始
      let url = `http://localhost:3000/api/tasks/${task.id}`;
      const response = await retryWithExponentialBackoff(async () => {
        // 第一引数の関数
        // リトライ対象のステータスを定義
        const RETRY_STATUS = [408, 429, 500, 502, 503, 504];
        // fetchWithTimeout関数を使用してタイムアウト付きでfetchを実行
        const retryResponse = await fetchWithTimeout(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: task.id, name: task.name, status: toggle.checked ? "completed" : "active" }),
          timeout: 3000,
        });
        console.log(`Retry Response status: ${retryResponse.status}`);
        // レスポンスが正常でない場合のエラーハンドリング
        if (!retryResponse.ok && !RETRY_STATUS.includes(retryResponse.status)) {
          throw new Error(`HTTP error: ${retryResponse.status}`);
        }
        return retryResponse;
      }, 5);

      console.log('更新成功:', response);
      if (toggle.checked) {
        label.style.textDecorationLine = "line-through";
      } else {
        label.style.textDecorationLine = "none";
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        alert("リクエストがタイムアウトしました");
      } else {
        alert("タスクの更新に失敗しました");
        console.error(error);
      }
    } finally {
      setLoading(false); // ローディング終了
    }
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", async () => {
    try {
      setLoading(true); // ローディング開始
      let url = `http://localhost:3000/api/tasks/${task.id}`;
      const response = await retryWithExponentialBackoff(async () => {
        // 第一引数の関数
        // リトライ対象のステータスを定義
        const RETRY_STATUS = [408, 429, 500, 502, 503, 504];
        // fetchWithTimeout関数を使用してタイムアウト付きでfetchを実行
        const retryResponse = await fetchWithTimeout(url, {
          method: "DELETE",
          timeout: 3000,
        });
        console.log(`Retry Response status: ${retryResponse.status}`);
        // レスポンスが正常でない場合のエラーハンドリング
        if (!retryResponse.ok && !RETRY_STATUS.includes(retryResponse.status)) {
          throw new Error(`HTTP error: ${retryResponse.status}`);
        }
        return retryResponse;
      }, 5);

      console.log('削除成功:', response);
      elem.remove();
    } catch (error) {
      if (error.name === 'AbortError') {
        alert("リクエストがタイムアウトしました");
      } else {
        alert("タスクの削除に失敗しました");
        console.error(error);
      }
    } finally {
      setLoading(false); // ローディング終了
    }
  });
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  list.prepend(elem);
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
}

//指数関数的バックオフを用いたリトライ関数
//題意的に200が出るまでtryするものにしようと思ったが、実務的な視点から最大試行回数は設けるべきと考えた
function retryWithExponentialBackoff(func, maxRetry) {
  let attemptCount = 0;

  async function attempt() {
    const result = await func();

    // 成功した場合は結果を返す
    if (result.ok) {
      return result;
    }

    attemptCount++;

    // 最大試行回数を超えた場合はエラーを投げる
    if (attemptCount >= maxRetry) {
      throw new Error("Maximum retry attempts exceeded");
    }

    // 指数関数的に待機時間を増加させる（ミリ秒単位）
    let waitTime = Math.pow(2, attemptCount - 1) * 1000;

    // 一定時間待機してから再試行
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    return attempt();
  }

  return attempt();
}

// ※書式そのまま。fetchを実行する関数
// この関数はfetch() と似ているが、オプションオブジェクトにtimeout
// プロパティを追加している。このプロパティで指定したミリ秒以内に
// リクエストが完了しない場合は中止する。
function fetchWithTimeout(url, options = {}) {
  if (options.timeout) { // timeout が存在し、値がゼロではない場合、
    let controller = new AbortController(); // コントローラを作成する。
    options.signal = controller.signal; // signal プロパティを設定する。
    // 指定したミリ秒が経過した後に中止シグナルを送信するタイマーを
    // 開始する。なお、このタイマーをキャンセルすることはない。fetch が
    // 完了した後にabort() を呼び出しても問題はない。
    setTimeout(() => { controller.abort(); }, options.timeout);
  }
  // ここでは通常のfetch を行うだけ。
  return fetch(url, options);
}

//通信中(ローディング中)の処理
function setLoading(isLoading) {
  if(isLoading) {
    // ローディング中のスタイルを適用
    app.classList.add("loading");
    //フォームに入力できないようにする
    input.disabled = true;
    //ボタンも押せないようにする
    form.querySelector("button").disabled = true;
    //ローディングインジケーターを表示
    loading.hidden = false;
  }else {
    app.classList.remove("loading");
    input.disabled = false;
    form.querySelector("button").disabled = false;
    loading.hidden = true;
  }
}
