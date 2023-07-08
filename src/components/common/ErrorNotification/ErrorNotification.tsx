import React, {useEffect, useState} from 'react';
import s from './ErrorNotification.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../redux/store";
import {setErrorAC} from "../../../redux/dataReducer";

const ErrorNotificationContainer = () => {
    const error = useSelector<RootStateType, string>(state=>state.data.error)

    return (<>
        {error&&<ErrorNotification error={error}/>}
        </>
    );
};

const ErrorNotification = (props: { error: string }) =>{

    let [active, setActive] = useState<boolean>(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        let id: ReturnType<typeof setTimeout>
        if (props.error){
            setActive(true)
            id = setTimeout(()=>{
                setActive(false)
                dispatch(setErrorAC(''))
            }, 10000)
        }
        return ()=>{
            clearTimeout(id)
        }
    }, [props.error])

    const errorClass = active?s.wrapper+' '+s.active:s.wrapper
    return(
        <div className={errorClass}>
            <div className={s.error}>
                {props.error}
            </div>
        </div>
    )
}

export default ErrorNotificationContainer