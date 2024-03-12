function element(strings, ...values) {
  console.log(strings);
  console.log(values);
}

const todoElement = element`<ul>
    <li>新しい要素</li>
</ul>`;
