import {  Rendition } from "epubjs";

export interface ReaderProps {
    url: string;
    title: string;
    location: string | number;
    locationChanged: (loc: string) => void;
    getRendition: (_rendition: Rendition) => void;
}

export type SetReaderProps = React.Dispatch<React.SetStateAction<ReaderProps>>;

