import React, {useEffect} from 'react';
import {CurrentFilm} from "./CurrentFilm";
import {CurrentFilmType, setCurrentFilmIdAC} from "../../../redux/dataReducer";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

type CurrentFilmContainerPropsType = {
    film:CurrentFilmType
    setMode: () => void
}


export const CurrentFilmContainer = (props: CurrentFilmContainerPropsType) => {

    const dispatch = useDispatch()

    const params = useParams()

    useEffect(()=>{
        if (params.filmId)
        dispatch(setCurrentFilmIdAC(params.filmId))
        props.setMode()
    }, [])


    return (
        <div>
            <CurrentFilm film={props.film}/>
        </div>
    );
};
