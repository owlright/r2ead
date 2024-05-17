// import './App.css';
import "./Main.css";
import Sidebar from "./reader/Sidebar";
import Titlebar from "./reader/Titlebar";
import { useRef, useState } from 'react';
import type { Contents, Rendition } from 'epubjs'
import { ReactReader } from '../lib/index';
import { ReaderProps } from "./global";

// export const DEMO_URL = '/files/alice.epub';
export const DEMO_URL = '';
// export const DEMO_NAME = 'Alice in wonderland';
export const DEMO_NAME = '';

function Main() {
    const [largeText, setLargeText] = useState(false);
    const rendition = useRef<Rendition | undefined>(undefined);
    const [location, setLocation] = useState<string | number>(0);
    const [readerProps, setReaderProps] = useState<ReaderProps>({
        url: DEMO_URL,
        title: DEMO_NAME,
        location: location,
        locationChanged: (loc: string) => setLocation(loc),
        getRendition: (_rendition: Rendition) => {
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
        }
    });

    return (
        <div id="main">
            <Titlebar {...readerProps} setReaderProps={setReaderProps} />
            <div id="divider"></div>
            <ReactReader
                {...readerProps}
            />
        </div>
    );
}

export default function App() {
    return (
        <div className="App">
            <Sidebar />
            <Main />
        </div>
    );
}
