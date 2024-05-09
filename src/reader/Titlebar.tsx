import { useRef, useState, ChangeEvent, useContext } from "react";
import { Book, Rendition } from "epubjs"; // Import the ePub library
import { EpubContext, RenderContext } from "../global";

function FilePicker({ setBook }: { setBook: (book: BookInfo) => void }) {
    const { setEpub } = useContext(EpubContext);
    const { setRendition } = useContext(RenderContext);
    // To trigger the file input dialog when the button is clicked, you can use a reference to the file input element and programmatically click it when the button is clicked. Here's how you can do it using React's useRef hook:
    const fileInput = useRef<HTMLInputElement>(null);
    const handleButtonClick = (_event: React.MouseEvent<HTMLButtonElement>) => {
        // Programmatically click the file input when the button is clicked
        console.log("点击了按钮");
        fileInput.current?.click();
    };

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;

        if (selectedFile) {
            const reader = new FileReader();
            console.log("选择的文件:", selectedFile);
            let book = new Book();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload = (event) => {
                const bookData = event.target!.result as ArrayBuffer;
                book.open(bookData);
            };
            book.ready.then(async () => {
                let arr = await book.loaded.metadata; // Access the metadata property of the book object
                let bookName = arr.title;
                setEpub(book);
                setBook(new BookInfo(bookName, "章节名"));
                let rendition = book.renderTo("viewer", {
                    ignoreClass: "annotator-hl",
                    width: "100%",
                    height: "100%",
                })
                setRendition(rendition);
                rendition.display();
            });

        } else {
            console.log("用户取消了选择");
        }
    };

    return (
        <button
            id="openfile"
            className="icon-download-cloud"
            onClick={handleButtonClick}
        >
            <span>打开书籍</span>
            <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileSelect}
                ref={fileInput}
            />
        </button>
    );
};

// 定义结构体对象的构造函数
class BookInfo {
    constructor(public bookName: string, public chapterTitle: string) { }
}

export default function Titlebar() {
    const [book, setBook] = useState(new BookInfo("书名", "章节名"));
    const [epb, setEpub] = useState(new Book());
    const [rendition, setRendition] = useState(new Rendition(new Book(), {}));
    return (
        <EpubContext.Provider value={{ epub: epb, setEpub: setEpub }}>
        <RenderContext.Provider value={{ rendition: rendition, setRendition: setRendition }}>
            <div id="titlebar">
                <div id="opener">
                    <button id="silder" className="icon-menu"></button>
                </div>

                <div id="metainfo">
                    <span id="book-title">{book.bookName}</span>
                    <span id="title-seperator" style={{ display: "inline" }}>
                        &nbsp;&nbsp;–&nbsp;&nbsp;
                    </span>
                    <span id="chapter-title">{book.chapterTitle}</span>
                </div>

                <div id="title-controls">
                    <FilePicker setBook={setBook} />
                    {/* <button id="openfile" className="icon-download-cloud" onClick={handleHrefClick}><FilePicker /></button> */}
                    <button id="bookmark" className="icon-bookmark-empty">
                        Bookmark
                    </button>
                    <button id="setting" className="icon-cog">
                        Settings
                    </button>
                    <button id="fullscreen" className="icon-resize-full">
                        Fullscreen
                    </button>
                </div>
            </div>
        </RenderContext.Provider>
        </EpubContext.Provider>
    );
};
