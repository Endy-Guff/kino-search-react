import React, {useCallback, useEffect, useRef} from 'react';
import s from './Main.module.css'
import {SearchInput} from "./SearchInput/SearchInput";
import {FilmsList} from "./FilmsList/FilmsList";
import {RootStateType, useAppDispatch} from "../../redux/store";
import {
    changeIsLoaderAC, getFilmTC, ModeType,
    setCurrentPageAC,
    setFilmsAC, setModeAC,
    setPageTitleAC,
    StateType
} from "../../redux/dataReducer";
import {useSelector} from "react-redux";
import {api} from "../../api/api"
import {Preloader} from "../common/Preloader/Preloader";
import {Navigate, Route, Routes, useLocation, useParams} from 'react-router-dom'
import {CurrentFilmContainer} from "./CurrentFilm/CurrentFilmContainer";
import {Menu} from "../Menu/Menu";


export const Main = () => {

    const wrapperRef = useRef<HTMLInputElement>(null)


    const data = useSelector<RootStateType, StateType>(state => state.data)
    const dispatch = useAppDispatch()

    const pages = []
    for (let i = 1; i <= data.filmsData.pagesCount; i++) {
        pages.push(i)
    }

    const location = useLocation()

    const setCurrentPage = useCallback((pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
    }, [dispatch])

    useEffect(() => {
        switch (location.pathname) {
            case "/TOP_250":
                dispatch(getFilmTC('', "TOP_250_BEST_FILMS"))
                break
            case "/TOP_100_POPULAR_FILMS":
                dispatch(getFilmTC('', "TOP_100_POPULAR_FILMS"))
                break
            case "/TOP_AWAIT_FILMS":
                dispatch(getFilmTC('', "TOP_AWAIT_FILMS"))
                break
            case "/search":
                dispatch(getFilmTC(data.searchValue))
                break
        }
    }, [data.currentPage, data.searchValue, data.currentFilmId, location.pathname])

    const setMode = (mode: ModeType) => {
        dispatch(setModeAC(mode))
    }
    console.log(location)
    return (
        <main className={s.wrapper} ref={wrapperRef}>
            <Menu />

            <div className='container'>
                <SearchInput/>
                {location.pathname==='/TOP_250'
                ||location.pathname==='/TOP_100_POPULAR_FILMS'
                ||location.pathname==='/TOP_AWAIT_FILMS'
                ||location.pathname==='/search'
                    ?<h2 className={s.title}>{data.pageTitle}</h2>:null}
                <div className={s.inner}>

                         <Routes>
                            <Route path='/*' element={<FilmsList
                                    filmsData={data.filmsData}
                                    pages={pages}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={data.currentPage}
                                    offsetTop={wrapperRef.current?.offsetTop}
                                    mode={data.mode}
                                />
                            }/>
                            <Route path={'/film/:filmId'} element={<CurrentFilmContainer
                                film={data.currentFilm}
                                mode={data.mode}
                                setMode={setMode}
                                previousMode={data.previousMode}
                            />}
                            />
                             <Route path={'/'} element={<Navigate to={'/TOP_250'} />}/>
                        </Routes>




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

