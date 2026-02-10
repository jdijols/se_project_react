import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, handleOpenItemModal, handleOpenAddClothesModal }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection clothingItems={clothingItems} handleOpenItemModal={handleOpenItemModal} handleOpenAddClothesModal={handleOpenAddClothesModal} />
    </div>
  );
}

export default Profile;
