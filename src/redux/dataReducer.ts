const SET_FILMS = 'SET_FILMS'
const CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE'
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_PAGE_TITLE = 'SET_PAGE_TITLE'
const SET_MODE = 'SET_MODE'

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
    mode: 'TOP_250' | 'SEARCH'
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

type ModeType = 'TOP_250' | 'SEARCH'

export type FilmsDataType = {
    keyword?: string
    pagesCount: number
    films: FilmsType[]
}

export type StateType = {
    filmsData: FilmsDataType
    pageTitle: string
    searchChangeInputValue: string
    searchValue: string
    currentPage: number
    mode: ModeType
}

type ActionsType = SetFilmsACType | changeSearchInputValueACType | setCurrentPageACType | setPageTitleACType
| setSearchValueACType | setModeACType

const initialState: StateType = {
    filmsData: {
        keyword: '',
        pagesCount: 0,
        films: []
    },
    pageTitle: 'Топ фильмов',
    searchChangeInputValue: '',
    searchValue: '',
    mode: 'TOP_250',
    currentPage: 1
}

export const dataReducer = (state:StateType = initialState, action: ActionsType): StateType =>{
    switch (action.type){
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
        default:
            return state
    }
}

export const setFilmsAC = (state: FilmsDataType): SetFilmsACType =>{
    return{
        type: SET_FILMS,
        state
    }
}

export const changeSearchInputValueAC = (value: string): changeSearchInputValueACType =>{
    return {
        type: CHANGE_SEARCH_VALUE,
        value
    }
}

export const setCurrentPageAC = (pageNumber: number): setCurrentPageACType =>{
    return {
        type: SET_CURRENT_PAGE,
        pageNumber
    }
}

export const setPageTitleAC = (title: string): setPageTitleACType =>{
    return {
        type: SET_PAGE_TITLE,
        title
    }
}

export const setSearchValueAC = (value: string): setSearchValueACType =>{
    return{
        type: SET_SEARCH_VALUE,
        value
    }
}

export const setModeAC = (mode: ModeType): setModeACType =>{
    return{
        type: SET_MODE,
        mode
    }
}