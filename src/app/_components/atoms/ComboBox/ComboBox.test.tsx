// NOTE: https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/ComboBox.test.js

import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ComboBox from "./";

const ComboBoxItems = [
  {
    id: "comboBox1",
    label: "comboBox1",
  },
  {
    id: "comboBox2",
    label: "comboBox2",
  },
  {
    id: "comboBox3",
    label: "comboBox3",
  },
];

describe("ComboBox", () => {
  /**
   * Propsの確認
   */
  it("labelの内容が反映される", () => {
    const { container } = render(
      <ComboBox label="ComboBox" items={ComboBoxItems} />
    );
    const comboboxLabelEl = container.querySelector("label");
    expect(comboboxLabelEl?.textContent).toBe("ComboBox");
  });

  it("itemsの内容が反映される", async () => {
    const user = userEvent.setup();
    const { container, getByText, getByRole } = render(
      <ComboBox label="ComboBox" items={ComboBoxItems} />
    );
    const comboboxButtonEl = container.querySelector(
      "button"
    ) as HTMLButtonElement;
    await user.click(comboboxButtonEl);
    ComboBoxItems.forEach((item) => {
      const itemEl = getByText(item.label);
      expect(itemEl).toBeInTheDocument();
      expect(itemEl).toHaveRole("option");
    });
    expect(getByRole("listbox")).toBeInTheDocument();
  });

  it("カスタムクラスが設定される", () => {
    const { container } = render(
      <ComboBox
        className="custom-class"
        label="ComboBox"
        items={ComboBoxItems}
      />
    );
    const comboboxEl = container.querySelector("div");
    expect(comboboxEl).toHaveClass("custom-class");
  });

  it("デフォルトの値が設定される", () => {
    const { container } = render(
      <ComboBox
        label="ComboBox"
        items={ComboBoxItems}
        defaultInputValue="default"
      />
    );
    const comboboxInputEl = container.querySelector("input");
    expect(comboboxInputEl).toHaveValue("default");
  });

  /**
   * 挙動の確認
   */
  it("aria-labelledbyの値が設定される", () => {
    const { container } = render(
      <ComboBox label="ComboBox" items={ComboBoxItems} />
    );
    const comboboxLabelEl = container.querySelector("label");
    const comboboxInputEl = container.querySelector("input");
    const comboboxLabelId = comboboxLabelEl?.id;
    const comboboxLabelFor = comboboxLabelEl?.getAttribute("for");
    const comboboxInputId = comboboxInputEl?.id;
    const comboboxInputLabeledby =
      comboboxInputEl?.getAttribute("aria-labelledby");
    expect(comboboxInputLabeledby).toBe(comboboxLabelId);
    expect(comboboxLabelFor).toBe(comboboxInputId);
  });

  it("roleが設定される", () => {
    const { container } = render(
      <ComboBox label="ComboBox" items={ComboBoxItems} />
    );
    const comboboxInputEl = container.querySelector("input");
    expect(comboboxInputEl).toHaveAttribute("role", "combobox");
  });

  it("展開ボタンのaria属性が設定される", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ComboBox label="ComboBox" items={ComboBoxItems} />
    );
    const comboboxButtonEl = container.querySelector(
      "button"
    ) as HTMLButtonElement;
    expect(comboboxButtonEl).toHaveAttribute("aria-haspopup", "listbox");
    expect(comboboxButtonEl).toHaveAttribute("aria-expanded", "false");
    await user.click(comboboxButtonEl);
    expect(comboboxButtonEl).toHaveAttribute("aria-expanded", "true");
  });

  it("展開ボタンを押すとインプットにフォーカスが当たる", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ComboBox label="ComboBox" items={ComboBoxItems} />
    );
    const comboboxInputEl = container.querySelector("input");
    const comboboxButtonEl = container.querySelector(
      "button"
    ) as HTMLButtonElement;
    expect(comboboxInputEl).not.toHaveFocus();
    await user.click(comboboxButtonEl);
    expect(comboboxInputEl).toHaveFocus();
  });

  it("インプットに入力した文字に応じた候補が表示される", async () => {
    const user = userEvent.setup();
    const { container, getAllByRole } = render(
      <ComboBox
        label="ComboBox"
        items={[
          {
            id: "hoge",
            label: "hoge label",
          },
          {
            id: "foga",
            label: "fuga label",
          },
        ]}
      />
    );
    const comboboxInputEl = container.querySelector("input");
    act(() => {
      comboboxInputEl?.focus();
    });
    await user.keyboard("h");
    expect(getAllByRole("option")).toHaveLength(1);
  });

  it("候補を選択するとインプットに反映される", async () => {
    const user = userEvent.setup();
    const { container, getAllByRole } = render(
      <ComboBox label="ComboBox" items={ComboBoxItems} />
    );
    const comboboxInputEl = container.querySelector("input");
    const comboboxButtonEl = container.querySelector(
      "button"
    ) as HTMLButtonElement;
    await user.click(comboboxButtonEl);
    expect(getAllByRole("option")[0]).toHaveAttribute("aria-selected", "false");
    await user.click(getAllByRole("option")[0]);
    expect(comboboxInputEl).toHaveValue("comboBox1");
    // 再度候補を開いた時に選択状態が反映されていることの確認
    await user.click(comboboxButtonEl);
    expect(getAllByRole("option")[0]).toHaveAttribute("aria-selected", "true");
  });
});
