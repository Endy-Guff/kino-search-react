import React from 'react';
import {Preloader} from "../../common/Preloader";
import {CurrentFilmType} from "../../../redux/dataReducer";
import s from './CurrentFilm.module.css'

type CurrentFilmPropsType = {
    film:CurrentFilmType
}

export const CurrentFilm:React.FC<CurrentFilmPropsType> = (
    {
        film
    }
) => {
    if (!film){
        return <Preloader />
    }

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
                                {film.countries.map((c, i)=><span key={i}>{c.country}, </span>)}
                            </span>
                        </li>
                        <li className={s.infoItem}>
                            <span className={s.infoType}>Жанр:</span>
                            <span className={s.infoValue}>
                                {film.genres.map((g, i)=><span key={i}>{g.genre}, &nbsp;</span>)}
                            </span>
                        </li>
                        <li className={s.infoItem}>
                            <span className={s.infoType}>Слоган:</span>
                            <span className={s.infoValue}>2</span>
                        </li>
                        <li className={s.infoItem}>
                            <span className={s.infoType}>Длительность:</span>
                            <span className={s.infoValue}>2</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

