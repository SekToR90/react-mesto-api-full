import React from "react";


function Login (props) {
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

        props.handleLogin( email, password );
    }

    return (
        <div className="authorization">
            <h2 className="authorization__title">Вход</h2>
            <form action="#" name="login" className="authorization__field" onSubmit={handleSubmit} >
                <input type="email" name="email" className="authorization__input" placeholder="Email" value={data.email} onChange={handleChange} required/>

                <input type="password" name="password" className="authorization__input" placeholder="Пароль" value={data.password} onChange={handleChange} required/>

                <button type="submit" className="authorization__button">Войти</button>
            </form>
        </div>
    );
}

export default Login ;