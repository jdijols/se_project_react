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
    </aside>
  );
}

export default SideBar;