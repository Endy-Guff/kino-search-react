import React from "react";
import {dataReducer, setFilmsAC, StateType} from "./dataReducer";

const state: StateType = {
    filmsData: {
        keyword: '',
        pagesCount: 0,
        films: []
    },
    currentFilm: {
        currentFilmData: null,
        filmPersons: []
    },
    currentFilmId: '0',
    pageTitle: 'Топ фильмов',
    searchChangeInputValue: '',
    searchValue: '',
    mode: 'TOP_250',
    previousMode: 'TOP_250',
    isLoader: false,
    currentPage: 1,
    error: ''
}

it('films should be added', ()=>{
    const data = {
        keyword: '',
        pagesCount: 1,
        films: [
        {
            filmId: 12345,
            nameRu: 'Film1',
            year: '2022',
            filmLength: '123',
            countries: [{country: 'Russia'}, {country: 'Moldova'}],
            genres: [{genre: 'Fantasy'}, {genre: 'Musical'}],
            rating: '8',
            posterUrl: 'qw.ww.ru',
            posterUrlPreview: 'qw.ww.ru',
            description: 'asdadadadadad'
        },
        {
            filmId: 1234125,
            nameRu: 'Film2',
            year: '2021',
            filmLength: '1223',
            countries: [{country: 'Russia'}, {country: 'Moldova'}],
            genres: [{genre: 'Fantasy'}, {genre: 'Musical'}],
            rating: '8',
            posterUrl: 'qw.ww.ru',
            posterUrlPreview: 'qw.ww.ru',
            description: 'asdadadadadad'
        }
    ]}
    const action = setFilmsAC(data)

    const endState = dataReducer(state, action)

    expect(endState.filmsData.films.length).toBe(2)
})