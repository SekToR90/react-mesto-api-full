import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext"


function Card({name, link, likes, owner, _id, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? '' : 'element__delete_inactive'}`
    );
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    );


    function handleClick() {
         onCardClick({name, link});
    }

    function handleLikeClick() {
        onCardLike({_id, likes});
    }

    function handleDeleteClick() {
        onCardDelete(_id);
    }

    return (
        <div className="element">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img className="element__img" src={`${link}`} alt={`${name}`} onClick={handleClick} />
            <div className="element__group">
                <h2 className="element__title">{name}</h2>
                <div>
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <h3 className="element__like_title">{likes.length}</h3>
                </div>
            </div>
        </div>
    );
}

export default Card ;