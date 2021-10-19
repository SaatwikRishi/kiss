import moment from "moment-timezone"
moment.tz.setDefault('America/Los_Angeles')
let userState = {}
export default function (state = userState, action) {

    if (action.type === 'EVENTS_CATEGORY_LIST') {
        const data = action.payload;
        return {
            ...state,
            categoryList: {
                loading: false,
                data: data
            }
        }
    }
    return state;
}
