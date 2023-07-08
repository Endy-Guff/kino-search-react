import React, {memo, useEffect} from 'react';
import s from './FilmsList.module.css'
import {FilmsDataType, ModeType} from "../../../redux/dataReducer";
import {FilmItem} from "./FilmItem/FilmItem";
import {useLocation} from "react-router-dom";
import {Paginator} from "../Paginator/Paginator";

type FilmsListPropsType = {
    filmsData: FilmsDataType
    pages: number[]
    setCurrentPage: (pageNumber: number) => void
    currentPage: number
    offsetTop?: number
    mode: ModeType
}

export const FilmsList: React.FC<FilmsListPropsType> = memo((
    {
        filmsData,
        pages,
        setCurrentPage,
        currentPage,
        offsetTop,
        mode
    }
) => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        })
    }, [currentPage, location.pathname])

    const mappedFilms = filmsData.films.map(film => {
        return film.nameRu !== undefined && <FilmItem
            key={film.filmId}
            filmName={film.nameRu}
            posterPreview={film.posterUrlPreview}
            rating={+film.rating}
            filmYear={film.year}
            country={film.countries}
            filmLength={film.filmLength}
            filmId={film.filmId}
            mode={mode}
        />
    })

    return (
        <div className={s.wrapper}>
            <div className={s.films}>
                {mappedFilms}
            </div>
            <Paginator
                currentPage={currentPage}
                pages={pages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
});

