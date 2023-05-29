import React, {useCallback, useEffect} from 'react';
import s from './Main.module.css'
import {SearchInput} from "./SearchInput/SearchInput";
import {FilmsList} from "./FilmsList/FilmsList";
import {RootStateType} from "../../redux/store";
import {
    changeIsLoaderAC,
    setCurrentPageAC,
    setFilmsAC, setModeAC,
    setPageTitleAC,
    StateType
} from "../../redux/dataReducer";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../api/api"
import {Preloader} from "../common/Preloader";
import {Route, Routes, useLocation, useParams} from 'react-router-dom'
import {CurrentFilmContainer} from "./CurrentFilm/CurrentFilmContainer";

export const Main = () => {

    const data = useSelector<RootStateType, StateType>(state => state.data)
    const dispatch = useDispatch()

    const pages = []
    for (let i = 1; i <= data.filmsData.pagesCount; i++) {
        pages.push(i)
    }

    const setCurrentPage = useCallback((pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
    }, [dispatch])

    useEffect(() => {
        switch (data.mode) {
            case "TOP_250":
                dispatch(changeIsLoaderAC(true))
                api.getTop250(data.currentPage)
                    .then(response => {
                        dispatch(setFilmsAC(response.data))
                        dispatch(changeIsLoaderAC(false))
                    })
                dispatch(setPageTitleAC('Топ фильмов'))
                break
            case "SEARCH":
                dispatch(changeIsLoaderAC(true))
                api.getSearchFilm(data.currentPage, data.searchValue)
                    .then(response => {
                        dispatch(setFilmsAC(response.data))
                        dispatch(changeIsLoaderAC(false))
                    })
                dispatch(setPageTitleAC(`Результаты поискового запроса: ${data.searchValue}`))
                break
        }
    }, [data.currentPage, data.searchValue, data.mode, data.currentFilmId])

    const setMode = () => {
        dispatch(setModeAC("CURRENT_FILM"))
    }
    const location = useLocation()
    return (
        <main className={s.wrapper}>
            <div className='container'>
                <SearchInput/>
                {location.pathname==='/'?<h2 className={s.title}>{data.pageTitle}</h2>:null}
                <div className={s.inner}>
                    {data.isLoader ? <Preloader/>
                        : <Routes>
                            <Route path='/' element={<FilmsList
                                    filmsData={data.filmsData}
                                    pages={pages}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={data.currentPage}
                                />
                            }/>
                            <Route path={'/film/:filmId'} element={<CurrentFilmContainer
                                film={data.currentFilm}
                                mode={data.mode}
                                setMode={setMode}
                            />}
                            />
                        </Routes>

                    }


                    {/*{data.isLoader ? <Preloader />*/}
                    {/*    :data.currentFilm?<CurrentFilm film={data.currentFilm}/>:<FilmsList*/}

                    {/*        filmsData={data.filmsData}*/}
                    {/*        pages={pages}*/}
                    {/*        setCurrentPage={setCurrentPage}*/}
                    {/*        currentPage={data.currentPage}*/}
                    {/*        setMode={setMode}*/}
                    {/*    />}*/}
                </div>
            </div>
        </main>
    );
};

