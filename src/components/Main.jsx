import React, {useEffect, useState} from 'react';
import Api from '../utils/api';
import Card from './Card';

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) => {
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Api.getInitialData().then(([user, cards]) => {
      setUserAvatar(user.avatar);
      setUserName(user.name);
      setUserDescription(user.about);
      setCards(cards);
    });
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
          <img src={userAvatar} alt="Аватар пользователя" className="profile__avatar" />
          <span className="profile__avatar-edit"></span>
        </div>

        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__name">{userName}</h1>
            <button
              type="button"
              className="profile__edit-button button"
              onClick={onEditProfile}></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__add-button button"
          onClick={onAddPlace}></button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map(card => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
