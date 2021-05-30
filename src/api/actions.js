import config from './config';

export const getCurrentConditions = (locationKey) => {
    return fetch(config.CURRENT_CONDITIONS_ENDPOINT + locationKey + `?apikey=${config.API_KEY}`)
        .then(res => res.json());
}

export const getAutoComplete = (query) => {
    return fetch(config.AUTOCOMPLETE_ENDPOINT + `?apikey=${config.API_KEY}&q=${query}`)
        .then(res => res.json());
}

export const get5DayForcast = (locationKey) => {
    return fetch(config.FIVE_DAY_FORCAST_ENDPOINT+ locationKey + `apikey=${config.API_KEY}`)
        .then(res => res.json());
}