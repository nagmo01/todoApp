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
      const todoItemElement = element`<li>${inputElement.value}</li>`;
      todoItemElement.setAttribute('id', `item${todoItemCount}`)
      //【追加】deleteボタンを作成
      const deleteButtonElement = document.createElement('button');
      deleteButtonElement.setAttribute('id', `delete${todoItemCount}`);
      deleteButtonElement.textContent = '削除';
      //【追加】削除ボタンをタグごと<li>の中に入れる
      todoListElement.appendChild(deleteButtonElement)
      //【追加】editボタンを作成
      const editButtonElement = document.createElement('button');
      editButtonElement.setAttribute('id', `edit${todoItemCount}`);
      editButtonElement.textContent = '編集';
      //【追加】編集ボタンをタグごと<li>の中に入れる
      todoListElement.appendChild(editButtonElement)

      // TodoアイテムをtodoListElementに追加する
      todoListElement.appendChild(todoItemElement);
      //todoListElement.appendChild(deleteButtonElement);
      //todoListElement.appendChild(window["deleteButton" + todoItemCount]);
      // コンテナselectors要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, containerElement);
      // Todoアイテム数を+1し、表示されてるテキストを更新する
      // 入力欄を空文字列にしてリセットする
      inputElement.value = "";

      //ここから下はeditのイベントリスナー
      window[ "editElement" + todoItemCount ] = document.querySelector(`#edit${todoItemCount}`)
      window[ "editElement" + todoItemCount ].addEventListener('click', (event) => {
        event.preventDefault();
        var buttons = document.getElementsByTagName("button");

        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.display = "none";
        }


        console.log(todoItemElement.textContent)
        todoItemElement.innerHTML = `<form><input id="input${todoItemCount}" type="text" value="${todoItemElement.textContent}"></input></form>`;

        render(todoListElement, containerElement);

        window[ "inputElement" + todoItemCount ] = document.querySelector(`#input${todoItemCount}`)

        todoItemElement.addEventListener("submit", (event) => {
          event.preventDefault();


          var buttons = document.getElementsByTagName("button");

          for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.display = "inline";
          }

          todoItemElement.innerHTML = `<li>${window[ "inputElement" + todoItemCount ].value}</li>`;
          render(todoListElement, containerElement);
        });
      });


      //ここから下はdeleteのイベントリスナー
      window[ "deleteElement" + todoItemCount ] = document.querySelector(`#delete${todoItemCount}`)
      window[ "deleteElement" + todoItemCount ].addEventListener('click', (event) => {
        event.preventDefault();
        window.confirm("キャンセルしても消える");
        todoListElement.removeChild(todoItemElement);
        todoListElement.removeChild(editButtonElement);
        todoListElement.removeChild(deleteButtonElement);

        render(todoListElement, containerElement);
        // Todoアイテム数を-1し、表示されてるテキストを更新する
        todoItemCount -= 1;
        todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
      });
      todoItemCount += 1;
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
      });
  };
};
