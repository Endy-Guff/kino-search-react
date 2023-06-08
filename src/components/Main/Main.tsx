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
import {Preloader} from "../common/Preloader";
import {Route, Routes, useLocation, useParams} from 'react-router-dom'
import {CurrentFilmContainer} from "./CurrentFilm/CurrentFilmContainer";


export const Main = () => {
    const wrapperRef = useRef<HTMLInputElement>(null)
    console.log(wrapperRef.current!.offsetTop)

    const data = useSelector<RootStateType, StateType>(state => state.data)
    const dispatch = useAppDispatch()

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
                dispatch(getFilmTC())
                break
            case "SEARCH":
                dispatch(getFilmTC(data.searchValue))
                break
        }
    }, [data.currentPage, data.searchValue, data.mode, data.currentFilmId])

    const setMode = (mode: ModeType) => {
        dispatch(setModeAC(mode))
    }
    const location = useLocation()
    return (
        <main className={s.wrapper} ref={wrapperRef}>
            <div className='container'>
                <SearchInput/>
                {location.pathname==='/'?<h2 className={s.title}>{data.pageTitle}</h2>:null}
                <div className={s.inner}>

                         <Routes>
                            <Route path='/' element={<FilmsList
                                    filmsData={data.filmsData}
                                    pages={pages}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={data.currentPage}
                                    offsetTop={wrapperRef.current!.offsetTop}
                                />
                            }/>
                            <Route path={'/film/:filmId'} element={<CurrentFilmContainer
                                film={data.currentFilm}
                                mode={data.mode}
                                setMode={setMode}
                            />}
                            />
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

