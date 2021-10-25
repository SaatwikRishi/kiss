let userState = {}

export default function (state = userState, action) {

    if (action.type === 'UPDATE_USER') {
        const data = action.payload;
        return {
            loading: false,
            ...data
        }
    }
    if (action.type === 'GET_USER') {
        const data = action.payload;
        return {
            loading: false,
            ...data
        }
    }
    return state;
}
