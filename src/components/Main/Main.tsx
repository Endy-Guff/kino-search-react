import React, {useCallback, useEffect} from 'react';
import s from './Main.module.css'
import {SearchInput} from "./SearchInput/SearchInput";
import {FilmsList} from "./FilmsList/FilmsList";
import {RootStateType} from "../../redux/store";
import {
    changeIsLoaderAC, setCurrentFilmAC, setCurrentFilmIdAC,
    setCurrentPageAC,
    setFilmsAC, setModeAC,
    setPageTitleAC,
    StateType
} from "../../redux/dataReducer";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../api/api"
import {Preloader} from "../common/Preloader";
import {CurrentFilm} from "./CurrentFilm/CurrentFilm";

export const Main = () => {

    const data = useSelector<RootStateType, StateType>(state => state.data)
    const dispatch = useDispatch()

    const pages = []
    for (let i = 1; i<=data.filmsData.pagesCount; i++){
        pages.push(i)
    }

    const setCurrentPage = useCallback((pageNumber: number) =>{
        dispatch(setCurrentPageAC(pageNumber))
    }, [dispatch])

    useEffect(()=>{
        dispatch(changeIsLoaderAC(true))
        switch (data.mode) {
            case "TOP_250":
                api.getTop250(data.currentPage)
                    .then(response => {
                        dispatch(setFilmsAC(response.data))
                        dispatch(changeIsLoaderAC(false))
                    })
                dispatch(setPageTitleAC('Топ фильмов'))
                break
            case "SEARCH":
                api.getSearchFilm(data.currentPage, data.searchValue)
                    .then(response=> {
                        dispatch(setFilmsAC(response.data))
                        dispatch(changeIsLoaderAC(false))
                    })
                dispatch(setPageTitleAC(`Результаты поискового запроса: ${data.searchValue}`))
                break
            case "CURRENT_FILM":
                console.log(123)
                api.getFilmById(data.currentFilmId)
                    .then(response=>{
                        dispatch(setCurrentFilmAC(response.data))
                        dispatch(changeIsLoaderAC(false))
                    })
        }
    }, [data.currentPage, data.searchValue, data.mode])

    const setCurrentFilmId = (currentFilmId: number) =>{
        dispatch(setModeAC("CURRENT_FILM"))
        dispatch(setCurrentFilmIdAC(currentFilmId))
    }

    return (
        <main className={s.wrapper}>
            <div className='container'>
                <SearchInput />
                <h2 className={s.title}>{data.pageTitle}</h2>
                <div className={s.inner}>
                    {data.isLoader ? <Preloader />
                        :data.currentFilm?<CurrentFilm film={data.currentFilm}/>:<FilmsList

                            filmsData={data.filmsData}
                            pages={pages}
                            setCurrentPage={setCurrentPage}
                            currentPage={data.currentPage}
                            setCurrentFilmId={setCurrentFilmId}
                        />}
                </div>
            </div>
        </main>
    );
};

