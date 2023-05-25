import {combineReducers, createStore} from "redux";
import {dataReducer} from "./dataReducer";
import axios from "axios";

export type RootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    data: dataReducer
})

export const store = createStore(rootReducer)



//@ts-ignore
window.store = store