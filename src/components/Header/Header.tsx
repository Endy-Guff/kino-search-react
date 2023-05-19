import React from 'react';
import s from './Header.module.css'
import bg from '../../assets/img/bg.jpg'


export const Header = () => {
    return (
        <header className={s.wrapper} style={{backgroundImage: `url(${bg})`}}>
            <h1 className={s.title}>
                кино <span>search</span>
            </h1>
        </header>
    );
};

