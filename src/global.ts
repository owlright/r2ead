import React from "react";
import Book from "epubjs";
import { useState } from "react";
const [epub, setEpub] = useState(Book());
const GLOBAL = React.createContext({ epub, setEpub });
export default GLOBAL;