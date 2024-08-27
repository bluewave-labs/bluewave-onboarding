import React from "react";
import Button from "../../components/Button/Button";
import List from "../../components/TourComponents/List/List";
import HomePageTemplate from "../../templates/HomePageTemplate/HomePageTemplate";
import HintDefaultPage from "./HintDefaultPage";
import "./HintPage.css";
import { useNavigate } from "react-router-dom";

const hintsData = [
  {
    idItem: 184293,
    title: "Main dashboard - feature hint",
    text: "This pops up the first time a user logs in to the dashboard.",
  },
  {
    idItem: 194294,
    title: "Main dashboard - password hint",
    text: "This pops up the first time a user logs in to the dashboard.",
  },
];

const HintPage = () => {
  const navigate = useNavigate();
  if (hintsData.length === 0) {
    return <HintDefaultPage />;
  } else {
    return (
      <HomePageTemplate>
        <div className="hint-page-container">
          <div className="hint-page-left-section">
            <h2 className="hint-page-title" style={{ marginBottom: "16px" }}>All Hints</h2>
            <List items={hintsData} onSelectItem={() => { }} />
          </div>
          <div className="hint-right-content">
            <Button
              style={{ height: "34px", width: "172px" }}
              text="Create a new hint"
              variant="contained"
              onClick={() => navigate("/hint-default")}
            />
            <div className="hint-info">
              <h2 className="hint-info-title">What is a hint?</h2>
              <p>
                Hints are like friendly reminders in an app, giving tips
                without stopping what you are doing. They show up at small
                bubbles near buttons or menus, guiding you on how to use
                things.
              </p>
              <p>
                One good thing about hints is they help you use the app
                better by giving tips when you need them. For example, they
                can show clear instructions when you're trying something
                new, so you don't get stuck or confused.
              </p>
              <p>
                Hints work for everyone, from beginners to experts. They
                give basic tips for people just starting out and clever
                tricks for those who know the app well. This makes the app
                easier for everyone to use.
              </p>
            </div>
          </div>
        </div>
      </HomePageTemplate>
    );
  }
};

export default HintPage;
