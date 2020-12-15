import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import profilePencil from '../images/profile-pencil.svg'
import buttonAdd from '../images/button-add.svg'

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <button type="button" className="profile__edit-avatar" onClick={props.onEditAvatar}>
                        <img className="profile__avatar" src={`${currentUser.avatar}`} alt="Аватар"  />
                        <div className="profile__overlay"></div>
                    </button>
                    <div className="profile__info">
                        <div className="profile__info-button">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
                                <img className="profile__edit-img" src={profilePencil} alt="Кнопка_редактирования"/>
                            </button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
                    <img className="profile__add-img" src={buttonAdd} alt="Кнопка_добавления"/>
                </button>
            </section>

            <section className="elements">
                {props.cards.map((item) => (
                        <Card {...item} key={item._id}  onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                    ))}
            </section>
        </main>
    );
}

export default Main;