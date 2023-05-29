import React, {useEffect} from 'react';
import {CurrentFilm} from "./CurrentFilm";
import {
    changeIsLoaderAC,
    CurrentFilmType,
    ModeType, setCurrentFilmAC,
} from "../../../redux/dataReducer";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {api} from "../../../api/api";

type CurrentFilmContainerPropsType = {
    film:CurrentFilmType
    setMode: () => void
    mode: ModeType
}


export const CurrentFilmContainer = (props: CurrentFilmContainerPropsType) => {
    const dispatch = useDispatch()

    const params = useParams()

    useEffect(()=>{
        if (props.mode!=='CURRENT_FILM'){
            props.setMode()
            console.log(2)
        }
    }, [])

    useEffect(()=>{
        if (params.filmId&&!props.film.currentFilmData){
            debugger
            dispatch(changeIsLoaderAC(true))
            console.log(props.mode)
            api.getFilmById(params.filmId)
                .then(response => {
                    dispatch(setCurrentFilmAC(response[0].data, response[1].data))
                })
                .finally(()=>dispatch(changeIsLoaderAC(false)))
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
