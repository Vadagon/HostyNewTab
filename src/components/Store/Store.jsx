export const save = (data, storage) => {
    const { store, setStore } = storage;
    localStorage.setItem('data', JSON.stringify(data));
    setStore && setStore(Object.assign(store, data));
    chrome.storage.sync.set({ data: data });
};

export const get = () => {
    var localData = localStorage.getItem('data');
    return localData;
    // chrome.storage.sync.get(['data'], function(result) {
    //   return result.data;
    // });
};