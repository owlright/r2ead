// import './App.css';
import "./Main.css";
import Sidebar from "./reader/Sidebar";
import Titlebar from "./reader/Titlebar";
import { useContext, useEffect, useRef } from 'react';
import { EpubContext, RenderContext } from "./global";

function Main() {
    const prevElement = useRef<HTMLDivElement>(null);
    const nextElement = useRef<HTMLDivElement>(null);
    const { rendition } = useContext(RenderContext);
    const { epub } = useContext(EpubContext);
    const prevClickHandler = () => {
        if (rendition) {
            rendition.prev();
        }
    };

    const nextClickHandler = () => {
        if (rendition) {
            epub.ready.then(() => {
                console.log(epub.loaded.metadata);
            });
            rendition.next();
        }
    };

    useEffect(() => {
        // console.log(epub);
        console.log(rendition);
        prevElement.current?.addEventListener('click', prevClickHandler);
        nextElement.current?.addEventListener('click', nextClickHandler);
    }, []);

    return (
        <div id="main">
            <Titlebar />
            <div id="divider"></div>
            <div ref={prevElement} id="prev" className="arrow">
                ‹
            </div>
            <div id="viewer"></div>
            <div ref={nextElement} id="next" className="arrow">
                ›
            </div>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Sidebar />
            <Main />
        </div>
    );
}

export default App;
