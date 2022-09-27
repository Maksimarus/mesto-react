import {useState, useEffect} from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/api';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const initialCards = await api.getInitialCards();
      setCards(initialCards);
    };
    fetchCards();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await api.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

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

  const handleUpdateUser = async ({name, about}) => {
    const newUserData = await api.updateUserInfo({name, about});
    setCurrentUser(newUserData);
    closeAllPopups();
  };
  const handleUpdateAvatar = async avatar => {
    const newUserData = await api.updateUserAvatar(avatar);
    setCurrentUser(newUserData);
    closeAllPopups();
  };
  const handleCardLike = async card => {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    const newCard = await api.changeLikeCardStatus(card._id, isLiked);
    setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
  };
  const handleCardDelete = async card => {
    await api.deleteCard(card._id);
    setCards(state => state.filter(c => c._id !== card._id));
  };
  const handleAddPlaceSubmit = async ({name, link}) => {
    const newCard = await api.postNewCard({name, link});
    setCards([newCard, ...cards]);
    closeAllPopups();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

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
    </CurrentUserContext.Provider>
  );
};

export default App;
