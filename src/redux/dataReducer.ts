const SET_FILMS = 'SET_FILMS'
const CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE'

type SetFilmsACType = {
    type: 'SET_FILMS'
    state: FilmsDataType
}

type changeSearchInputValueACType = {
    type: 'CHANGE_SEARCH_VALUE'
    value: string
}

export type FilmsType = {
    filmId: number
    nameRu: string
    year: string
    filmLength: string
    countries: [country: string]
    genres: [genre: string]
    rating: string
    posterUrl: string
    posterUrlPreview: string
    description?: string
}

export type FilmsDataType = {
    keyword?: string
    pagesCount: number
    films: FilmsType[]
}

type RootStateType = {
    filmsData: FilmsDataType
    searchInputValue: string
}

type ActionsType = SetFilmsACType | changeSearchInputValueACType

const initialState: RootStateType = {
    filmsData: {
        keyword: '',
        pagesCount: 0,
        films: []
    },
    searchInputValue: ''
}

export const dataReducer = (state:RootStateType = initialState, action: ActionsType): RootStateType =>{
    switch (action.type){
        case SET_FILMS:
            return {...state, filmsData: action.state}
        case CHANGE_SEARCH_VALUE:
            return {...state, searchInputValue: action.value}

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