import React, {useRef} from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Main} from "./components/Main/Main";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {HashRouter} from "react-router-dom";
import {Preloader} from "./components/common/Preloader/Preloader";
import ErrorNotification from "./components/common/ErrorNotification/ErrorNotification";


function App() {
    return (
        <HashRouter>
            <Provider store={store}>
                <div className="App">
                    <ErrorNotification />
                    <Preloader />
                    <Header/>
                    <Main/>
                </div>
            </Provider>
        </HashRouter>
    );
}

export default App;
