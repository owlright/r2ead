// import './App.css';
import "./Main.css";
import Sidebar from "./reader/Sidebar";
import Titlebar from "./reader/Titlebar";
function Main() {
    return (
        <div id="main">
            <Titlebar />
            <div id="divider"></div>
            <div id="prev" className="arrow">
                ‹
            </div>
            <div id="viewer"></div>
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
