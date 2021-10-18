import moment from "moment-timezone"
moment.tz.setDefault('America/Los_Angeles')
let userState = {
    loaded:false,
    country: 'all',
    date: moment().format('YYYY-MM-DD'),
}

export default function (state = userState, action) {

    if (action.type === 'UPDATE_DASHBOARD') {
        const data = action.payload;
        const date = action.date;
        const country = action.country;
        return {
            ...state,
            loaded:true,
            [date]:{
                ...(state[date] && state[date]),
                [country]:{
                    ...(state[date] && state[date] && state[date][country] && state[date][country]),
                    ...data
                }
            }
        }
    }
    if (action.type === 'UPDATE_DATE') {
        const date = action.payload;
        return {
            ...state,
            date:date
        }
    }
    if (action.type === 'UPDATE_SEARCH') {
        const text = action.payload;
        return {
            ...state,
            text:text
        }
    }
    if (action.type === 'UPDATE_UTILITY_DATA') {
        const data = action.payload;
        return { ...state, ...data }
    }
    if (action.type === 'UPDATE_COUNTRY_VALUE') {
        const country = action.payload;
        return { 
            ...state, 
            country:country
        }
    }
    if (action.type === 'UPDATE_EVENT') {
        const text = action.payload;
        return { ...state }     
    }
    return state;
}
