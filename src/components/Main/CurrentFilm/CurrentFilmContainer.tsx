import React, {useEffect, useRef, useState} from 'react';
import {CurrentFilm} from "./CurrentFilm";
import {
    changeIsLoaderAC,
    CurrentFilmType, getCurrentFilmTC,
    ModeType, setCurrentFilmAC,
} from "../../../redux/dataReducer";
import {useDispatch} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {api} from "../../../api/api";
import {useAppDispatch} from "../../../redux/store";
import {Mode} from "fs";

type CurrentFilmContainerPropsType = {
    film:CurrentFilmType
    setMode: (mode:ModeType) => void
    mode: ModeType
    previousMode: ModeType
}


export const CurrentFilmContainer = (props: CurrentFilmContainerPropsType) => {

    const dispatch = useAppDispatch()
    const params = useParams()
    const location = useLocation()

    useEffect(() => {
        window.scrollTo({
            top: 800,
            behavior: 'smooth'
        })
    }, [location.pathname])

    useEffect(()=>{
        if (props.mode!=='CURRENT_FILM'){
            props.setMode('CURRENT_FILM')
        }
    }, [])
    useEffect(()=>{
        if (params.filmId&&!props.film.currentFilmData){
            dispatch(getCurrentFilmTC(params.filmId))
        }
        return ()=>{
            dispatch(setCurrentFilmAC(null, []))
        }
    }, [params.filmId])


    return (
        <div>
            <CurrentFilm film={props.film.currentFilmData}
                         person={props.film.filmPersons}
            />
        </div>
    );
};
