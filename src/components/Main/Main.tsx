import React from 'react';
import s from './Main.module.css'
import {SearchInput} from "./SearchInput/SearchInput";

export const Main = () => {
    return (
        <main className={s.wrapper}>
            <div className='container'>
                <SearchInput />
            </div>
        </main>
    );
};

