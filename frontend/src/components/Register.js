import React from "react";
import {Link} from "react-router-dom";


function Register (props) {
    const [ data, setData ] = React.useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit (e) {
        e.preventDefault();
        const { email, password } = data;
        props.handleRegister( email, password );
    }

    return (
        <div className="authorization">
            <h2 className="authorization__title">Регистрация</h2>
            <form action="#" name="register" className="authorization__field" onSubmit={handleSubmit}>
                <input type="email" name="email" className="authorization__input" placeholder="Email" value={data.email} onChange={handleChange} required/>

                <input type="password" name="password" className="authorization__input" placeholder="Пароль" value={data.password} onChange={handleChange} required/>

                <button type="submit" className="authorization__button">Зарегистрироваться</button>
            </form>
            <div className="authorization__question">
                <h3 className="authorization__subtitle">Уже зарегистрированы? <Link to={'/sign-in'} className="authorization__login-link">Войти</Link></h3>
            </div>
        </div>
    );
}

export default Register ;