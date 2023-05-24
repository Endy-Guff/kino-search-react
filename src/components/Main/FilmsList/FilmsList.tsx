import React, {memo, useCallback, useEffect} from 'react';
import s from './FilmsList.module.css'
import {instance, RootStateType} from "../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {FilmsDataType, FilmsType, setFilmsAC} from "../../../redux/dataReducer";
import {FilmItem} from "./FilmItem/FilmItem";
import {log} from "util";

type FilmsListPropsType = {
    filmsData: FilmsDataType
    pages: number[]
    setCurrentPage: (pageNumber: number) => void
    currentPage: number
}

export const FilmsList: React.FC<FilmsListPropsType> = memo((
    {
        filmsData,
        pages,
        setCurrentPage,
        currentPage
    }
) => {

    return (
        <div className={s.wrapper}>
            <div className={s.films}>
            {filmsData.films.map(film => {
                return film.nameRu!==undefined && <FilmItem
                    key={film.filmId}
                    filmName={film.nameRu}
                    posterPreview={film.posterUrlPreview}
                    rating={+film.rating}
                    filmYear={film.year}
                    country={film.countries}
                    filmLength={film.filmLength}
                />
            })}
            </div>
            <div className={s.pages}>
                {pages.map(p => {

                    const pageClass = currentPage === p ? s.page + ' ' + s.active : s.page

                    return <span
                        key={p}
                        className={pageClass}
                        onClick={() => setCurrentPage(p)}
                    >{p}</span>
                })
                }
            </div>
        </div>
    );
});

