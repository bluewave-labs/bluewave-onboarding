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

const renderPopup = async () => {
  await logIn();
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

const openAppearance = async () => {
  const appearanceBtn = await screen.findByRole("button", { name: "Appearance" });
  await act(async () => {fireEvent.click(appearanceBtn);})
};

describe("Test Helper Link popup", () => {
  it("Tests if the popup is rendered correctly", async () => {
    const { asFragment } = await renderPopup();
    expect(asFragment).to.matchSnapshot();
  });
  it("should open the settings drawer when add new link is clicked", async () => {
    await renderPopup();
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
    await renderPopup();
    await addNewLink("link 1", "http://link1.com.br");
    const links = await screen.findAllByText("link 1");
    expect(links).toHaveLength(2);
    expect(links[1]).toHaveProperty("href", "http://link1.com.br/");
  });
  it.skip("should change the order of the links on preview after drag", async () => {
    await renderPopup();
    await addNewLink("link 1", "http://link1.com.br");
    await addNewLink("link 2", "http://link2.com.br");
    await addNewLink("link 3", "http://link3.com.br");
    const links = await screen.findAllByText(/link \d/, { selector: "span" });
    const linksContainer = links[0].parentElement;
    expect(links).toHaveLength(3);
    expect(links.map((it) => it.innerHTML)).toEqual([
      "link 1",
      "link 2",
      "link 3",
    ]);
    fireEvent.mouseDown(links[0], { which: 1, button: 0 });
    fireEvent.dragStart(links[0]);
    fireEvent.dragOver(links[2]);
    fireEvent.drop(linksContainer);
    fireEvent.mouseUp(linksContainer, { which: 1, button: 0 });
    const updatedLinks = await screen.findAllByText(/link \d/, {
      selector: "span",
    });
    expect(updatedLinks).toHaveLength(3);
    expect(updatedLinks.map((it) => it.innerHTML)).not.toEqual([
      "link 1",
      "link 2",
      "link 3",
    ]);
  });
  it("should display the appearance form when the button is clicked", async () => {
    await renderPopup();
    await openAppearance();
    const inputs = (await screen.findByRole('form')).querySelectorAll('input')

    expect(inputs).toHaveLength(4)
    expect(inputs[0]).toHaveProperty('name', 'title')
    expect(inputs[1]).toHaveProperty('name', 'headerBackgroundColor')
    expect(inputs[2]).toHaveProperty('name', 'linkFontColor')
    expect(inputs[3]).toHaveProperty('name', 'iconColor')
  });
  it("should change the title on the preview when a title is typed", async () => {
    await renderPopup();
    await openAppearance();
    const titleInput = await screen.findByRole('textbox')
    fireEvent.change(titleInput, { target: { value: "Title" } });
    const preview = await screen.findByText("Title");
    expect(preview).to.exist;
  });
  it.todo(
    "should change the background color of the header if the color is changed"
  );
  it.todo("should change the link text color if the color is changed");
  it.todo("should change the icon color if the color is changed");
});
