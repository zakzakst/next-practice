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
    const comboboxButtonEl = container.querySelector(
      "button"
    ) as HTMLButtonElement;
    await user.click(comboboxButtonEl);
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
});
