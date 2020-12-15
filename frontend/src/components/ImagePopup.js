import React from "react";
import closeIcon from '../images/close-icon.svg'


function ImagePopup(props) {

    return (
    <div className={`modal modal_image-card ${props.isOpen  ? 'modal_open' : ''}`}>
        <div className="modal__container-image">
            <button type="button" className="modal__close-button" onClick={props.onClose}>
                <img className="modal__close" src={closeIcon} alt="Кнопка_выхода"/>
            </button>
            <img className="modal__image-open" src={props.card.link} alt=""/>
            <h3 className="modal__title-open">{props.card.name}</h3>
        </div>
    </div>
    );
}

export default ImagePopup ;