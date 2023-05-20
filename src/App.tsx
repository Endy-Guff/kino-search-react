import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Header} from "./components/Header/Header";
import {Main} from "./components/Main/Main";
import {Provider} from "react-redux";
import {store} from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Header/>
                <Main/>
            </div>
        </Provider>
    );
}

export default App;
