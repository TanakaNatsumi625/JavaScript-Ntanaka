const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
const todos = [];

function renderTodos(todos) {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    li.classList.toggle("completed", todo.completed);
    toggle.addEventListener("change", () => {
      todo.completed = toggle.checked;
      renderTodos(todos);
    });
    label.textContent = todo.content;
    toggle.checked = todo.completed;
    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos(todos);
    });

    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todos.push({ content: todo, completed: false });
  renderTodos(todos);
});

window.addEventListener("hashchange", () => {
  // ここを実装してね
  console.log(location.hash);
  if (location.hash === "#/completed") {//もしハッシュが#/completedなら
    //完了分
    console.log(`todos:`, todos);
    //todoの配列の例
    // 0:  {content: 'テスト', completed: true}
    // 1:  {content: 'test', completed: true}
    // 2:  {content: '勤怠', completed: false}

    const completedTodos = todos.filter((todo) => todo.completed);//完了したものだけ抽出
    console.log(`completedTodos:`, completedTodos);
    renderTodos(completedTodos);//完了したものだけ表示


  } else if (location.hash === "#/active") {
    //未完了分
    console.log(`todos:`, todos);
    const activeTodos = todos.filter((todo) => !todo.completed);
    console.log(`activeTodos:`, activeTodos);
    renderTodos(activeTodos);

  } else {
    //ALL
    renderTodos(todos);
  }


});
