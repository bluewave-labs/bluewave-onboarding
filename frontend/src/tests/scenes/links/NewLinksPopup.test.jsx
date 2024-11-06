import { render } from "@testing-library/react";
import { act } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import NewLinksPopup from "../../../scenes/links/NewLinksPopup";
import { AuthProvider } from "../../../services/authProvider";
import HelperLinkProvider from "../../../services/linksProvider";
import * as loginServices from "../../../services/loginServices";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(), // Mock useNavigate to avoid actual routing
  };
});

vi.mock("../../../services/loginServices");
vi.mock("../../../services/helperLinkService");
vi.mock("../../../services/linkService");

const logIn = async () => {
  vi.spyOn(loginServices, "signUp").mockResolvedValueOnce({
    token: "mockAuthToken",
  });

  await act(async () => {
    await loginServices.signUp({
      name: "test",
      surname: "user",
      email: "test_user@example.com",
      password: "password123",
    });
    localStorage.setItem("authToken", "mockAuthToken");
  });
};

const renderPopup = () => {
  return render(
    <Router>
      <AuthProvider>
        <HelperLinkProvider>
          <NewLinksPopup
            currentHelper={{
              title: "",
              headerBackgroundColor: "#F8F9F8",
              linkFontColor: "#344054",
              iconColor: "#7F56D9",
            }}
          />
        </HelperLinkProvider>
      </AuthProvider>
    </Router>
  );
};

describe("Test Helper Link popup", () => {
  it("Tests if the popup is rendered correctly", async () => {
    await logIn();
    const { asFragment } = renderPopup();
    expect(asFragment).to.matchSnapshot();
  });
  it.todo("should open the settings drawer when add new link is clicked");
  it.todo(
    "should add thee new link to links list and to the preview when a new link is created"
  );
  it.todo("should change the order of the links on preview after drag");
  it.todo("should change the title on the preview when a title is typed");
  it.todo(
    "should change the background color of the header if the color is changed"
  );
  it.todo("should change the link text color if the color is changed");
  it.todo("should change the icon color if the color is changed");
});
