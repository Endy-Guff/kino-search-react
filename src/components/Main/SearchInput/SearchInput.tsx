import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import s from './SearchInput.module.css'
import {useDispatch, useSelector} from "react-redux";
import {instance, RootStateType} from "../../../redux/store";
import {changeSearchInputValueAC, setFilmsAC, setPageTitleAC} from "../../../redux/dataReducer";

export const SearchInput = () => {



    let [inputActive, setInputActive] = useState<boolean>(false)
    let [searchValue, setSearchValue] = useState<string>('')

    useEffect(()=>{
        instance
            .get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchValue}&page=1`)
            .then(response=>dispatch(setFilmsAC(response.data)))
        dispatch(setPageTitleAC(`Результаты поискового запроса: ${searchValue}`))
    }, [searchValue])

    const inputValue = useSelector<RootStateType, string>(state => state.data.searchInputValue)
    const dispatch = useDispatch()

    const inputBoxActiveClass = inputActive?s.inputBox + ' ' + s.active:s.inputBox
    const inputActiveClass = inputActive?s.input + ' ' + s.active:s.input
    const btnActiveClass = inputActive?s.btn + ' ' + s.active:s.btn

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        dispatch(changeSearchInputValueAC(e.currentTarget.value))
    }

    const searchOnClickHandler = () => {
        setSearchValue(inputValue)
        dispatch(changeSearchInputValueAC(''))
    }

    const searchOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>{
        if (e.key === 'Enter'){
            setSearchValue(inputValue)
            dispatch(changeSearchInputValueAC(''))
        }
    }

    return (
        <div className={inputBoxActiveClass} onMouseEnter={()=>setInputActive(!inputActive)} onMouseLeave={()=>setInputActive(!inputActive)}>
            <input className={inputActiveClass}
                   value={inputValue}
                   onChange={onChangeHandler}
                   onKeyPress={searchOnKeyPressHandler}
            />
            <button className={btnActiveClass}
                    onClick={searchOnClickHandler}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.5605 18.4395L16.7528 14.6318C17.5395 13.446 18 12.0262 18 10.5C18 6.3645 14.6355 3 10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C12.0262 18 13.446 17.5395 14.6318 16.7528L18.4395 20.5605C19.0245 21.1462 19.9755 21.1462 20.5605 20.5605C21.1462 19.9748 21.1462 19.0252 20.5605 18.4395ZM5.25 10.5C5.25 7.605 7.605 5.25 10.5 5.25C13.395 5.25 15.75 7.605 15.75 10.5C15.75 13.395 13.395 15.75 10.5 15.75C7.605 15.75 5.25 13.395 5.25 10.5Z" fill="#0054FF"/>
                </svg>
            </button>
        </div>
    );
};

