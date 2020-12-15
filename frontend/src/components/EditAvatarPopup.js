import PopupWithForm from "./PopupWithForm";
import React from "react";


function EditAvatarPopup (props) {
    const userAvatarRef = React.useRef();

    const [avatarIsValid , setAvatarIsValid ] = React.useState(false);
    const [avatarErrorMessage , setAvatarErrorMessage ] = React.useState('');

    function handleAvatarChange() {
        setAvatarErrorMessage(userAvatarRef.current.validationMessage);
        setAvatarIsValid(userAvatarRef.current.validationMessage ? false : true)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: userAvatarRef.current.value
        });

        userAvatarRef.current.value = '';
    }

    return (
        <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen ? 'modal_open' : ''} onClose ={props.onClose} onSubmit={handleSubmit} submitIsValid={!avatarIsValid} children={
            <>
                <input type="url" name="urlAvatar" className="modal__input modal__input_link-avatar"
                       placeholder="Ссылка на картинку" required autoComplete="off" ref={userAvatarRef} onChange={handleAvatarChange}/>
                <span className={`modal__error ${!avatarIsValid ? 'modal__error_visible' : '' }`} id="urlAvatar-error">{avatarErrorMessage}</span>
            </>
        }
        />
    );
}

export default EditAvatarPopup ;