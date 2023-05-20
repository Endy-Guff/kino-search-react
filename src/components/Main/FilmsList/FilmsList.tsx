import React, {useEffect} from 'react';
import s from './FilmsList.module.css'
import {instance, RootStateType} from "../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {FilmsDataType, FilmsType, setFilmsAC} from "../../../redux/dataReducer";
import {FilmItem} from "./FilmItem/FilmItem";

type FilmsListPropsType = {
    filmsData: FilmsDataType
}

export const FilmsList:React.FC<FilmsListPropsType> = (
    {
        filmsData
    }
) => {


    return (
        <div className={s.wrapper}>
            {filmsData.films.map(film=>{
                return <FilmItem
                    key={film.filmId}
                    filmName={film.nameRu}
                    posterPreview={film.posterUrlPreview}
                    rating={+film.rating}
                />
            })}
        </div>
    );
};

