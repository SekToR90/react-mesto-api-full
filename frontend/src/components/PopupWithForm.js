import React from "react";
import closeIcon from '../images/close-icon.svg'

function PopupWithForm (props) {
    return (
        <div className={`modal modal_${props.name} ${props.isOpen}`}>
            <div className="modal__container">
                <button type="button" className="modal__close-button" onClick={props.onClose}>
                    <img className="modal__close" src={closeIcon} alt="Кнопка_выхода"/>
                </button>
                <h2 className={`modal__title modal__title_${props.display}`}>{props.title}</h2>
                <form action="#" name={props.name} className="modal__field" onSubmit={props.onSubmit} noValidate>
                    {props.children}
                    <button type="submit" className={`modal__button-save ${props.submitIsValid ? 'modal__button-save_disabled' : '' } modal__button-save_${props.display}`} disabled={props.submitIsValid}>{props.buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}


export default PopupWithForm ;