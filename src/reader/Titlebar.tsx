import { useRef, useState, ChangeEvent } from "react";
import { Book} from "epubjs"; // Import the ePub library
import { ReaderProps, type SetReaderProps } from "../global";


function FilePicker({ setReaderProps }: { setReaderProps: SetReaderProps }) {

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
                // setBook(new BookInfo(bookName, "章节名"));
                setReaderProps(prevProps => ({
                    ...prevProps,
                    title: bookName,
                    url: '/files/alice.epub',
                }));
            });

        } else {
            console.log("用户取消了选择");
        }
    };

    return (
        <div>
            <button
                id="openfile"
                className="icon-download-cloud"
                onClick={handleButtonClick}
            >
                <span>打开书籍</span>

            </button>
            <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                    ref={fileInput}
                />
        </div>

    );
};

export default function Titlebar(props: ReaderProps & {
    setReaderProps: SetReaderProps;
}) {

    return (
        <div id="titlebar">
            <div id="opener">
                <button id="silder" className="icon-menu"></button>
            </div>

            <div id="metainfo">
                <span id="book-title">{"TODO"}</span>
                <span id="title-seperator" style={{ display: "inline" }}>
                    &nbsp;&nbsp;–&nbsp;&nbsp;
                </span>
                <span id="chapter-title">{"TODO"}</span>
            </div>

            <div id="title-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <FilePicker setReaderProps={props.setReaderProps} />
                {/* <button id="openfile" className="icon-download-cloud"
                onClick={handleHrefClick}><FilePicker /></button> */}
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
