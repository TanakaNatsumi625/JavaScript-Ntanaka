const template = document.createElement("template");
template.innerHTML = `
<style>
/* === 全体 === */
:host {
  font-family: "Segoe UI", sans-serif;
  background: #f5f6fa;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* === フォーム === */
#new-todo-form {
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
}

#new-todo {
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border 0.2s ease;
}

#new-todo:focus {
  border-color: #4a90e2;
}

#new-todo-form button {
  padding: 12px 20px;
  background: #4a90e2;
  border: none;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s ease;
}

#new-todo-form button:hover {
  background: #357abd;
}

/* === リスト === */
#todo-list {
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 500px;
}

/* li */
#todo-list li {
  background: white;
  padding: 14px 18px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

#todo-list li:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 8px rgba(0,0,0,0.15);
}

/* 中身 */
.view {
  display: flex;
  align-items: center;
  width: 100%;
}

.toggle {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  cursor: pointer;
}

.content {
  flex: 1;
  font-size: 17px;
}

.destroy {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.destroy:hover {
  opacity: 1;
  transform: scale(1.2);
}

.completed .content {
  text-decoration: line-through;
  color: #999;
}
</style>

<form id="new-todo-form">
  <input id="new-todo" type="text" placeholder="What needs to be done?" />
  <button>Add</button>
</form>

<ul id="todo-list"></ul>
`;


class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    // TODO: 残りを実装
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.list = this.shadowRoot.querySelector("#todo-list");

    // this.input.onfocus = () => { this.setAttribute("focused", ""); };
    // this.input.onblur = () => { this.removeAttribute("focused"); };

    // フォームの送信イベントハンドラを登録
    // ex01のコードを参考に実装
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.input.value.trim() === "") {
        return;
      }
      // Addが押されたら以下の要素を作成する
      const li = document.createElement("li");
      const view = document.createElement("div");
      view.className = "view";

      const toggle = document.createElement("input");
      toggle.type = "checkbox";
      toggle.className = "toggle";

      const content = document.createElement("span");
      content.className = "content";
      const textContent = this.input.value.trim();
      content.textContent = textContent;
      
      const destroy = document.createElement("button");
      destroy.className = "destroy";
      destroy.textContent = "❌";

      toggle.addEventListener("change", () => {
        li.classList.toggle("completed", toggle.checked);
      });

      destroy.addEventListener("click", () => li.remove());

      view.append(toggle, content, destroy);
      li.appendChild(view);
      this.list.prepend(li);

      this.input.value = "";
    });

  }
}

customElements.define("todo-app", TodoApp);


// 以下メモ
{/* <todo-app>        
    └─ #shadow-root
        ├─ <form id="new-todo-form">
        │    ├─ <input id="new-todo">
        │    └─ <button>
        └─ <ul id="todo-list"> */}
