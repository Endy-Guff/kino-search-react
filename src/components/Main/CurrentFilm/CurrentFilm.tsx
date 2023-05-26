import React from 'react';
import {Preloader} from "../../common/Preloader";
import {CurrentFilmType} from "../../../redux/dataReducer";
import {useParams} from "react-router-dom";

type CurrentFilmPropsType = {
    film:CurrentFilmType
}

export const CurrentFilm = (props:CurrentFilmPropsType) => {
    if (!props.film){
        return <Preloader />
    }

    return (
        <div style={{color:'#fff'}}>
            {props.film.nameRu}
        </div>
    );
};

