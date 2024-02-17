const Sidebar = () => {
    return (<div id="sidebar">
        <div id="panels">
            {/* {<input id="searchBox" placeholder="search" type="search">} */}

            {/* <a id="show-Search" className="show_view icon-search" data-view="Search">Search</a> */}
            <button id="show-Toc" className="show_view icon-list-1 active" data-view="Toc">TOC</button>
            <button id="show-Bookmarks" className="show_view icon-bookmark" data-view="Bookmarks">Bookmarks</button>
            {/* <a id="show-Notes" className="show_view icon-edit" data-view="Notes">Notes</a> */}

        </div>
        <div id="tocView" className="view">
        </div>
        <div id="searchView" className="view">
            <ul id="searchResults"></ul>
        </div>
        <div id="bookmarksView" className="view">
            <ul id="bookmarks"></ul>
        </div>
        <div id="notesView" className="view">
            <div id="new-note">
                <textarea id="note-text"></textarea>
                <button id="note-anchor">Anchor</button>
            </div>
            <ol id="notes"></ol>
        </div>

    </div>);
}
export default Sidebar;