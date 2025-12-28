// ① 追加先（tbody）
const tableBody = document.querySelector("#table-body");
// ② テンプレート取得
const template = document.querySelector("#row-template");
// ③ テンプレートを複製（深いコピー）
const clone = template.content.cloneNode(true);
// ④ 複製した中身を書き換える
clone.querySelector(".id").textContent = "1";
clone.querySelector(".name").textContent = "Alice";
// ⑤ DOMに追加（←これが超重要）
tableBody.append(clone);

const clone2 = template.content.cloneNode(true);
clone2.querySelector(".id").textContent = "2";
clone2.querySelector(".name").textContent = "Bob";
tableBody.append(clone2);