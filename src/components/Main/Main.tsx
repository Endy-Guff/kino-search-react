import React, {useEffect} from 'react';
import s from './Main.module.css'
import {SearchInput} from "./SearchInput/SearchInput";
import {FilmsList} from "./FilmsList/FilmsList";
import {instance, RootStateType} from "../../redux/store";
import {FilmsDataType, FilmsType, setFilmsAC} from "../../redux/dataReducer";
import {useDispatch, useSelector} from "react-redux";

export const Main = () => {

    const filmsData = useSelector<RootStateType, FilmsDataType>(state => state.data.filmsData)
    const dispatch = useDispatch()

    useEffect(()=>{
        instance.get('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1')
            .then(response=>dispatch(setFilmsAC(response.data)))
    }, [])

    return (
        <main className={s.wrapper}>
            <div className='container'>
                <SearchInput />
                <h2>Топ фильмов</h2>
                <FilmsList filmsData={filmsData}/>
            </div>
        </main>
    );
};

