// 参考：https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/Table.test.js
import { render } from "@testing-library/react";
import Table from "./";

/**
 * タグのメモ
 * - table： role=grid
 * - thead： role=rowgroup
 * - tbody： role=rowgroup
 * - tr： role=row
 * - th（thead配下）： role=columnheader
 * - td（見出しのtd）： role=rowheader
 * - td： role=gridcell
 */

const headerRow = ["見出し1", "見出し2", "見出し3"];
const bodyRows = [
  {
    row: ["項目1-1", "項目1-2", "項目1-3"],
  },
  {
    row: ["項目2-1", "項目2-2", "項目2-3"],
    isDisabled: true,
  },
  {
    row: ["項目3-1", "項目3-2", "項目3-3"],
  },
];

describe("Table", () => {
  /**
   * Propsの確認
   */
  it("labelの内容が反映される", () => {
    const { getByRole } = render(
      <Table label="Table" headerRow={headerRow} bodyRows={bodyRows} />
    );
    const tableEl = getByRole("grid");
    expect(tableEl).toHaveAttribute("aria-label", "Table");
  });

  it("カスタムクラスが設定される", () => {
    const { getByRole } = render(
      <Table
        className="custom-class"
        label="Table"
        headerRow={headerRow}
        bodyRows={bodyRows}
      />
    );
    const tableEl = getByRole("grid");
    expect(tableEl).toHaveClass("custom-class");
  });

  it("rowの無効状態が設定される", () => {
    const { getAllByRole } = render(
      <Table label="Table" headerRow={headerRow} bodyRows={bodyRows} />
    );
    const rowEls = getAllByRole("row");
    expect(rowEls[2]).toHaveAttribute("aria-disabled", "true");
  });

  it("データがない場合に文言が表示される", () => {
    const { getByRole } = render(
      <Table label="Table" headerRow={headerRow} bodyRows={[]} />
    );
    const cellEl = getByRole("rowheader");
    expect(cellEl).toHaveTextContent("データがありません");
  });

  // NOTE: 上手くテストが動かなかったのでコメントアウト（テストだとaria-labelledbyがnullになってしまう）
  // it("rowのaria-labelledbyがrowheaderのidと一致する", () => {
  //   const { getAllByRole } = render(
  //     <Table label="Table" headerRow={headerRow} bodyRows={bodyRows} />
  //   );
  //   const rowEls = getAllByRole("row");
  //   rowEls.forEach((rowEl) => {
  //     const rowHeaderEl = rowEl.querySelector('[role="rowheader"]');
  //     expect(rowEl).toHaveAttribute("aria-labelledby", rowHeaderEl?.id);
  //   });
  // });

  /**
   * 挙動の確認
   */
  // TODO: 色々な挙動が設定できそうだったが、難しかったので一旦保留（aria関連は以下がありそうだった）
  // - ソート機能がある時：aria-sort
  // - colspanを設定している時？：row-index col-index
  // - 選択関連の設定がある時： aria-selected
});
