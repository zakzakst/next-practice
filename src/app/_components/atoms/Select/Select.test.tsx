// NOTE:https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/Select.test.js

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./";

const SelectItems = [
  {
    id: "select1",
    label: "select1",
  },
  {
    id: "select2",
    label: "select2",
  },
  {
    id: "select3",
    label: "select3",
  },
];

describe("Select", () => {
  /**
   * Propsの確認
   */
  it("labelの内容が反映される", () => {
    const { container } = render(<Select label="Select" items={SelectItems} />);
    const selectLabelEl = container.querySelector("span");
    expect(selectLabelEl?.textContent).toBe("Select");
  });

  it("itemsの内容が反映される", async () => {
    const user = userEvent.setup();
    const { container, getAllByText, getByRole } = render(
      <Select label="Select" items={SelectItems} />
    );
    const selectButtonEl = container.querySelector(
      "button"
    ) as HTMLButtonElement;
    await user.click(selectButtonEl);
    SelectItems.forEach((item) => {
      const itemEl = getAllByText(item.label)[0];
      expect(itemEl).toBeInTheDocument();
      expect(itemEl).toHaveRole("option");
    });
    expect(getByRole("listbox")).toBeInTheDocument();
  });

  it("カスタムクラスが設定される", () => {
    const { container } = render(
      <Select className="custom-class" label="Select" items={SelectItems} />
    );
    const selectEl = container.querySelector("div");
    expect(selectEl).toHaveClass("custom-class");
  });

  it("プレースホルダーが設定される", () => {
    const { container } = render(
      <Select
        label="Select"
        items={SelectItems}
        placeholder="プレースホルダー"
      />
    );
    const selectButtonEl = container.querySelector("button");
    const selectButtonChild = selectButtonEl?.querySelectorAll(
      "span"
    ) as NodeListOf<HTMLSpanElement>;
    const selectedItemEl = selectButtonChild[0];
    expect(selectedItemEl.textContent).toBe("プレースホルダー");
  });

  it("デフォルトの選択が設定される", () => {
    const { container } = render(
      <Select label="Select" items={SelectItems} defaultSelectedKey="select1" />
    );
    const selectButtonEl = container.querySelector("button");
    const selectButtonChild = selectButtonEl?.querySelectorAll(
      "span"
    ) as NodeListOf<HTMLSpanElement>;
    const selectedItemEl = selectButtonChild[0];
    expect(selectedItemEl?.textContent).toBe("select1");
  });

  it("無効状態が設定される", () => {
    const { container } = render(
      <Select label="Select" items={SelectItems} isDisabled />
    );
    const selectButtonEl = container.querySelector("button");
    const selectEl = container.querySelector("select");
    expect(selectButtonEl).toBeDisabled();
    expect(selectEl).toBeDisabled();
  });

  /**
   * 挙動の確認
   */
  it("aria関連の値が設定される", () => {
    const { container } = render(<Select label="Select" items={SelectItems} />);
    const selectLabelEl = container.querySelector("span");
    const selectButtonEl = container.querySelector("button");
    const selectButtonChild = selectButtonEl?.querySelectorAll(
      "span"
    ) as NodeListOf<HTMLSpanElement>;
    const selectedItemEl = selectButtonChild[0];
    const selectArrowEl = selectButtonChild[1];
    const selectLabelId = selectLabelEl?.id;
    const selectedItemId = selectedItemEl.id;
    const selectButtonLabelledby =
      selectButtonEl?.getAttribute("aria-labelledby");
    expect(selectButtonLabelledby).toContain(selectLabelId);
    expect(selectButtonLabelledby).toContain(selectedItemId);
    expect(selectButtonEl).toHaveAttribute("aria-haspopup", "listbox");
    expect(selectButtonEl).toHaveAttribute("aria-expanded", "false");
    expect(selectArrowEl).toHaveAttribute("aria-hidden", "true");
  });

  it("ボタンをクリックすると選択肢が表示される", async () => {
    const user = userEvent.setup();
    const { container, getByRole } = render(
      <Select label="Select" items={SelectItems} />
    );
    const selectButtonEl = container.querySelector(
      "button"
    ) as HTMLButtonElement;
    await user.click(selectButtonEl);
    expect(selectButtonEl).toHaveAttribute("aria-expanded", "true");
    const listboxEl = getByRole("listbox");
    const listboxId = listboxEl.id;
    const selectButtonControls = selectButtonEl.getAttribute("aria-controls");
    expect(listboxId).toBe(selectButtonControls);
  });

  it("選んだ選択肢が選択項目に反映される", async () => {
    const user = userEvent.setup();
    const { container, getAllByRole } = render(
      <Select label="Select" items={SelectItems} />
    );
    const selectButtonEl = container.querySelector(
      "button"
    ) as HTMLButtonElement;
    await user.click(selectButtonEl);
    const targetItemEl = getAllByRole("option");

    await user.click(targetItemEl[0]);
    const selectButtonChild = selectButtonEl?.querySelectorAll(
      "span"
    ) as NodeListOf<HTMLSpanElement>;
    const selectedItemEl = selectButtonChild[0];
    expect(selectedItemEl.textContent).toBe("select1");
  });

  it("キーボードで選択できる", async () => {
    const user = userEvent.setup();
    const { container } = render(<Select label="Select" items={SelectItems} />);
    const selectButtonEl = container.querySelector(
      "button"
    ) as HTMLButtonElement;
    const selectButtonChild = selectButtonEl?.querySelectorAll(
      "span"
    ) as NodeListOf<HTMLSpanElement>;
    const selectedItemEl = selectButtonChild[0];
    await user.tab();
    await user.keyboard("{Enter}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");
    expect(selectedItemEl.textContent).toBe("select2");
  });
});
