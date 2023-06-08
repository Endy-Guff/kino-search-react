import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Header} from "./components/Header/Header";
import {Main} from "./components/Main/Main";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import {Preloader} from "./components/common/Preloader";
import {Menu} from "./components/Menu/Menu";

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="App">
                    <Preloader />
                    <Menu />
                    <Header/>
                    <Main/>
                </div>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
