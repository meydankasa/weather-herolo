import React from 'react';
import Zoom from 'react-reveal/Zoom'
import logo from '../../../Resources/images/logos/herolo_logo.png';

const SearchAnimation = () => {
    return (
        <div className="promotion_animation">
            <div className="left">
                <Zoom>
                    <div>
                        <span>Herolo</span>
                        <span>Weather App</span>
                    </div>
                </Zoom>
            </div>
            <div className="right">
                <Zoom>
                    <div style={{background:`url(${logo}) no-repeat`}}></div>
                </Zoom>
            </div>
        </div>
    );
};

export default SearchAnimation;