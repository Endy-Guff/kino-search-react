import React, {useEffect, useState} from 'react';
import s from './Preloader.module.css'
import loader from "../../../assets/img/loader.svg";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";

export const Preloader = () => {

    const isLoader = useSelector<RootStateType, boolean>(state => state.data.isLoader)
    let [isLoaderStatus, setIsLoaderStatus] = useState<boolean>(isLoader)

    useEffect(()=>{
        if (isLoader){
            setIsLoaderStatus(state=> state = true)
        }
        if (!isLoader){
            setTimeout(()=>{
                setIsLoaderStatus(state=> state = false)
            },1000)
        }
    }, [isLoader])

    const lineClass = isLoaderStatus?s.line+' '+s.active:s.line
    return (
        // <img src={loader} alt=""/>



        <div className={s.wrapper}>
            <div className={lineClass}><span className={s.loader}></span></div>
        </div>
    );
};

