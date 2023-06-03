import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {dataReducer} from "./dataReducer";
import {ThunkDispatch} from "redux-thunk";
import thunk from 'redux-thunk'
import {useDispatch} from "react-redux";



const rootReducer = combineReducers({
    data: dataReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>
type AppDispatchType = ThunkDispatch<RootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()

//@ts-ignore
window.store = store