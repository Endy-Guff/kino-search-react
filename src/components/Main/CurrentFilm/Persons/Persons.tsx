import React, {useState} from 'react';
import s from './Persons.module.css';
import {FilmPersonType} from "../../../../redux/dataReducer";
import {TabBtn} from "./TabBtn/TabBtn";
import {TabContent} from "./TabContent/TabContent";

type PersonsPropsType = {
    person: FilmPersonType[]
}

export const Persons:React.FC<PersonsPropsType> = (
    {
        person
    }
) => {

    let [activeTab, setActiveTab] = useState<number>(1)


    return (
        <div className={s.personsBox}>
            <div className={s.btnTabsBox}>
                <TabBtn position={1} activeTab={activeTab} setActiveTab={setActiveTab} name={'Актеры'} />
                <TabBtn position={2} activeTab={activeTab} setActiveTab={setActiveTab} name={'Режисёры'} />
                <TabBtn position={3} activeTab={activeTab} setActiveTab={setActiveTab} name={'Сценаристы'} />
                <TabBtn position={4} activeTab={activeTab} setActiveTab={setActiveTab} name={'Операторы'} />
            </div>
            <div className={s.contentTabsBox}>
                <TabContent position={1} activeTab={activeTab} filter={'ACTOR'} person={person} />
                <TabContent position={2} activeTab={activeTab} filter={'DIRECTOR'} person={person} />
                <TabContent position={3} activeTab={activeTab} filter={'WRITER'} person={person} />
                <TabContent position={4} activeTab={activeTab} filter={'OPERATOR'} person={person} />
            </div>
        </div>
    );
};

