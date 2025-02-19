import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Menu from "./";

// 参考：https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/Menu.test.tsx

const MenuItems = [
  {
    id: "menu1",
    label: "menu1",
  },
  {
    id: "menu2",
    label: "menu2",
  },
  {
    id: "menu3",
    label: "menu3",
  },
];

describe("Menu", () => {
  /**
   * Propsの確認
   */
  it("labelの内容が反映される", () => {
    const { getByRole } = render(
      <Menu className="custom-class" label="Menu" items={MenuItems} />
    );
    const buttonEl = getByRole("button");
    expect(buttonEl).toHaveAttribute("aria-label", "Menu");
  });

  it("カスタムクラスが設定される", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <Menu className="custom-class" label="Menu" items={MenuItems} />
    );
    const buttonEl = getByRole("button");
    await user.click(buttonEl);
    const menuEl = getByRole("menu");
    expect(menuEl).toHaveClass("custom-class");
  });

  /**
   * 挙動の確認
   */
  it("onClickMenuに設定した関数が実行される", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    const { getByRole, getAllByRole } = render(
      <Menu label="Menu" items={MenuItems} onClickMenu={handleClick} />
    );
    const buttonEl = getByRole("button");
    await user.click(buttonEl);
    const menuItemEls = getAllByRole("menuitem");
    await user.click(menuItemEls[0]);
    expect(handleClick).toHaveBeenCalled();
  });
});
