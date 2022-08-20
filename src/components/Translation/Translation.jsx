import React, { useContext } from 'react';
import { UserContext } from '../../pages/Newtab/context';

export const langsShorhands = ['en', 'de', 'es', 'fr', 'ru', 'uk']

export const getAcceptLanguages = async () => {
    return new Promise((resolve, reject) => {
        chrome.i18n.getAcceptLanguages(function (languageList) {
            resolve(languageList);
        });
    });
};

export const getLocalisations = ({ store, setStore }) => {
    if (!store) store = {}
    const l10n = localStorage.getItem('l10n');
    if (l10n?.length) {
        var l10nJSON = JSON.parse(l10n);
        // setStore && setStore(Object.assign(store, { l10n: l10nJSON }));
        // l10nJSON;
    }

    loadLocalisations({ store, setStore })
    // var languageList = await getAcceptLanguages();

    var d = Object.assign(store, { l10n: l10nJSON })
    setStore && setStore(d);
    return d;
}
export const loadLocalisations = async ({ store, setStore }) => {
    var list = {};
    for (let index = 0; index < langsShorhands.length; index++) {
        var file = chrome.runtime.getURL(
            '_locales/' + langsShorhands[index] + '/messages.json'
        );
        let res = await fetch(file).then((response) => response.json());
        list[langsShorhands[index]] = res;
    }
    // console.log(store)
    localStorage.setItem('l10n', JSON.stringify(list));
    setStore && setStore(Object.assign(store, { l10n: list }));
    return list;
};

export const i18n = (str, { store }) => {
    var locale = store.l10n?.[store.settings.lang];
    var tr = locale?.[str]?.message;
    return tr ?? str;
}

export function I18n(prop) {
    const store = useContext(UserContext);
    return <span className="i18n">{i18n(prop.children, store)}</span>;
}

export default I18n;
