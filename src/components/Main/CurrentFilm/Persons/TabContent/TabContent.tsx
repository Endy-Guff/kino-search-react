import React from 'react';
import s from "./TabContent.module.css";
import {FilmPersonType} from "../../../../../redux/dataReducer";

type TabContentPropsType = {
    position: number
    activeTab: number
    filter: string
    person: FilmPersonType[]
}

export const TabContent:React.FC<TabContentPropsType> = (
    {
        position,
        activeTab,
        filter,
        person
    }
) => {
    return (
        <div className={activeTab === position ? s.tabsContent + ' ' + s.active : s.tabsContent}>
            {person.filter(p => p.professionKey === filter).map((p, i) => {
                return <div className={s.tabsItem} key={i}>
                    <div className={s.itemImgBox}>
                        <img className={s.itemImg} src={p.posterUrl} alt=""/>
                    </div>
                    <span className={s.itemName}>{p.nameRu}</span>
                </div>
            })}
        </div>
    );
};

