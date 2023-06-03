import React, {useEffect} from 'react';
import {CurrentFilm} from "./CurrentFilm";
import {
    changeIsLoaderAC,
    CurrentFilmType, getCurrentFilmTC,
    ModeType, setCurrentFilmAC,
} from "../../../redux/dataReducer";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {api} from "../../../api/api";
import {useAppDispatch} from "../../../redux/store";

type CurrentFilmContainerPropsType = {
    film:CurrentFilmType
    setMode: (mode:ModeType) => void
    mode: ModeType
}


export const CurrentFilmContainer = (props: CurrentFilmContainerPropsType) => {
    const dispatch = useAppDispatch()

    const params = useParams()

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
            props.setMode('TOP_250')
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
