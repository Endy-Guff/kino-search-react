import axios from "axios";
import {CurrentFilmDataType, CurrentFilmType, FilmPersonType, FilmsDataType} from "../redux/dataReducer";

export const instance = axios.create({
    baseURL: 'https://kinopoiskapiunofficial.tech/api/v2.2',
    headers: {
        'X-API-KEY': '76f85d49-322b-4a5c-a170-0514b7c032c6',
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
        const film = instance.get<CurrentFilmDataType>(`/films/${filmId}`)
        const filmPersons = instance.get<FilmPersonType[]>(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${filmId}`)
        return Promise.all([film, filmPersons])
    }

}