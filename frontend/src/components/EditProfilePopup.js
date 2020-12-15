import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";




function EditProfilePopup (props) {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    const [name , setName ] = React.useState('');
    const [nameIsValid , setNameIsValid ] = React.useState(true);
    const [nameErrorMessage , setNameErrorMessage ] = React.useState('');

    const [description , setDescription ] = React.useState('');
    const [descriptionIsValid , setDescriptionIsValid ] = React.useState(true);
    const [descriptionErrorMessage , setDescriptionErrorMessage ] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
        setNameErrorMessage(e.target.validationMessage);
        setNameIsValid(e.target.validationMessage ? false : true)
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
        setDescriptionErrorMessage(e.target.validationMessage);
        setDescriptionIsValid(e.target.validationMessage ? false : true)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    function resetAllInput () {
        setNameIsValid(true)
        setNameErrorMessage('');

        setDescriptionIsValid(true)
        setDescriptionErrorMessage('');
    }

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        resetAllInput();
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen ? 'modal_open' : ''} onClose ={props.onClose} onSubmit={handleSubmit}  submitIsValid={!nameIsValid || !descriptionIsValid} children={
            <>
                <input type="text" name="name" className="modal__input modal__input_name" placeholder="Имя" required minLength="2" maxLength="40" autoComplete="off" value={name} onChange={handleNameChange}/>
                <span className={`modal__error ${!nameIsValid ? 'modal__error_visible' : '' }`} id="name-error">{nameErrorMessage}</span>

                <input type="text" name="aboutMe" className="modal__input modal__input_about-me" placeholder="О себе" required minLength="2" maxLength="200" autoComplete="off" value={description} onChange={handleDescriptionChange}/>
                <span className={`modal__error ${!descriptionIsValid ? 'modal__error_visible' : '' }`} id="aboutMe-error">{descriptionErrorMessage}</span>
            </>
        }
        />
    );
}


export default EditProfilePopup ;