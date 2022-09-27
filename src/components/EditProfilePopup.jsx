import {useContext, useState, useEffect} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangeDescription = e => {
    setDescription(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}>
      <input
        name="nameInput"
        className="popup__input"
        type="text"
        id="name-input"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={onChangeName}
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
        value={description}
        onChange={onChangeDescription}
      />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
