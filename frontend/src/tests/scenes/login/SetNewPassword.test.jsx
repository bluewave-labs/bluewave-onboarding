import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../services/authProvider"; // Import your AuthProvider
import SetNewPassword from "../../../scenes/login/SetNewPassword";
import { resetPassword } from "../../../services/loginServices";

vi.mock("../../../services/loginServices", () => ({
  resetPassword: vi.fn(),
}));

describe("SetNewPasswordPage", () => {
  it("renders the set new password reset page", () => {
    render(
      <Router>
        <AuthProvider>
          <SetNewPassword />
        </AuthProvider>
      </Router>
    );

    expect(screen.getByText("Set new Password")).toBeTruthy();
    expect(
      screen.getByText(
        "Your new password must be different to previously used passwords."
      )
    ).toBeTruthy();
  });

  it("handles reset password success", async () => {
    resetPassword.mockResolvedValueOnce({ data: { success: true } });

    render(
      <Router>
        <AuthProvider>
          <SetNewPassword email="asdf@asdf.com" />
        </AuthProvider>
      </Router>
    );

    await act(async () => {
      const validPassword = "Test123!@";

      fireEvent.change(screen.getByPlaceholderText("Create your password"), {
        target: { value: validPassword },
      });
      fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
        target: { value: validPassword },
      });

      fireEvent.blur(screen.getByPlaceholderText("Create your password"));
      fireEvent.blur(screen.getByPlaceholderText("Confirm your password"));

      const resetButton = screen.getByText("Reset Password");
      fireEvent.click(resetButton);
    });

    expect(resetPassword).toHaveBeenCalledWith({
      email: "asdf@asdf.com",
      password: "Test123!@",
    });
  });

  it("handles reset password internal server error", async () => {
    resetPassword.mockRejectedValueOnce({
      response: {
        data: { error: "Internal Server Error" },
      },
    });

    render(
      <Router>
        <AuthProvider>
          <SetNewPassword email="asdf@asdf.com" />
        </AuthProvider>
      </Router>
    );

    await act(async () => {
      const validPassword = "Test123!@";

      fireEvent.change(screen.getByPlaceholderText("Create your password"), {
        target: { value: validPassword },
      });
      fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
        target: { value: validPassword },
      });

      fireEvent.blur(screen.getByPlaceholderText("Create your password"));
      fireEvent.blur(screen.getByPlaceholderText("Confirm your password"));

      fireEvent.click(screen.getByText("Reset Password"));
    });

    await waitFor(() => {
      expect(screen.getByText("Internal Server Error")).toBeTruthy();
    });

    expect(resetPassword).toHaveBeenCalledWith({
      email: "asdf@asdf.com",
      password: "Test123!@",
    });
  });
});
