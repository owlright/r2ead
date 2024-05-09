import { createContext } from 'react';
import {Book, Rendition} from "epubjs";

export const EpubContext = createContext({epub: new Book(), setEpub:(_: Book)=>{}});
export const RenderContext = createContext({rendition: new Rendition(new Book(), {}), setRendition:(_: Rendition)=>{}});