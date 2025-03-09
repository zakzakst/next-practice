// 参考：https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/GridList.test.js
import { render } from "@testing-library/react";
import GridList from "./";

const GridListItems = [
  {
    id: "item1",
    label: "item1",
  },
  {
    id: "item2",
    label: "item2",
    // isDisabled: true,
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

  /**
   * 挙動の確認
   */
});
