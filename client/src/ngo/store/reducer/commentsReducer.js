import moment from "moment-timezone"
moment.tz('America/Los_Angeles')
let userState = {
    loading:false,
}

export default function (state = userState, action) {

    if (action.type === 'COMMENTS_LIST') {
        const data = action.payload;
        return {
            ...state,
            loading: true,
            list: data
        }
    }
    return state;
}
