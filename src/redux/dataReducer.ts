const SET_FILMS = 'SET_FILMS'
const CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE'
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_PAGE_TITLE = 'SET_PAGE_TITLE'
const SET_MODE = 'SET_MODE'
const CHANGE_IS_LOADER = 'CHANGE_IS_LOADER'
const SET_CURRENT_FILM = 'SET_CURRENT_FILM'
const SET_CURRENT_FILM_ID = 'SET_CURRENT_FILM_ID'

type SetFilmsACType = {
    type: 'SET_FILMS'
    state: FilmsDataType
}

type changeSearchInputValueACType = {
    type: 'CHANGE_SEARCH_VALUE'
    value: string
}

type setCurrentPageACType = {
    type: 'SET_CURRENT_PAGE'
    pageNumber: number
}

type setPageTitleACType = {
    type: 'SET_PAGE_TITLE',
    title: string
}

type setSearchValueACType = {
    type: 'SET_SEARCH_VALUE'
    value: string
}

type setModeACType = {
    type: 'SET_MODE'
    mode: ModeType
}

type changeIsLoaderACType = {
    type: 'CHANGE_IS_LOADER'
    isLoader: boolean
}

type setCurrentFilmIdACType = {
    type: 'SET_CURRENT_FILM_ID'
    currentFilmId: string
}

type setCurrentFilmACType ={
    type: 'SET_CURRENT_FILM'
    currentFilm: CurrentFilmType
}

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

type ModeType = 'TOP_250' | 'SEARCH' | 'CURRENT_FILM'

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
    isLoader: boolean
}

export type CurrentFilmType = null | {
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


type ActionsType = SetFilmsACType | changeSearchInputValueACType | setCurrentPageACType | setPageTitleACType
    | setSearchValueACType | setModeACType | changeIsLoaderACType | setCurrentFilmIdACType | setCurrentFilmACType

const initialState: StateType = {
    filmsData: {
        keyword: '',
        pagesCount: 0,
        films: []
    },
    currentFilm: null,
    currentFilmId: '0',
    pageTitle: 'Топ фильмов',
    searchChangeInputValue: '',
    searchValue: '',
    mode: 'TOP_250',
    isLoader: false,
    currentPage: 1
}

export const dataReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case SET_FILMS:
            return {...state, filmsData: action.state}
        case CHANGE_SEARCH_VALUE:
            return {...state, searchChangeInputValue: action.value}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.pageNumber}
        case SET_PAGE_TITLE:
            return {...state, pageTitle: action.title}
        case SET_SEARCH_VALUE:
            return {...state, searchValue: action.value}
        case SET_MODE:
            return {...state, mode: action.mode}
        case CHANGE_IS_LOADER:
            return {...state, isLoader: action.isLoader}
        case SET_CURRENT_FILM_ID:
            return {...state, currentFilmId: action.currentFilmId}
        case SET_CURRENT_FILM:
            return {...state, currentFilm: action.currentFilm}
        default:
            return state
    }
}

export const setFilmsAC = (state: FilmsDataType): SetFilmsACType => {
    return {
        type: SET_FILMS,
        state
    }
}

export const changeSearchInputValueAC = (value: string): changeSearchInputValueACType => {
    return {
        type: CHANGE_SEARCH_VALUE,
        value
    }
}

export const setCurrentPageAC = (pageNumber: number): setCurrentPageACType => {
    return {
        type: SET_CURRENT_PAGE,
        pageNumber
    }
}

export const setPageTitleAC = (title: string): setPageTitleACType => {
    return {
        type: SET_PAGE_TITLE,
        title
    }
}

export const setSearchValueAC = (value: string): setSearchValueACType => {
    return {
        type: SET_SEARCH_VALUE,
        value
    }
}

export const setModeAC = (mode: ModeType): setModeACType => {
    return {
        type: SET_MODE,
        mode
    }
}

export const changeIsLoaderAC = (isLoader: boolean): changeIsLoaderACType => {
    return {
        type: CHANGE_IS_LOADER,
        isLoader
    }
}

export const setCurrentFilmIdAC = (currentFilmId: string): setCurrentFilmIdACType =>{
    return{
        type : SET_CURRENT_FILM_ID,
        currentFilmId
    }
}

export const setCurrentFilmAC = (currentFilm: CurrentFilmType): setCurrentFilmACType =>{
    return{
        type : SET_CURRENT_FILM,
        currentFilm
    }
}