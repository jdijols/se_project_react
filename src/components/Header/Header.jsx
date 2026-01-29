import logo from "../../assets/wtwr-logo.svg";
import avatarImage from "../../assets/avatar.jpg";
import "./Header.css";

function Header({ handleOpenAddClothesModal }) {
  const now = new Date();
  const dateString = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={logo} alt="WTWR Logo" className="header__logo" />
      <p className="header__date-location">
        <time dateTime={now} className="header__date">
          {dateString}
        </time>
        , Austin
      </p>
      <button onClick={handleOpenAddClothesModal} className="header__add-clothes-btn">+ Add clothes</button>
      <p className="header__username">Jason Dijols</p>
      <img
        src={avatarImage}
        alt="Jason Dijols' Avatar"
        className="header__avatar"
      />
    </header>
  );
}

export default Header;
