import React from "react";

function Footer(props) {
    return (
        <footer className={`footer ${props.name}`}>
            <p className="footer__logo">© 2020 Mesto Russia</p>
        </footer>
    );
}


export default Footer;