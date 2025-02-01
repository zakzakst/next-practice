import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FileTrigger from "./";

// 参考：https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/FileTrigger.test.js

describe("FileTrigger", () => {
  /**
   * Propsの確認
   */
  it("ボタンの内容が反映される", () => {
    const { getByRole } = render(<FileTrigger>ボタン</FileTrigger>);
    const buttonEl = getByRole("button");
    expect(buttonEl.textContent).toBe("ボタン");
  });

  it("無効状態が設定される", () => {
    const { getByRole } = render(<FileTrigger isDisabled>ボタン</FileTrigger>);
    const buttonEl = getByRole("button");
    expect(buttonEl).toBeDisabled();
  });

  it("カスタムクラスが設定される", () => {
    const { container } = render(
      <FileTrigger className="custom-class">ボタン</FileTrigger>
    );
    const fileTriggerEl = container.querySelector("div");
    expect(fileTriggerEl).toHaveClass("custom-class");
  });

  it("受付ファイル制限が設定される", () => {
    const { container } = render(
      <FileTrigger acceptedFileTypes={["image/png"]}>ボタン</FileTrigger>
    );
    const inputEl = container.querySelector("input");
    expect(inputEl).toHaveAttribute("accept", "image/png");
  });

  it("複数選択可能が設定される", () => {
    const { container } = render(
      <FileTrigger allowsMultiple>ボタン</FileTrigger>
    );
    const inputEl = container.querySelector("input");
    expect(inputEl).toHaveAttribute("multiple");
  });

  it("ディレクトリ選択可能が設定される", () => {
    const { container } = render(
      <FileTrigger acceptDirectory>ボタン</FileTrigger>
    );
    const inputEl = container.querySelector("input");
    expect(inputEl).toHaveAttribute("webkitdirectory");
  });

  /**
   * 挙動の確認
   */
  it("ファイル選択が正しく挙動する", async () => {
    const onSelect = jest.fn();
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    const { container } = render(
      <FileTrigger onSelect={() => onSelect()}>ボタン</FileTrigger>
    );
    const inputEl = container.querySelector("input") as HTMLInputElement;

    await userEvent.upload(inputEl, file);
    const inputElFiles = inputEl.files as FileList;
    expect(inputElFiles[0]).toStrictEqual(file);
    expect(inputElFiles.item(0)).toStrictEqual(file);
    expect(inputElFiles).toHaveLength(1);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
