import React from 'react';

const ImagePopup = ({card, onClose}) => {
  return (
    <div className={`popup popup_role_open-image ${card && 'popup_opened'}`}>
      <div className="popup-image">
        <figure className="popup-image__figure">
          <img className="popup-image__img" src={card && card.link} alt="" />
          <figcaption className="popup-image__figcaption">{card && card.name}</figcaption>
        </figure>
        <button
          type="button"
          className="button popup__close-button"
          onClick={onClose}></button>
      </div>
    </div>
  );
};

export default ImagePopup;
