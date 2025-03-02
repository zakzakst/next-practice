// 参考：https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/ListBox.test.js
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListBox from "./";

const ListBoxItems = [
  {
    id: "menu1",
    label: "menu1",
  },
  {
    id: "menu2",
    label: "menu2",
    isDisabled: true,
  },
  {
    id: "menu3",
    label: "menu3",
  },
];

describe("ListBox", () => {
  /**
   * Propsの確認
   */
  it("labelの内容が反映される", () => {
    const { getByRole } = render(
      <ListBox items={ListBoxItems} label="ListBox" />
    );
    const ListBoxEl = getByRole("listbox");
    expect(ListBoxEl).toHaveAttribute("aria-label", "ListBox");
  });

  it("カスタムクラスが設定される", () => {
    const { getByRole } = render(
      <ListBox className="custom-class" items={ListBoxItems} label="ListBox" />
    );
    const ListBoxEl = getByRole("listbox");
    expect(ListBoxEl).toHaveClass("custom-class");
  });

  it("itemsの内容が反映される", () => {
    const { getAllByRole } = render(
      <ListBox items={ListBoxItems} label="ListBox" />
    );
    const optionEls = getAllByRole("option");
    expect(optionEls).toHaveLength(3);
    // expect(optionEls[1].textContent).toBe("menu2");
    expect(optionEls.map((optionEl) => optionEl.textContent)).toEqual([
      "menu1",
      "menu2",
      "menu3",
    ]);
  });

  it("autoFocusの設定が反映される", () => {
    const { getByRole } = render(
      <ListBox items={ListBoxItems} label="ListBox" autoFocus />
    );
    const ListBoxEl = getByRole("listbox");
    expect(document.activeElement).toBe(ListBoxEl);
  });

  it("項目の無効状態が反映される", () => {
    const { getAllByRole } = render(
      <ListBox items={ListBoxItems} label="ListBox" />
    );
    const optionEls = getAllByRole("option");
    expect(optionEls[1]).toHaveAttribute("aria-disabled", "true");
  });

  it("項目が空の時にrenderEmptyStateの内容が反映される", () => {
    const { getByRole } = render(
      <ListBox
        items={[]}
        label="ListBox"
        renderEmptyState={() => "No results"}
      />
    );
    const ListBoxEl = getByRole("listbox");
    expect(ListBoxEl.textContent).toBe("No results");
  });

  /**
   * 挙動の確認
   */
  it("項目のonActionが実行される", async () => {
    const user = userEvent.setup();
    const onAction = jest.fn();
    const { getAllByRole } = render(
      <ListBox items={ListBoxItems} label="ListBox" onAction={onAction} />
    );
    const optionEls = getAllByRole("option");
    // 無効状態の項目をクリックした場合、onActionは実行されない
    await user.click(optionEls[1]);
    expect(onAction).not.toHaveBeenCalled();
    // 項目をクリックした場合、onActionが実行される
    await user.click(optionEls[0]);
    expect(onAction).toHaveBeenCalledWith("menu1");
  });

  it("上下キーボードで選択項目を移動する", async () => {
    const user = userEvent.setup();
    const { getAllByRole } = render(
      <ListBox items={ListBoxItems} label="ListBox" />
    );
    const optionEls = getAllByRole("option");
    await user.tab();
    expect(document.activeElement).toBe(optionEls[0]);
    // 上下矢印キーで選択項目を移動できる（無効の項目は飛ばされる）
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(optionEls[2]);
    await user.keyboard("{ArrowUp}");
    expect(document.activeElement).toBe(optionEls[0]);
  });

  it("orientationがhorizontalの時、左右キーボードでも選択項目を移動できる（通常の上下矢印キーでの移動もできる）", async () => {
    const user = userEvent.setup();
    const { getAllByRole } = render(
      <ListBox items={ListBoxItems} label="ListBox" orientation="horizontal" />
    );
    const optionEls = getAllByRole("option");
    await user.tab();
    expect(document.activeElement).toBe(optionEls[0]);
    // 上下矢印キーで選択項目を移動できる（無効の項目は飛ばされる）
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(optionEls[2]);
    await user.keyboard("{ArrowUp}");
    expect(document.activeElement).toBe(optionEls[0]);
    // 左右矢印キーで選択項目を移動できる（無効の項目は飛ばされる）
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(optionEls[2]);
    await user.keyboard("{ArrowLeft}");
    expect(document.activeElement).toBe(optionEls[0]);
  });

  it("selectionModeがmultipleの時、項目にaria-selectedが設定される", () => {
    const { getAllByRole } = render(
      <ListBox items={ListBoxItems} label="ListBox" selectionMode="multiple" />
    );
    const optionEls = getAllByRole("option");
    optionEls.forEach((optionEl) => {
      expect(optionEl).toHaveAttribute("aria-selected", "false");
    });
    // TODO: aria-selectedをtrueにする条件については読み取りきれなかった。余裕ある時にちゃんと見る。
  });
});
