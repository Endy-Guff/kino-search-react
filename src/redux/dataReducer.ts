import {Dispatch} from "redux";
import {api} from "../api/api";
import {RootStateType} from "./store";

type SetErrorACType = ReturnType<typeof setErrorAC>
type SetFilmsACType = ReturnType<typeof setFilmsAC>
type changeSearchInputValueACType = ReturnType<typeof changeSearchInputValueAC>
type setCurrentPageACType = ReturnType<typeof setCurrentPageAC>
type setPageTitleACType = ReturnType<typeof setPageTitleAC>
type setSearchValueACType = ReturnType<typeof setSearchValueAC>
type setModeACType = ReturnType<typeof setModeAC>
type changeIsLoaderACType = ReturnType<typeof changeIsLoaderAC>
type setPreviousModeACType = ReturnType<typeof setPreviousModeAC>
type setCurrentFilmACType = ReturnType<typeof setCurrentFilmAC>
export type ModeType = 'TOP_250' | 'SEARCH' | 'CURRENT_FILM' | 'TOP_100_POPULAR_FILMS' | 'TOP_AWAIT_FILMS'
export type TopModeType = 'TOP_250_BEST_FILMS' | 'TOP_100_POPULAR_FILMS' | 'TOP_AWAIT_FILMS'
export type FilmsType = {
    filmId: number
    nameRu: string
    year: string
    filmLength: string
    countries: CountriesType[]
    genres: GenresType[]
    rating: string
    posterUrl: string
    posterUrlPreview: string
    description?: string
}
export type CountriesType = {
    country: string
}
export type GenresType = {
    genre: string
}
export type FilmsDataType = {
    keyword?: string
    pagesCount: number
    films: FilmsType[]
}
export type StateType = {
    currentFilm: CurrentFilmType
    currentFilmId: string
    filmsData: FilmsDataType
    pageTitle: string
    searchChangeInputValue: string
    searchValue: string
    currentPage: number
    mode: ModeType
    previousMode: ModeType
    isLoader: boolean,
    error: string
}
export type CurrentFilmType = {
    currentFilmData: CurrentFilmDataType
    filmPersons: FilmPersonType[]
}
export type CurrentFilmDataType = null | {
    kinopoiskId: number
    imdbId: string,
    nameRu: string,
    nameEn: string
    nameOriginal: string
    posterUrl: string
    posterUrlPreview: string
    coverUrl: string
    logoUrl: string
    reviewsCount: number
    ratingGoodReview: number
    ratingGoodReviewVoteCount: number
    ratingKinopoisk: number
    ratingKinopoiskVoteCount: number
    ratingImdb: number
    ratingImdbVoteCount: number
    ratingFilmCritics: number
    ratingFilmCriticsVoteCount: number
    ratingAwait: number
    ratingAwaitCount: number
    ratingRfCritics: number
    ratingRfCriticsVoteCount: number
    webUrl: string
    year: number
    filmLength: number
    slogan: string
    description: string
    shortDescription: string
    editorAnnotation: string
    isTicketsAvailable: boolean
    productionStatus: string
    type: string
    ratingMpaa: string
    ratingAgeLimits: string
    countries: CountriesType[]
    genres: GenresType[]
    startYear: number
    endYear: number
    serial: boolean
    shortFilm: boolean
    completed: boolean
    hasImax: boolean
    has3D: boolean
    lastSync: string
}
export type FilmPersonType = {
    staffId: number
    nameRu: string
    nameEn: string
    description: string
    posterUrl: string
    professionText: string
    professionKey: string
}

type ActionsType = SetFilmsACType | changeSearchInputValueACType | setCurrentPageACType | setPageTitleACType
    | setSearchValueACType | setModeACType | changeIsLoaderACType | setPreviousModeACType | setCurrentFilmACType
    | SetErrorACType

const initialState: StateType = {
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

export const dataReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case 'SET_FILMS':
            return {...state, filmsData: action.state}
        case 'CHANGE_SEARCH_VALUE':
            return {...state, searchChangeInputValue: action.value}
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.pageNumber}
        case 'SET_PAGE_TITLE':
            return {...state, pageTitle: action.title}
        case 'SET_SEARCH_VALUE':
            return {...state, searchValue: action.value}
        case 'SET_MODE':
            return {...state, mode: action.mode, currentPage: 1}
        case 'CHANGE_IS_LOADER':
            return {...state, isLoader: action.isLoader}
        case 'SET_PREVIOUS_MODE':
            return {...state, previousMode: action.mode}
        case 'SET_CURRENT_FILM':
            return {
                ...state,
                currentFilm: {...state.currentFilm, currentFilmData: action.currentFilm, filmPersons: action.persons}
            }
        case 'SET_ERROR': return {...state, error: action.error}
        default:
            return state
    }
}

export const setFilmsAC = (state: FilmsDataType) => ({type: 'SET_FILMS', state} as const)
export const changeSearchInputValueAC = (value: string) =>
    ({type: 'CHANGE_SEARCH_VALUE', value} as const)
export const setCurrentPageAC = (pageNumber: number) =>
    ({type: 'SET_CURRENT_PAGE', pageNumber} as const)
export const setPageTitleAC = (title: string) => ({type: 'SET_PAGE_TITLE', title} as const)
export const setSearchValueAC = (value: string) => ({type: 'SET_SEARCH_VALUE', value} as const)
export const setModeAC = (mode: ModeType) => ({type: 'SET_MODE', mode} as const)
export const changeIsLoaderAC = (isLoader: boolean) =>
    ({type: 'CHANGE_IS_LOADER', isLoader} as const)
export const setPreviousModeAC = (mode: ModeType) =>
    ({type: 'SET_PREVIOUS_MODE', mode} as const)
export const setCurrentFilmAC = (currentFilm: CurrentFilmDataType, persons: FilmPersonType[]) =>
({type: 'SET_CURRENT_FILM', currentFilm, persons} as const)
export const setErrorAC = (error: string) =>({type: 'SET_ERROR', error} as const)

export const getFilmTC = (searchValue: string = '', mode: TopModeType = 'TOP_250_BEST_FILMS') => {
    return (dispatch: Dispatch<ActionsType>, getState: () => RootStateType) => {
        const state = getState().data
        dispatch(changeIsLoaderAC(true))
        if (!searchValue) {
            api.getFilm(state.currentPage, mode)
                .then(response => {
                    dispatch(setFilmsAC(response.data))
                    dispatch(changeIsLoaderAC(false))
                })
                .catch(()=>{
                    dispatch(changeIsLoaderAC(false))
                    dispatch(setErrorAC('Sorry, something wrong'))
                })
            if (mode==='TOP_250_BEST_FILMS'){
                dispatch(setPageTitleAC('Топ 250 лучших фильмов'))
            }
            if (mode==='TOP_100_POPULAR_FILMS'){
                dispatch(setPageTitleAC('Топ 100 популярных фильмов'))
            }
            if (mode==='TOP_AWAIT_FILMS'){
                dispatch(setPageTitleAC('Топ ожидающих фильмов'))
            }
        }
        if (searchValue) {
            api.getSearchFilm(state.currentPage, state.searchValue)
                .then(response => {
                    dispatch(setFilmsAC(response.data))
                    dispatch(changeIsLoaderAC(false))
                })
                .catch(()=>{
                    dispatch(changeIsLoaderAC(false))
                    dispatch(setErrorAC('Sorry, something wrong'))
                })
            dispatch(setPageTitleAC(`Результаты поискового запроса: ${state.searchValue}`))
        }
    }
}

export const getCurrentFilmTC = (filmId: string) => {
    return (dispatch: Dispatch<ActionsType>) =>{
        dispatch(changeIsLoaderAC(true))
        api.getFilmById(filmId)
            .then(response => {
                dispatch(setCurrentFilmAC(response[0].data, response[1].data))
            })
            .catch(()=>{
                dispatch(changeIsLoaderAC(false))
                dispatch(setErrorAC('Sorry, something wrong'))
            })
            .finally(()=>dispatch(changeIsLoaderAC(false)))
    }
}