import React, {useState} from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = card => {
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <input
          name="avatarInput"
          className="popup__input"
          type="url"
          id="avatar-input"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__input-error avatar-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <input
          name="nameInput"
          className="popup__input"
          type="text"
          id="name-input"
          placeholder="Ваше имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__input-error name-input-error"></span>
        <input
          name="jobInput"
          className="popup__input"
          type="text"
          id="job-input"
          placeholder="Ваша профессия"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__input-error job-input-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
        <input
          name="placeTitleInput"
          className="popup__input"
          type="text"
          id="placeTitle-input"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__input-error placeTitle-input-error"></span>
        <input
          name="placeUrlInput"
          className="popup__input"
          type="url"
          id="placeUrl-input"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error placeUrl-input-error"></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      {/* <PopupWithForm name='' title='' isOpen={}>

		</PopupWithForm> */}

      <div className="popup popup_role_delete-card">
        <div className="popup__container">
          <form className="popup__form">
            <h2 className="popup__title popup__title_role_delete-card">Вы уверены?</h2>
            <button type="submit" className="button popup__button">
              Да
            </button>
          </form>
          <button type="button" className="button popup__close-button"></button>
        </div>
      </div>
    </div>
  );
};

export default App;
