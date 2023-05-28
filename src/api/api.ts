import axios from "axios";
import {CurrentFilmType, FilmPersonType, FilmsDataType} from "../redux/dataReducer";

export const instance = axios.create({
    baseURL: 'https://kinopoiskapiunofficial.tech/api/v2.2',
    headers: {
        'X-API-KEY': 'c64ab17b-d0cc-4679-90fa-e65b7c4e17b8',
        'Content-Type': 'application/json',
    }
});

export const api = {
    getTop250(currentPage: number) {
        return instance.get<FilmsDataType>(`/films/top?type=TOP_250_BEST_FILMS&page=${currentPage}`)
    },
    getSearchFilm(currentPage: number, searchValue: string) {
        return  instance.get<FilmsDataType>(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${searchValue}&page=${currentPage}`)

    },
    getFilmById(filmId: string) {
        return instance.get<CurrentFilmType>(`/films/${filmId}`)
    },
    getFilmPerson(filmId: number) {
        return instance.get<FilmPersonType[]>(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${filmId}`)
    }
}