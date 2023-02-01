import "../Styles/Header.css";
import { useState } from "react";

export const Header = () => {
  const [menuClass, setMenuClass] = useState("");
  const [listClass, setListClass] = useState("hidden");

  const menuClickHandler = () => {
    if (menuClass === "") {
      setMenuClass("changed");
      setListClass("showing");
      console.log("the menu icon should be an x and the options should show");
    } else {
      setMenuClass("");
      setListClass("hidden");
      console.log(
        "the menu should be a hamburger and the options should be hidden"
      );
    }
  };

  return (
    <header className="Header">
      <img
        src={require("../Images/Header/BOFA-logo-colored.png")}
        alt="bank of america logo"
        id="header-logo"
      />

      <nav>
        <div id="container" className={menuClass} onClick={menuClickHandler}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
          <ul className={listClass} id="drop-down-ul">
            <a href="#">
              <li>Resources</li>
            </a>
            <a href="#">
              <li>Mentor</li>
            </a>
            <a href="#">
              <li>About Us</li>
            </a>
          </ul>
        </div>

        <ul id="static-ul">
          <a href="#">
            <li>Resources</li>
          </a>
          <a href="#">
            <li>Mentor</li>
          </a>
          <a href="#">
            <li>About Us</li>
          </a>
        </ul>

        <section className="icon-container">
          <img
            src={require("../Images/Header/search-icon.png")}
            alt="search icon"
          />
          <img
            src={require("../Images/Header/profile-icon.png")}
            alt="profile icon"
          />
        </section>
      </nav>
    </header>
  );
};
