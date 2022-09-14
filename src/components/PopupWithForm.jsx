import React from 'react';

const PopupWithForm = ({children, name, title, isOpen, onClose}) => {
  return (
    <div className={`popup popup_role_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <form name="form-profile" className="popup__form">
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="button popup__button" type="submit">
            Сохранить
          </button>
        </form>
        <button
          type="button"
          className="button popup__close-button"
          onClick={onClose}></button>
      </div>
    </div>
  );
};

export default PopupWithForm;
