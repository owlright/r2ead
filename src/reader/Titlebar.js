import { useRef, useState } from 'react';
import ePub from 'epubjs'; // Import the ePub library

const FilePicker = ({ setBook }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      console.log('选择的文件:', selectedFile);


      const book = new ePub();
      reader.readAsArrayBuffer(selectedFile)
      reader.onload = (event) => {
        const bookData = event.target.result;
        book.open(bookData);
        console.log(book);
      }
      book.ready.then((arr)=>{
        const bookName = arr[2]['title'];
        console.log(bookName);
        setBook(new Book(bookName, "章节名"));
      });
      book.renderTo("viewer", {
        ignoreClass: "annotator-hl",
        width: "100%",
        height: "100%"
      });

    } else {

      console.log('用户取消了选择');
    }
  };

  return (
    <button id="openfile" className="icon-download-cloud" onClick={() => fileInputRef.current.click()}>
      <span>打开书籍</span>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileSelect} />
    </button>
  );
}

// 定义结构体对象的构造函数
function Book(bookName, chapterTitle) {
  this.bookName = bookName;
  this.chapterTitle = chapterTitle;
}

const Titlebar = () => {
  const [book, setBook] = useState(new Book("书名", "章节名"));

  return (<div id="titlebar">
    <div id="opener">
      <button id="silder" className="icon-menu"></button>
    </div>

    <div id="metainfo">
      <span id="book-title">{book.bookName}</span>
      <span id="title-seperator" style={{ display: 'inline' }}>&nbsp;&nbsp;–&nbsp;&nbsp;</span>
      <span id="chapter-title">{book.chapterTitle}</span>
    </div>

    <div id="title-controls">
      <FilePicker setBook={setBook} />
      {/* <button id="openfile" className="icon-download-cloud" onClick={handleHrefClick}><FilePicker /></button> */}
      <button id="bookmark" className="icon-bookmark-empty">Bookmark</button>
      <button id="setting" className="icon-cog">Settings</button>
      <button id="fullscreen" className="icon-resize-full">Fullscreen</button>
    </div>
  </div>);
}
export default Titlebar;