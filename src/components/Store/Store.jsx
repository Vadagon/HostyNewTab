export const initial_store = {
    l10n: {},
    settings: {
        lang: 'uk',
        theme: 'dark',
        search_box: {
            color: '#202124', font_color: '#202124', icon_color: '#202124'
        },
        time: {
            delay: 20000, format: 24
        },
        background: { custom: null, selected: 0 },
        folders: [
            {
                name: 'Welcome', font_color: '#202124', preview: null, bookmarks: [
                    { position: { x: 4, y: 4 }, name: null, url: null, preview: null },
                    { position: { x: 5, y: 4 }, name: null, url: null, preview: null },
                    { position: { x: 6, y: 4 }, name: null, url: null, preview: null },
                    { position: { x: 7, y: 4 }, name: null, url: null, preview: null },
                    { position: { x: 8, y: 4 }, name: null, url: null, preview: null }
                ]
            }
        ],
        activeFolder: 0
    }
};

export const save = (data, storage) => {
    const { store, setStore } = storage;
    localStorage.setItem('data', JSON.stringify(data));
    setStore && setStore(Object.assign(store, data));
    chrome.storage.sync.set({ data: data });
};

export const get = () => {
    var localData = localStorage.getItem('data');
    return localData ? JSON.parse(localData) : initial_store;
    // chrome.storage.sync.get(['data'], function(result) {
    //   return result.data;
    // });
};
