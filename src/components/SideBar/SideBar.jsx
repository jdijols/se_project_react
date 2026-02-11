import "./SideBar.css";
import "../Header/Header.css";
import avatarImage from "../../assets/avatar.jpg";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user header__user">
        <p className="sidebar__username header__username">Jason Dijols</p>
        <img
          src={avatarImage}
          alt="Jason Dijols' Avatar"
          className="sidebar__avatar header__avatar"
        />
      </div>
      <button className="sidebar__btn">Change profile data</button>
      <button className="sidebar__btn" type="button">
        Log out
      </button>
    </aside>
  );
}

export default SideBar;
