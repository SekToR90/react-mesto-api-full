import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup'
import {CurrentUserContext} from "../contexts/CurrentUserContext"
import api from "../utils/Api";
import * as mestoAuth from "../utils/mestoAuth"
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";


function App() {
    // Переменные, отвечающие за видимость модалок
    const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
    const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
    const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
    const [ isImagePopupOpen, setIsImagePopupOpen ] = React.useState(false);
    const [ isDeleteCardPopup, setDeleteCardPopup ] = React.useState(false);
    const [ isInfoTooltip, setIsInfoTooltip] = React.useState(false); // Стейт для открытия/закрытия модалки сообщения об ошибке
    const [cardId, setCardId] = React.useState({});
    const [selectedCard, setSelectedCard] = React.useState({});

    const [ currentUser, setCurrentUser ] = React.useState({
        name: '',
        about: '',
        avatar: ''
    });
    const [ cards, setCards ] = React.useState([]);

    const [ loggedIn, setLoggedIn] = React.useState(false); //Стейт проверки авторизован ли пользователь
    const [ email, setEmail] = React.useState( ''); //Стейт с данными о email
    const [ infoTooltip, setInfoTooltip] = React.useState({}); //Стейт изменяет картинку и текст в модалке сообщения ошибке
    const history = useHistory();
    //

    React.useEffect(() =>{
        tokenCheck();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        api.getUserMe()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log(err);
            });
        api.getAllCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //Регистрация и авторизация
    const handleRegister = (email, password) => {   //Регистрация

        mestoAuth.register(email, password)
            .then(() => {
                setInfoTooltip({
                    image: true,
                    text: 'Вы успешно зарегистрировались!'
                });
                setIsInfoTooltip(true);
                history.push('/sign-in');
            })
            .catch((err) => {
                if (err.status === 400) {
                    console.log('Hекорректно заполнено одно из полей')
                } else {
                    console.log(err)
                }
                setInfoTooltip({
                    image: false,
                    text: 'Что-то пошло не так! Попробуйте ещё раз.'
                });
                setIsInfoTooltip(true);
            })
    }

    const handleLogin =(email, password) => {
        mestoAuth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setEmail(email);
                    setLoggedIn(true);
                    history.push('/');
                }
            })
            .catch((err) => {
                if (err.status === 400) {
                    console.log('не передано одно из полей')
                } else if (err.status === 401) {
                    console.log('пользователь с email не найден')
                }
                setInfoTooltip({
                    image: false,
                    text: 'Что-то пошло не так! Попробуйте ещё раз.'
                });
                setIsInfoTooltip(true);
            })
    }

    const tokenCheck = () => {//Проверяем, есть ли токен
        const jwt =localStorage.getItem('jwt');
        if (jwt) {
            mestoAuth.getContent(jwt)
                .then((res) =>{
                    if (res) {
                        setEmail(res.email);
                        setLoggedIn(true);
                        history.push('/');
                    }
                })
                .catch((err) => {
                    if (err.status === 401) {
                        console.log(err.statusText);
                    }
                    else {
                        throw err;
                    }
                });
        }
    }

    const handleLogout = () => { // Удаляем токен и обнуляем стейты
        localStorage.removeItem('jwt');
        setEmail('');
        setLoggedIn(false);
    }
    //

    function handleCardLike({_id, likes}) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        // todo problem #1
        const isLiked = likes.some(id => id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(_id, !isLiked).then(({data: newCard}) => {

            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === _id ? newCard : c);
            // Обновляем стейт
            setCards(newCards);
        })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(_id) {
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.deleteCards(_id).then(() => {
            // Формируем новый массив на основе имеющегося, удаляя из него выбранную карточку
            const cardsDelete = cards.filter((c) => c._id !== _id);
            // Обновляем стейт
            setCards(cardsDelete);
            closeAllPopups();
        })
            .catch((err) => {
                console.log(err);
            });
    }

    //Обработчики событий, открывающие модалки
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleCardClick = (cardData) => {
        setSelectedCard(cardData);
        setIsImagePopupOpen(true);
    }

    const DeleteCard = (_id) => {
        setDeleteCardPopup(true);
        setCardId(_id)
    }
    //

    //Обработчик событий, закрывающий все модалки
    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setDeleteCardPopup(false);
        setIsInfoTooltip(false);
    }
    //

    const userInfo = (data) => {
        api.getUserMe()
            .then((data) => {
                setCurrentUser({
                    name: data.name,
                    about: data.about,
                    avatar: data.avatar,
                    _id: data._id
                });
            })
    }

    const handleUpdateUser = (value) => {
        api.patchUsersMe(value)
            .then((data) => {
                        userInfo(data);
                        closeAllPopups();
                    })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleUpdateAvatar = (value) => {
        api.patchUsersAvatar(value)
            .then((data) => {
                userInfo(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleAddPlaceSubmit = (value) => {
        api.postAddCard(value)
            .then((data) => {
                const newCard = {
                    name: data.name,
                    link: data.link,
                    _id: data._id,
                    likes: data.likes,
                    owner: data.owner
                }
                closeAllPopups();
                setCards([newCard, ...cards]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    {loggedIn ? <Header loggedIn={loggedIn} email={email} textButton={'Выйти'} onButtonClick={handleLogout}/> : null}
                        <Switch>
                            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
                                            onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                                            onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}
                                            onCardLike={handleCardLike} onCardDelete={DeleteCard} />

                            <Route path="/sign-up">
                                <Header loggedIn={loggedIn} routePath={'/sign-in'} textLink={'Войти'}/>
                                <Register handleRegister={handleRegister} />
                                <Footer name="footer__register"/>
                            </Route>

                            <Route path="/sign-in">
                                <Header loggedIn={loggedIn} routePath={'/sign-up'} textLink={'Регистрация'}/>
                                <Login handleLogin={handleLogin} />
                                <Footer name="footer__login"/>
                            </Route>

                        </Switch>
                    {loggedIn ? <Footer name="footer__main"/> : null}
                </div>
                <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

                <DeleteCardPopup isOpen={isDeleteCardPopup} onClose={closeAllPopups} cardId={cardId} handleCardDelete={handleCardDelete}/>

                <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} infoTooltip={infoTooltip}/>

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
