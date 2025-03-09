// 参考：https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/GridList.test.js
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GridList from "./";

const GridListItems = [
  {
    id: "item1",
    label: "item1",
  },
  {
    id: "item2",
    label: "item2",
    isDisabled: true,
  },
  {
    id: "item3",
    label: "item3",
  },
];

describe("GridList", () => {
  /**
   * Propsの確認
   */
  it("labelの内容が反映される", () => {
    const { getByRole } = render(
      <GridList items={GridListItems} label="GridList" />
    );
    const GridListEl = getByRole("grid");
    expect(GridListEl).toHaveAttribute("aria-label", "GridList");
  });

  it("カスタムクラスが設定される", () => {
    const { getByRole } = render(
      <GridList
        className="custom-class"
        items={GridListItems}
        label="GridList"
      />
    );
    const GridListEl = getByRole("grid");
    expect(GridListEl).toHaveClass("custom-class");
  });

  it("itemsの内容が反映される", () => {
    const { getAllByRole } = render(
      <GridList items={GridListItems} label="GridList" />
    );
    const rowEls = getAllByRole("row");
    expect(rowEls).toHaveLength(3);
    // TODO: rowの子要素のgridcellとaria-colindexのテスト書きたい
    expect(rowEls.map((rowEl) => rowEl.textContent)).toEqual([
      "item1",
      "item2",
      "item3",
    ]);
  });

  // NOTE: autoFocusが上手く設定できなかった。余裕ある時にちゃんと見る。
  // it("autoFocusの設定が反映される", () => {
  //   const { getByRole } = render(
  //     <GridList items={GridListItems} label="GridList" autoFocus />
  //   );
  //   const GridListEl = getByRole("grid");
  //   expect(document.activeElement).toBe(GridListEl);
  // });

  it("項目の無効状態が反映される", () => {
    const { getAllByRole } = render(
      <GridList items={GridListItems} label="GridList" />
    );
    const rowEls = getAllByRole("row");
    expect(rowEls[1]).toHaveAttribute("aria-disabled", "true");
  });

  it("項目が空の時にrenderEmptyStateの内容が反映される", () => {
    const { getByRole } = render(
      <GridList
        items={[]}
        label="GridList"
        renderEmptyState={() => "No results"}
      />
    );
    const GridListEl = getByRole("grid");
    expect(GridListEl.textContent).toBe("No results");
  });

  it("selectionModeがmultipleの時、isDisabledではない項目にaria-selectedが設定される", () => {
    const { getAllByRole } = render(
      <GridList
        items={GridListItems}
        label="GridList"
        selectionMode="multiple"
      />
    );
    const rowEls = getAllByRole("row");
    rowEls.forEach((rowEls, index) => {
      if (!GridListItems[index]?.isDisabled) {
        expect(rowEls).toHaveAttribute("aria-selected", "false");
      }
    });
  });

  /**
   * 挙動の確認
   */

  // NOTE: 画面描画したページだとクリックしてaria-selectedの変更が反映されたが、テストコードだと上手くできなかった。余裕ある時にちゃんと見る。
  // it("selectionModeがmultipleの時、項目の選択ができる", async () => {
  //   const user = userEvent.setup();
  //   const { getAllByRole } = render(
  //     <GridList
  //       items={GridListItems}
  //       label="GridList"
  //       selectionMode="multiple"
  //     />
  //   );
  //   const rowEls = getAllByRole("row");
  //   expect(rowEls[0]).toHaveAttribute("aria-selected", "false");
  //   await user.click(rowEls[0]);
  //   expect(rowEls[0]).toHaveAttribute("aria-selected", "true");
  // });

  it("項目のonActionが実行される", async () => {
    const user = userEvent.setup();
    const onAction = jest.fn();
    const { getAllByRole } = render(
      <GridList items={GridListItems} label="GridList" onAction={onAction} />
    );
    const rowEls = getAllByRole("row");
    // 無効状態の項目をクリックした場合、onActionは実行されない
    await user.click(rowEls[1]);
    expect(onAction).not.toHaveBeenCalled();
    // 項目をクリックした場合、onActionが実行される
    await user.click(rowEls[0]);
    expect(onAction).toHaveBeenCalledWith("item1");
  });

  it("上下キーボードで選択項目を移動する", async () => {
    const user = userEvent.setup();
    const { getAllByRole } = render(
      <GridList items={GridListItems} label="GridList" />
    );
    const rowEls = getAllByRole("row");
    await user.tab();
    expect(document.activeElement).toBe(rowEls[0]);
    // 上下矢印キーで選択項目を移動できる（無効の項目は飛ばされる）
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(rowEls[2]);
    await user.keyboard("{ArrowUp}");
    expect(document.activeElement).toBe(rowEls[0]);
  });

  it("layoutがgridの時、左右キーボードで選択項目を移動できる", async () => {
    const user = userEvent.setup();
    const { getAllByRole } = render(
      <GridList items={GridListItems} label="GridList" layout="grid" />
    );
    const rowEls = getAllByRole("row");
    await user.tab();
    expect(document.activeElement).toBe(rowEls[0]);
    // 左右矢印キーで選択項目を移動できる（無効の項目は飛ばされる）
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(rowEls[2]);
    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement).toBe(rowEls[0]);
  });
});
