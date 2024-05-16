// import './App.css';
import "./Main.css";
import Sidebar from "./reader/Sidebar";
import Titlebar from "./reader/Titlebar";
import { useContext, useEffect, useRef, useState } from 'react';
import { EpubContext, RenderContext } from "./global";
import type { Contents, Rendition } from 'epubjs'
import { ReactReader } from '../lib/index';
export const DEMO_URL = '/files/alice.epub';
export const DEMO_NAME = 'Alice in wonderland';

function Main() {
    // const prevElement = useRef<HTMLDivElement>(null);
    // const nextElement = useRef<HTMLDivElement>(null);
    // const { rendition } = useContext(RenderContext);
    // const { epub } = useContext(EpubContext);
    // const prevClickHandler = () => {
    //     if (rendition) {
    //         rendition.prev();
    //     }
    // };

    // const nextClickHandler = () => {
    //     if (rendition) {
    //         epub.ready.then(() => {
    //             console.log(epub.loaded.metadata);
    //         });
    //         rendition.next();
    //     }
    // };

    // useEffect(() => {
    //     // console.log(epub);
    //     console.log(rendition);
    //     prevElement.current?.addEventListener('click', prevClickHandler);
    //     nextElement.current?.addEventListener('click', nextClickHandler);
    // }, []);
    const [largeText, setLargeText] = useState(false);
    const rendition = useRef<Rendition | undefined>(undefined);
    const [location, setLocation] = useState<string | number>(0);
    return (
        <div id="main">
            <Titlebar />
            <div id="divider"></div>
            <div id="prev" className="arrow">
                ‹
            </div>
            <ReactReader
                url={DEMO_URL}
                title={DEMO_NAME}
                location={location}
                locationChanged={(loc: string) => setLocation(loc)}
                getRendition={(_rendition: Rendition) => {
                    rendition.current = _rendition
                    _rendition.hooks.content.register((contents: Contents) => {
                        const body = contents.window.document.querySelector('view')
                        if (body) {
                            body.oncontextmenu = () => {
                                return false
                            }
                        }
                    })
                    rendition.current.themes.fontSize(largeText ? '140%' : '100%')
                }}
            />
            <div id="next" className="arrow">
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
