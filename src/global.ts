import { createContext } from 'react';
import {Book} from "epubjs";

export const EpubContext = createContext({epub: new Book(), setEpub:(_: Book)=>{}});