import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../../../scenes/login/LoginPage";

describe("LoginPage", () => {
  it("should render the login form with email and password inputs", () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText(/email:/i);
    const passwordInput = screen.getByLabelText(/password:/i);
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  it("should allow the user to enter an email", () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText(/email:/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  it("should allow the user to enter a password", () => {
    render(<LoginPage />);
    const passwordInput = screen.getByLabelText(/password:/i);
    fireEvent.change(passwordInput, { target: { value: "password" } });
    expect(passwordInput.value).toBe("password");
  });

  it("should toggle the remember me checkbox", () => {
    render(<LoginPage />);
    const rememberMeCheckbox = screen.getByLabelText(/remember for 30 days/i);
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox.checked).toBe(true);
  });

  it("should have a sign-in button", () => {
    render(<LoginPage />);
    const signInButton = screen.getByRole("button", { name: "Sign in" });
    expect(signInButton).toBeDefined();
  });
});
