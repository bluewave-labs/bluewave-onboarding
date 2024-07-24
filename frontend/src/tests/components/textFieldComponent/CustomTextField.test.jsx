import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomTextField from "../../../components/TextFieldComponents/CustomTextField";

describe("CustomTextField", () => {
  it("should render the text field with the provided label", () => {
    render(<CustomTextField label="Test Label" />);
    const textField = screen.getByLabelText(/test label/i);
    expect(textField).toBeDefined();
  });

  it("should render the helper text when provided", () => {
    render(<CustomTextField label="Test Label" helperText="Help text" />);
    const helperText = screen.getByText(/help text/i);
    expect(helperText).toBeDefined();
  });

  it("should show an error message when error prop is true", () => {
    render(
      <CustomTextField
        label="Test Label"
        error
        helperText="This is an error message"
      />
    );
    const errorMessage = screen.getByText(/This is an error message/i);
    expect(errorMessage).toBeDefined();
    const styles = getComputedStyle(errorMessage);
    expect(styles.color).toBe("rgb(211, 47, 47)");
  });

  it("should render start adornment when provided", () => {
    render(<CustomTextField label="Test Label" startAdornment="http://" />);
    const startAdornment = screen.getByText(/http:\/\//i);
    expect(startAdornment).toBeDefined();
  });

  it("should render end adornment when provided", () => {
    render(
      <CustomTextField
        label="Test Label"
        endAdornment={<button>Copy</button>}
      />
    );
    const endAdornment = screen.getByText(/copy/i);
    expect(endAdornment).toBeDefined();
  });

  it("should render chips when provided", () => {
    const chips = [{ label: "Design", onDelete: () => {} }];
    render(<CustomTextField label="Test Label" chips={chips} />);
    const chip = screen.getByText(/design/i);
    expect(chip).toBeDefined();
  });

  it("should allow the user to enter text", () => {
    render(<CustomTextField label="Test Label" />);
    const textField = screen.getByLabelText(/test label/i);
    fireEvent.change(textField, { target: { value: "User input" } });
    expect(textField.value).toBe("User input");
  });
});
