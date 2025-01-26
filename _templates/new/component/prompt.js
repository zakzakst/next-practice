module.exports = [
  {
    type: "select",
    name: "type",
    message: "コンポーネントタイプを選択してください",
    choices: ["atoms", "molecules"],
  },
  {
    type: "input",
    name: "name",
    message: "コンポーネント名を入力してください",
  },
  {
    type: "confirm",
    name: "jest",
    message: "jestファイルを利用しますか",
    initial: false,
  },
];
