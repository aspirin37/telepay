export default {
    get: (label, isSession) => JSON.parse(window[isSession ? 'sessionStorage' : 'localStorage'].getItem(label) || 'false'),
    set: (label, data, isSession) => window[isSession ? 'sessionStorage' : 'localStorage'].setItem(label, JSON.stringify(data)),
    rm: (label, isSession) => window[isSession ? 'sessionStorage' : 'localStorage'].removeItem(label),
    clear: () => {
        window.localStorage.clear();
        window.sessionStorage.clear();
    },
    clearLocal: () => { window.localStorage.clear(); },
    clearSession: () => { window.sessionStorage.clear(); },
};
