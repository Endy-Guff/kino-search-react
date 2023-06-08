import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Header} from "./components/Header/Header";
import {Main} from "./components/Main/Main";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import {Preloader} from "./components/common/Preloader";

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="App">
                    <Preloader />
                    <Header/>
                    <Main/>
                </div>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
