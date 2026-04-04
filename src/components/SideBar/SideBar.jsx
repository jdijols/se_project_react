import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onLogout, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarInitial = currentUser?.name?.charAt(0)?.toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        <p className="sidebar__username header__username">
          {currentUser?.name}
        </p>
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={`${currentUser.name}'s Avatar`}
            className="sidebar__avatar header__avatar"
          />
        ) : (
          <span className="sidebar__avatar_placeholder">{avatarInitial}</span>
        )}
      </div>
      <button className="sidebar__btn" type="button" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__btn" type="button" onClick={onLogout}>
        Log out
      </button>
    </aside>
  );
}

export default SideBar;
