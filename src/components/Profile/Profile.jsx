import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  onCardClick,
  onAddClothes,
  onLogout,
  onEditProfile,
  onCardLike,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <SideBar onLogout={onLogout} onEditProfile={onEditProfile} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClothes={onAddClothes}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;
