import React, {useCallback, useEffect} from 'react';
import s from './Main.module.css'
import {SearchInput} from "./SearchInput/SearchInput";
import {FilmsList} from "./FilmsList/FilmsList";
import {instance, RootStateType} from "../../redux/store";
import {
    FilmsDataType,
    FilmsType,
    setCurrentPageAC,
    setFilmsAC,
    setPageTitleAC,
    StateType
} from "../../redux/dataReducer";
import {useDispatch, useSelector} from "react-redux";

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
        switch (data.mode) {
            case "TOP_250":
                instance.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${data.currentPage}`)
                    .then(response => dispatch(setFilmsAC(response.data)))
                dispatch(setPageTitleAC('Топ фильмов'))
                break
            case "SEARCH":
                instance
                    .get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${data.searchValue}&page=${data.currentPage}`)
                    .then(response=>dispatch(setFilmsAC(response.data)))
                dispatch(setPageTitleAC(`Результаты поискового запроса: ${data.searchValue}`))
                break
        }
    }, [data.currentPage, data.searchValue])

    return (
        <main className={s.wrapper}>
            <div className='container'>
                <SearchInput />
                <h2 className={s.title}>{data.pageTitle}</h2>
                <FilmsList
                    filmsData={data.filmsData}
                    pages={pages}
                    setCurrentPage={setCurrentPage}
                    currentPage={data.currentPage}
                />
            </div>
        </main>
    );
};

