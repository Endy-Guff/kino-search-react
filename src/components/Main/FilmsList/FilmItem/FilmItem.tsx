import React from 'react';
import s from './FilmItem.module.css'
import {CountriesType} from "../../../../redux/dataReducer";

type FilmItemPropsType = {
    filmName: string
    posterPreview: string
    rating: number
    filmYear: string
    country: CountriesType[]
    filmLength: string
}

export const FilmItem: React.FC<FilmItemPropsType> = (
    {
        filmName,
        posterPreview,
        rating,
        filmYear,
        country,
        filmLength
    }
) => {

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

    const cutFilmName = filmName.length>17?filmName.substr(0, 16) + '...':filmName

    return (
        <div className={s.wrapper}>
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

