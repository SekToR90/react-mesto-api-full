import React from "react";
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <div className="header__logo"></div>
            {props.loggedIn ?
                <div className="header__info">
                    <p className="header__info-email">{props.email}</p>
                    <button type="button" className="header__info-exit" onClick={props.onButtonClick}>{props.textButton}</button>
                </div>
                :
                <Link to={props.routePath} className="header__info-link">{props.textLink}</Link>
            }
        </header>
    );
}


export default Header;