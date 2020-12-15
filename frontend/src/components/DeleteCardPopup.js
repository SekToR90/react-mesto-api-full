import PopupWithForm from "./PopupWithForm";
import React from "react";


function DeleteCardPopup (props) {

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.handleCardDelete(props.cardId);
    }

    return (
        <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да" isOpen={props.isOpen ? 'modal_open' : ''} onClose ={props.onClose} onSubmit={handleSubmit}/>
    );
}

export default DeleteCardPopup;