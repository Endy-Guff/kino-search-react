import React, {useState} from 'react';
import s from './Menu.module.css'
import {ModeType, setModeAC} from "../../redux/dataReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

export const Menu = () => {
    const currentMode = useSelector<RootStateType, ModeType>(state=>state.data.mode)
    const dispatch = useDispatch()

    let [menuIsActive, setMenuIsActive] = useState<boolean>(false)

    const onMouseLeaveHandler = () => {
        setMenuIsActive(false)
    }
    const onMouseEnterHandler =() => {
        setMenuIsActive(true)
    }

    const onClickHandler =(mode: ModeType) =>{
        dispatch(setModeAC(mode))
    }

    const menuClass = menuIsActive?s.wrapper+' '+s.active:s.wrapper

    return (
        <div className={menuClass} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
            <span className={currentMode==='TOP_250'?s.mode+' '+s.active:s.mode}
                  onClick={()=>onClickHandler('TOP_250')}>Топ 250 лучших фильмов</span>
            <span className={currentMode==='TOP_100_POPULAR_FILMS'?s.mode+' '+s.active:s.mode}
                  onClick={()=>onClickHandler('TOP_100_POPULAR_FILMS')}>Топ 100 популярных фильмов</span>
            <span className={currentMode==='TOP_AWAIT_FILMS'?s.mode+' '+s.active:s.mode}
                  onClick={()=>onClickHandler('TOP_AWAIT_FILMS')}>Топ ожидающих фильмов</span>
        </div>
    );
};

