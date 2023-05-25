import React from 'react';
import {Preloader} from "../../common/Preloader";
import {CurrentFilmType} from "../../../redux/dataReducer";

type CurrentFilmPropsType = {
    film: null | CurrentFilmType
}

export const CurrentFilm = (props:CurrentFilmPropsType) => {

    if (!props.film){
        return <Preloader />
    }


    return (
        <div>
            {props.film.nameRu}
        </div>
    );
};

