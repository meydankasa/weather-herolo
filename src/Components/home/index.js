import React from 'react';
import Promotion from './search';
//TODO: use context 

export const ThemeContext = React.createContext();

const Home = () => {
    return (
    // <ThemeContext.Provider value={darkTheme}>

        <div className="bck_blue">
            <Promotion/>
        </div>

    // </ThemeContext.Provider>
    );
};

export default Home;