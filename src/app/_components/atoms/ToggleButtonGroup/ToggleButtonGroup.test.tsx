import { render, RenderResult } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import ToggleButtonGroup, { Props as ToggleButtonGroupProps } from "./";

// 参考：https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/test/ToggleButtonGroup.test.js

const renderComponent = (props: ToggleButtonGroupProps): RenderResult => {
  return render(<ToggleButtonGroup {...props} />);
};

describe("ToggleButtonGroup", () => {
  it("ボタンの内容が反映される", () => {
    const { getAllByRole } = renderComponent({
      items: [
        {
          id: "button1",
          label: "button1",
        },
        {
          id: "button2",
          label: "button2",
          isDisabled: true,
        },
      ],
    });
    const toggleButtonEls = getAllByRole("radio");
    expect(toggleButtonEls[0].textContent).toBe("button1");
    expect(toggleButtonEls[1].textContent).toBe("button2");
    expect(toggleButtonEls[1]).toBeDisabled();
  });
});
