import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import logo from "../../assets/wtwr-logo.svg";
import avatarImage from "../../assets/avatar.jpg";
import "./Header.css";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const Header = forwardRef(function Header(
  { handleOpenAddClothesModal, weatherData },
  ref
) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 630px)");

    const handleChange = (e) => {
      if (!e.matches) {
        setIsMenuOpen(false);
        setHasInteracted(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const now = new Date();
  const dateString = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  const toggleMenu = () => {
    if (!hasInteracted) setHasInteracted(true);
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useImperativeHandle(ref, () => ({ closeMenu }), [isMenuOpen]);

  return (
    <header className="header">
      <div className="header__section header__section_left">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
        <p className="header__date-location">
          <time dateTime={now} className="header__date">
            {dateString}
          </time>
          , {weatherData.city}
        </p>
      </div>
      <div className="header__section header__section_right">
        <button
          type="button"
          className={`header__menu-btn${isMenuOpen ? " header__menu-btn_active" : ""}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <div
          className={`header__menu${hasInteracted ? " header__menu_animated" : ""}${isMenuOpen ? " header__menu_open" : ""}`}
        >
          <ToggleSwitch onToggle={closeMenu} />
          <button
            onClick={() => {
              closeMenu();
              handleOpenAddClothesModal();
            }}
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <div className="header__user">
            <p className="header__username">Jason Dijols</p>
            <img
              src={avatarImage}
              alt="Jason Dijols' Avatar"
              className="header__avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
