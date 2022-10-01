import {useState} from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({isOpen, onClose, onAddPlace, isLoading}) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangeLink = e => {
    setLink(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onAddPlace({name, link});
  };

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isLoading={isLoading}>
      <input
        name="placeTitleInput"
        className="popup__input"
        type="text"
        id="placeTitle-input"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={onChangeName}
      />
      <span className="popup__input-error placeTitle-input-error"></span>
      <input
        name="placeUrlInput"
        className="popup__input"
        type="url"
        id="placeUrl-input"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={onChangeLink}
      />
      <span className="popup__input-error placeUrl-input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
