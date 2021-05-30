import React from 'react';
import { CityLogo } from '../ui/icons';

const Footer = () => {
    return (
        <footer className="bck_blue">
            <div className="footer_logo">
                <CityLogo
                    width="120px"
                    height="45x"
                    link={true}
                    linkTo="/"
                />
            </div>
            <div className="footer_discl">
            This App is a part of Herolo weather-home-task
            </div>

        </footer>
    );
};

export default Footer;