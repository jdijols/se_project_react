import { Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../Modals/ItemModal";
import AddItemModal from "../Modals/AddItemModal";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
import RegisterModal from "../Modals/RegisterModal";
import LoginModal from "../Modals/LoginModal";
import EditProfileModal from "../Modals/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import "./App.css";
import { getWeatherData } from "../../utils/weatherApi";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signup, signin, getUserMe, updateUserMe } from "../../utils/auth";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: "-", C: "-" },
    weatherCondition: "clouds",
    isDay: true,
  });

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState(false);

  const headerRef = useRef(null);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  function handleTempUnitChange() {
    if (currentTempUnit === "F") {
      setCurrentTempUnit("C");
    } else {
      setCurrentTempUnit("F");
    }
  }

  function handleOpenItemModal(card) {
    headerRef.current?.closeMenu();
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddClothesModal() {
    setActiveModal("add-clothes-modal");
  }

  function handleOpenRegisterModal() {
    setActiveModal("register-modal");
  }

  function handleOpenLoginModal() {
    setLoginError(false);
    setActiveModal("login-modal");
  }

  function handleOpenEditProfileModal() {
    setActiveModal("edit-profile-modal");
  }

  function handleCloseModal() {
    setActiveModal("");
    setTimeout(() => setSelectedCard({}), 300);
  }

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      handleCloseModal();
    }
  };

  function handleOpenConfirmationModal() {
    setActiveModal("confirm-delete-modal");
  }

  function handleDeleteItem() {
    const token = localStorage.getItem("jwt");
    deleteClothingItem(selectedCard._id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id),
        );
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleAddItemSubmit(inputValues, resetForm) {
    const token = localStorage.getItem("jwt");
    addClothingItem(inputValues, token)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
        resetForm();
      })
      .catch(console.error);
  }

  function handleRegister(values, resetForm) {
    signup(values)
      .then(() => {
        return signin({ email: values.email, password: values.password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return getUserMe(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleCloseModal();
        resetForm();
      })
      .catch(console.error);
  }

  function handleLogin(values, resetForm) {
    setLoginError(false);
    signin(values)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return getUserMe(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleCloseModal();
        resetForm();
      })
      .catch(() => {
        setLoginError(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
  }

  function handleEditProfile(values, resetForm) {
    const token = localStorage.getItem("jwt");
    updateUserMe(values, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
        resetForm();
      })
      .catch(console.error);
  }

  function handleCardLike({ id, isLiked }) {
    const token = localStorage.getItem("jwt");
    const apiCall = isLiked ? removeCardLike : addCardLike;
    apiCall(id, token)
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsAuthLoading(false);
      return;
    }

    getUserMe(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }, []);

  return (
    <CurrentTempUnitContext.Provider
      value={{ currentTempUnit, handleTempUnitChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <div className="app__content">
            <Header
              ref={headerRef}
              weatherData={weatherData}
              onAddClothes={handleOpenAddClothesModal}
              isLoggedIn={isLoggedIn}
              onOpenRegister={handleOpenRegisterModal}
              onOpenLogin={handleOpenLoginModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardClick={handleOpenItemModal}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isAuthLoading}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleOpenItemModal}
                      onAddClothes={handleOpenAddClothesModal}
                      onLogout={handleLogout}
                      onEditProfile={handleOpenEditProfileModal}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
            <ItemModal
              card={selectedCard}
              isOpen={activeModal === "item-modal"}
              onClose={handleCloseModal}
              onDeleteClick={handleOpenConfirmationModal}
              onOverlayClick={handleOverlayClick}
            />
            <ConfirmDeleteModal
              isOpen={activeModal === "confirm-delete-modal"}
              onClose={handleCloseModal}
              onConfirm={handleDeleteItem}
              onOverlayClick={handleOverlayClick}
            />
            <AddItemModal
              isOpen={activeModal === "add-clothes-modal"}
              onClose={handleCloseModal}
              onOverlayClick={handleOverlayClick}
              onAddItemSubmit={handleAddItemSubmit}
            />
            <RegisterModal
              isOpen={activeModal === "register-modal"}
              onClose={handleCloseModal}
              onOverlayClick={handleOverlayClick}
              onRegister={handleRegister}
              onSwitchToLogin={handleOpenLoginModal}
            />
            <LoginModal
              isOpen={activeModal === "login-modal"}
              onClose={handleCloseModal}
              onOverlayClick={handleOverlayClick}
              onLogin={handleLogin}
              onSwitchToRegister={handleOpenRegisterModal}
              loginError={loginError}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile-modal"}
              onClose={handleCloseModal}
              onOverlayClick={handleOverlayClick}
              onEditProfile={handleEditProfile}
              currentUser={currentUser}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTempUnitContext.Provider>
  );
}

export default App;
