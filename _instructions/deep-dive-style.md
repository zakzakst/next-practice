# コーディングガイドライン

- 変数と関数名には`camelCase`を使います
- クラス名には`PascalCase`を使います
- クラスメンバとメソッドの`camelCase`を使う
- インターフェースの名前には`PascalCase`を使います
- インターフェースのメンバには`camelCase`を使います
- インターフェースのプレフィックスに`I`をつけないでください
- タイプの名前には`PascalCase`を使います
- タイプのメンバには`camelCase`を使います
- 名前空間の名前に`PascalCase`を使用する
- enum 名には`PascalCase`を使います
- enum メンバに`PascalCase`を使用する
- セミコロンを使用してください。明示的なセミコロンは、言語書式設定ツールで一貫した結果を得るのに役立ちます
- 配列に`foos: Array<Foo>`の代わりに`foos: Foo[]`として配列にアノテーションをつけます
- `camelCase`を使ってファイルに名前を付けます。例えば`accordion.tsx`、`myControl.tsx`、`utils.ts`、`map.ts`などです
- ユニオン型や交差型が必要な場合には`type`を使います
- `extend`や`implements`をしたいときは`interface`を使います
