import React from 'react';
import s from "./TabBtn.module.css";

type TabBtnPropsType = {
    position: number
    activeTab: number
    setActiveTab: (position: number)=>void
    name: string
}

export const TabBtn:React.FC<TabBtnPropsType> = (
    {
        activeTab,
        setActiveTab,
        position,
        name
    }
) => {
    return (
        <button className={activeTab === position ? s.tabBtn + ' ' + s.active : s.tabBtn}
                onClick={() => setActiveTab(position)}>{name}
        </button>
    );
};

