import React, {memo, useEffect, useState} from 'react';
import {Preloader} from "../../common/Preloader/Preloader";
import {CurrentFilmDataType, FilmPersonType} from "../../../redux/dataReducer";
import s from './CurrentFilm.module.css'
import {Persons} from "./Persons/Persons";
import {useLocation} from "react-router-dom";

type CurrentFilmPropsType = {
    film: CurrentFilmDataType
    person: FilmPersonType[]
}

export const CurrentFilm: React.FC<CurrentFilmPropsType> = memo((
    {
        film,
        person,
    }
) => {


    if (!film) {
        return <Preloader/>
    }

    const numstr = (n: number) => {
        const minutes = ['минута', 'минуты', 'минут']

        let m = Math.abs(n) % 100;
        let n1 = m % 10;
        if (m > 10 && m < 20) {
            return `${n} ${minutes[2]}`;
        }
        if (n1 > 1 && n1 < 5) {
            return `${n} ${minutes[1]}`;
        }
        if (n1 == 1) {
            return `${n} ${minutes[0]}`;
        }
        return `${n} ${minutes[2]}`;
    }

    const mappedCountries = film.countries?.map((c, i) => <span key={i}>{c.country}, &nbsp;</span>)
    const mappedGenres = film.genres?.map((g, i) => <span key={i}>{g.genre}, &nbsp;</span>)
    return (
        <div className={s.wrapper}>
            <h3 className={s.title}>
                {film.nameRu}
            </h3>
            <div className={s.inner}>
                <div className={s.desc}>
                    <div className={s.imgBox}>
                        <img className={s.poster} src={film.posterUrlPreview} alt=""/>
                    </div>
                </div>
                <div className={s.info}>
                    <ul className={s.infoList}>
                        <li className={s.infoItem}>
                            <span className={s.infoType}>Год производтсва:</span>
                            <span className={s.infoValue}>{film.year}</span>
                        </li>
                        <li className={s.infoItem}>
                            <span className={s.infoType}>Страна:</span>
                            <span className={s.infoValue}>
                                {mappedCountries}
                            </span>
                        </li>
                        <li className={s.infoItem}>
                            <span className={s.infoType}>Жанр:</span>
                            <span className={s.infoValue}>
                                {mappedGenres}
                            </span>
                        </li>
                        <li className={s.infoItem}>
                            <span className={s.infoType}>Слоган:</span>
                            <span className={s.infoValue}>{film.slogan}</span>
                        </li>
                        <li className={s.infoItem}>
                            <span className={s.infoType}>Длительность:</span>
                            <span className={s.infoValue}>{numstr(film.filmLength)}</span>
                        </li>
                        <li className={s.infoItem}>
                            <span className={s.infoType}>Описание:</span>
                            <span className={s.infoValue}>{film.description}</span>
                        </li>
                    </ul>
                </div>
            </div>
            {person && <Persons person={person}/>}
        </div>
    );
});

