import {combineReducers, createStore} from "redux";
import {dataReducer} from "./dataReducer";
import axios from "axios";

export type RootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    data: dataReducer
})

export const store = createStore(rootReducer)

export const instance = axios.create({
    baseURL: 'https://kinopoiskapiunofficial.tech/api/v2.2',
    headers: {
        'X-API-KEY': 'bf4d11b7-7ada-4f2a-aa36-7e774b47c207',
        'Content-Type': 'application/json',
    }
});

//@ts-ignore
window.store = store