import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/wtwr-logo.svg";
import "./Header.css";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Header = forwardRef(function Header(
  { onAddClothes, weatherData, isLoggedIn, onOpenRegister, onOpenLogin },
  ref,
) {
  const currentUser = useContext(CurrentUserContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const menuContainerRef = useRef(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

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

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, closeMenu]);

  useImperativeHandle(ref, () => ({ closeMenu }), [closeMenu]);

  const now = new Date();
  const dateString = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  const toggleMenu = () => {
    if (!hasInteracted) setHasInteracted(true);
    setIsMenuOpen((prev) => !prev);
  };

  const avatarInitial = currentUser?.name?.charAt(0)?.toUpperCase();

  return (
    <header className="header">
      <div className="header__section header__section_left">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="WTWR Logo" className="header__logo" />
        </Link>
        <p className="header__date-location">
          <time dateTime={now} className="header__date">
            {dateString}
          </time>
          , {weatherData.city}
        </p>
      </div>
      <div
        ref={menuContainerRef}
        className="header__section header__section_right"
      >
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
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  closeMenu();
                  onAddClothes();
                }}
                className="header__add-clothes-btn"
              >
                + Add clothes
              </button>
              <Link
                to="/profile"
                className="header__profile-link"
                onClick={closeMenu}
              >
                <div className="header__user">
                  <p className="header__username">{currentUser?.name}</p>
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={`${currentUser.name}'s Avatar`}
                      className="header__avatar"
                    />
                  ) : (
                    <span className="header__avatar_placeholder">
                      {avatarInitial}
                    </span>
                  )}
                </div>
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                className="header__auth-btn"
                onClick={() => {
                  closeMenu();
                  onOpenRegister();
                }}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="header__auth-btn"
                onClick={() => {
                  closeMenu();
                  onOpenLogin();
                }}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
