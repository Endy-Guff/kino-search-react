import axios from "axios";
import {CurrentFilmType, FilmsDataType} from "../redux/dataReducer";

export const instance = axios.create({
    baseURL: 'https://kinopoiskapiunofficial.tech/api/v2.2',
    headers: {
        'X-API-KEY': 'bf4d11b7-7ada-4f2a-aa36-7e774b47c207',
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
    getFilmById(filmId: number) {
        return instance.get<CurrentFilmType>(`/films/${filmId}`)
    }
}