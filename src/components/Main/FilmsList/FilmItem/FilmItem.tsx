import React from 'react';
import s from './FilmItem.module.css'

type FilmItemPropsType = {
    filmName: string
    posterPreview: string
    rating: number
}

export const FilmItem: React.FC<FilmItemPropsType> = (
    {
        filmName,
        posterPreview,
        rating
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
    return (
        <div className={s.wrapper}>
            <div className={s.inner} style={{backgroundImage: `url(${posterPreview})`}}>
                <div className={s.rating} style={{backgroundColor: `#${ratingColor(rating)}`}}>
                    <span>{rating}</span>
                </div>
            </div>
            <h4 className={s.filmName}>{filmName}</h4>
        </div>
    );
};

