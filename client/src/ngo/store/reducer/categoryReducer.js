import moment from "moment-timezone"
moment.tz('America/Los_Angeles')
let userState = {
    loaded:false,
}

export default function (state = userState, action) {

    if (action.type === 'GET_ALLCATEGORIES') {
        const data = action.payload;
        return {
            ...state,
            loading: true,
            list: data
        }
    }
    return state;
}
