import { element, render } from "./view/html-util.js";

export class App {
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    // TodoリストをまとめるList要素
    const todoListElement = element`<ul></ul>`;
    // Todoアイテム数
    let todoItemCount = 0;
    formElement.addEventListener("submit", (event) => {
      // 本来のsubmitイベントの動作を止める
      event.preventDefault();
      // 追加するTodoアイテムの要素(li要素)を作成する
      window["todoItemElement" + todoItemCount] = element`<li>${inputElement.value}</li>`;
      //【追加】deleteボタンを作成
      window["deleteButton" + todoItemCount] = element`<button id="delete${todoItemCount}">削除</button>`;
      // TodoアイテムをtodoListElementに追加する【追加】deleteボタンをリストに差し込む
      todoListElement.appendChild(window["todoItemElement" + todoItemCount]);
      todoListElement.appendChild(window["deleteButton" + todoItemCount]);
      //todoListElement.appendChild(window["deleteButton" + todoItemCount]);
      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, containerElement);
      // Todoアイテム数を+1し、表示されてるテキストを更新する
      // 入力欄を空文字列にしてリセットする
      inputElement.value = "";
      //ここから下はdeleteのイベントリスナー
      window["deleteButton" + todoItemCount] = document.querySelector("#delete${todoItemCount}")
      window["deleteButton" + todoItemCount].addEventListener('click', (event) => {
        event.preventDefault();
        todoListElement.removeChild(window["todoItemElement" + todoItemCount]);

        render(todoListElement, containerElement);
        // Todoアイテム数を-1し、表示されてるテキストを更新する
        todoItemCount -= 1;
        todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
      });
      todoItemCount += 1;
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
    });



  }
}
