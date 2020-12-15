import React from "react";
import PopupWithForm from "./PopupWithForm";
import accept from "../images/accept.svg";
import notAccept from "../images/not-accept.svg"

function InfoTooltip (props) {
    return (
        <PopupWithForm name="info" display="none" isOpen={props.isOpen ? 'modal_open' : ''} onClose ={props.onClose} children={
            <>
                <img className="info__tooltip-image" src={props.infoTooltip.image ? accept : notAccept} alt="Картинка" />
                <h2 className="info__tooltip-title">{props.infoTooltip.text}</h2>
            </>
        } />
    );
}

export default InfoTooltip ;