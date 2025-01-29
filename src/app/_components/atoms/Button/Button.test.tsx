import { useState } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./";

describe("Button", () => {
  /**
   * Propsの確認
   */
  it("ボタンのテキストが表示される", () => {
    const { getByRole } = render(<Button>ボタン</Button>);
    const buttonEl = getByRole("button");
    expect(buttonEl.textContent).toBe("ボタン");
  });

  it("アイコンが挿入される", () => {
    const { getByRole, getByText } = render(
      <Button icon={<span>アイコン</span>}>ボタン</Button>
    );
    const buttonEl = getByRole("button");
    const iconEl = getByText("アイコン");
    expect(buttonEl).toHaveAttribute("data-has-icon", "true");
    expect(iconEl).toBeInTheDocument();
  });

  it("待機状態が設定される", () => {
    const { getByRole, container } = render(<Button isPending>ボタン</Button>);
    const buttonEl = getByRole("button");
    const loadingEl = container.querySelector("span");
    expect(buttonEl).toHaveAttribute("data-pending", "true");
    expect(buttonEl).toHaveAttribute("aria-disabled", "true");
    expect(loadingEl?.textContent).toBe("...");
  });

  it("無効状態が設定される", () => {
    const { getByRole } = render(<Button isDisabled>ボタン</Button>);
    const buttonEl = getByRole("button");
    expect(buttonEl).toBeDisabled();
  });

  it("カスタムクラスが設定される", () => {
    const { getByRole } = render(
      <Button className="custom-class">ボタン</Button>
    );
    const buttonEl = getByRole("button");
    expect(buttonEl).toHaveClass("custom-class");
  });

  /**
   * 挙動の確認
   */
  it("タブ移動でフォーカスされる", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<Button>ボタン</Button>);
    const buttonEl = getByRole("button");

    expect(buttonEl).not.toHaveFocus();

    await user.tab();
    expect(buttonEl).toHaveFocus();

    await user.tab();
    expect(buttonEl).not.toHaveFocus();
  });

  it("フォーム送信が正しく挙動する", async () => {
    const user = userEvent.setup();
    const onSubmitSpy = jest.fn((e) => e.preventDefault());

    // eslint-disable-next-line
    const TestComponent = (props: any) => {
      const [pending, setPending] = useState(false);
      return (
        <form
          onSubmit={(e) => {
            props.onSubmit(e);
          }}
        >
          <Button
            type="submit"
            isPending={pending}
            onPress={() => setPending(true)}
          >
            送信
          </Button>
        </form>
      );
    };
    const { container } = render(<TestComponent onSubmit={onSubmitSpy} />);

    await user.tab();
    await user.keyboard("{Enter}");
    expect(onSubmitSpy).toHaveBeenCalled();
    onSubmitSpy.mockClear();

    // 待機状態時の挙動
    await user.keyboard("{Enter}");
    expect(onSubmitSpy).not.toHaveBeenCalled();
    const loadingEl = container.querySelector("span");
    expect(loadingEl?.textContent).toBe("...");
  });
});
