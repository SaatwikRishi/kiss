import moment from "moment-timezone"
moment.tz.setDefault('America/Los_Angeles')
let userState = {
    date: moment().format('YYYY-MM-DD'),
}

export default function (state = userState, action) {

    if (action.type === 'UPDATE_DATE') {
        const date = action.payload;
        return {
            ...state,
            date:date
        }
    }
    return state;
}
