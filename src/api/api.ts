import axios from "axios";
import {
    CurrentFilmDataType,
    CurrentFilmType,
    FilmPersonType,
    FilmsDataType,
    ModeType,
    TopModeType
} from "../redux/dataReducer";

export const instance = axios.create({
    baseURL: 'https://kinopoiskapiunofficial.tech/api/v2.2',
    headers: {
        'X-API-KEY': '9b2fb13e-78fd-4ff7-8203-8e7e63862456',
        'Content-Type': 'application/json',
    }
});

export const api = {
    getFilm(currentPage: number, mode: TopModeType) {
        return instance.get<FilmsDataType>(`/films/top?type=${mode}&page=${currentPage}`)
    },
    getSearchFilm(currentPage: number, searchValue: string) {
        return  instance.get<FilmsDataType>(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchValue}&page=${currentPage}`)

    },
    getFilmById(filmId: string) {
        const film = instance.get<CurrentFilmDataType>(`/films/${filmId}`)
        const filmPersons = instance.get<FilmPersonType[]>(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${filmId}`)
        return Promise.all([film, filmPersons])
    }

}