import React from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup (props) {
    const [cardName , setCardName ] = React.useState('');
    const [cardNameIsValid , setCardNameIsValid ] = React.useState(false);
    const [cardNameErrorMessage , setCardNameErrorMessage ] = React.useState('');

    const [link , setLink ] = React.useState('');
    const [linkIsValid , setLinkIsValid ] = React.useState(false);
    const [linkErrorMessage , setLinkErrorMessage ] = React.useState('');

    function handleNameChange(e) {
        setCardName(e.target.value);
        setCardNameErrorMessage(e.target.validationMessage);
        setCardNameIsValid(e.target.validationMessage ? false : true)
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
        setLinkErrorMessage(e.target.validationMessage);
        setLinkIsValid(e.target.validationMessage ? false : true)
    }

    function resetAllInput () {
        setCardName('');
        setLink('');
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
            name: cardName,
            link: link
        });

        resetAllInput();
    }

    return (
        <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={props.isOpen ? 'modal_open' : ''} onClose ={props.onClose} onSubmit={handleSubmit} submitIsValid={!cardNameIsValid || !linkIsValid} children={
            <>
                <input type="text" name="plase" className="modal__input modal__input_plase" placeholder="Название" required
                       minLength="1" maxLength="30" autoComplete="off" value={cardName} onChange={handleNameChange}/>
                <span className={`modal__error ${!cardNameIsValid ? 'modal__error_visible' : '' }`} id="plase-error">{cardNameErrorMessage}</span>

                <input type="url" name="url" className="modal__input modal__input_link" placeholder="Ссылка на картинку"
                       required autoComplete="off" value={link} onChange={handleLinkChange}/>
                <span className={`modal__error ${!linkIsValid ? 'modal__error_visible' : '' }`} id="url-error">{linkErrorMessage}</span>
            </>
        }
        />
    );
}

export default AddPlacePopup  ;