import { useRef, useState, ChangeEvent } from "react";
import ePub from "epubjs"; // Import the ePub library

const FilePicker = ({ setBook }: { setBook: (book: Book) => void }) => {
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
            const book = ePub();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload = (event) => {
                const bookData = event.target!.result as ArrayBuffer;
                const ebook = book.open(bookData);
                ebook.then((book) => {
                    console.log(book);
                });
            };
            book.ready.then(async () => {
                const arr = await book.loaded.metadata; // Access the metadata property of the book object
                const bookName = arr.title;
                setBook(new Book(bookName, "章节名"));
            });
            book.renderTo("viewer", {
                ignoreClass: "annotator-hl",
                width: "100%",
                height: "100%",
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
class Book {
    constructor(public bookName: string, public chapterTitle: string) {}
}

const Titlebar = () => {
    const [book, setBook] = useState(new Book("书名", "章节名"));

    return (
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
    );
};
export default Titlebar;
