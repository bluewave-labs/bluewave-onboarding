import { fireEvent, render, screen } from "@testing-library/react";
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

const addNewLink = async (title, url, target) => {
  const addNewLinkBtn = await screen.findByText("+ Add new link");
  await act(async () => {
    fireEvent.click(addNewLinkBtn);
  });
  const settings = await screen.findByRole("form");
  expect(settings).to.exist;
  const inputs = settings.querySelectorAll("input");
  await act(async () => {
    fireEvent.change(inputs[1], { target: { value: title } });
    fireEvent.change(inputs[2], { target: { value: url } });
    if (target !== null) {
      fireEvent.change(inputs[3], {
        target: { value: target, checked: target },
      });
    }
    fireEvent.submit(settings);
  });
};

describe("Test Helper Link popup", () => {
  it("Tests if the popup is rendered correctly", async () => {
    await logIn();
    const { asFragment } = renderPopup();
    expect(asFragment).to.matchSnapshot();
  });
  it("should open the settings drawer when add new link is clicked", async () => {
    await logIn();
    renderPopup();
    const addNewLinkBtn = await screen.findByText("+ Add new link");
    await act(async () => {
      fireEvent.click(addNewLinkBtn);
    });
    const settings = await screen.findByRole("form");
    expect(settings).to.exist;
    const inputs = settings.querySelectorAll("input");
    expect(inputs).toHaveLength(4);
    expect(inputs[0]).toHaveProperty("name", "id");
    expect(inputs[1]).toHaveProperty("name", "title");
    expect(inputs[2]).toHaveProperty("name", "url");
    expect(inputs[3]).toHaveProperty("name", "target");
  });
  it("should add the new link to links list and to the preview when a new link is created", async () => {
    await logIn();
    renderPopup();
    await addNewLink("link 1", "http://link1.com.br");
    const links = await screen.findAllByText("link 1");
    expect(links).toHaveLength(2);
    expect(links[1]).toHaveProperty("href", "http://link1.com.br/");
  });
  it.todo("should change the order of the links on preview after drag");
  it.todo("should change the title on the preview when a title is typed");
  it.todo(
    "should change the background color of the header if the color is changed"
  );
  it.todo("should change the link text color if the color is changed");
  it.todo("should change the icon color if the color is changed");
});
