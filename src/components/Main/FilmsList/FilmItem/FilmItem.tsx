import React from 'react';
import s from './FilmItem.module.css'
import {CountriesType, ModeType, setPreviousModeAC} from "../../../../redux/dataReducer";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

type FilmItemPropsType = {
    filmName: string
    posterPreview: string
    rating: number
    filmYear: string
    country: CountriesType[]
    filmLength: string
    filmId: number
    mode: ModeType
}

export const FilmItem: React.FC<FilmItemPropsType> = (
    {
        filmName,
        posterPreview,
        rating,
        filmYear,
        country,
        filmLength,
        filmId,
        mode
    }
) => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const ratingColor = (rating: number) =>{
        if (rating<=3){
            return 'B9020F'
        }
        if (rating<=7){
            return 'EFF400'
        }
        if (rating<=10){
            return '00930F'
        }
    }

    const cutFilmName = filmName?filmName.length>17?filmName.substr(0, 16) + '...':filmName:'Название неизвестно'

    const onClickHandler = () =>{
        dispatch(setPreviousModeAC(mode))
        navigate(`/film/${filmId}`)
    }
    return (
        <div className={s.wrapper} onClick={onClickHandler}>
            <div className={s.inner} style={{backgroundImage: `url(${posterPreview})`}}>
                <div className={s.rating} style={{backgroundColor: `#${ratingColor(rating)}`}}>
                    <span>{rating}</span>
                </div>
                <div className={s.shortDesc}>
                    <span>{filmYear}, </span>
                    {country.map((c, i)=><span key={i}>{c.country}, </span>)}
                    <span className={s.length}>{filmLength}</span>
                </div>
            </div>
            <h4 className={s.filmName}>{cutFilmName}</h4>
        </div>
    );
};

