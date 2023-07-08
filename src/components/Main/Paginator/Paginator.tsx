import React from 'react';
import s from './Paginator.module.css';

type PaginatorPropsType = {
    currentPage: number
    pages: number[]
    setCurrentPage: (pageNumber: number) => void
}

export const Paginator:React.FC<PaginatorPropsType> = (
    {
        currentPage,
        pages,
        setCurrentPage
    }
) => {
    return (
        <div className={s.pages}>
            {currentPage !== pages[0] && pages.length > 5 && <span
                key={pages[0]}
                className={s.page + ' ' + s.final}
                onClick={() => setCurrentPage(pages[0])}
            >{pages[0]}</span>}
            {pages.map(p => {
                const pageClass = currentPage === p ? s.page + ' ' + s.active : s.page
                return pages.length < 5
                    ? <span
                        key={p}
                        className={pageClass}
                        onClick={() => setCurrentPage(p)}
                    >{p}</span>
                    : p < currentPage + 5 && p > currentPage - 5
                        ?
                        <span
                            key={p}
                            className={pageClass}
                            onClick={() => setCurrentPage(p)}
                        >{p}</span>
                        : null
            })
            }
            {currentPage !== pages[pages.length - 1] && pages.length > 5 && <span
                key={pages[pages.length - 1]}
                className={s.page + ' ' + s.final}
                onClick={() => setCurrentPage(pages[pages.length - 1])}
            >{pages[pages.length - 1]}</span>}
        </div>
    );
};

