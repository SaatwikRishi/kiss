let userState = {}

export default function (state = userState, action) {

    if (action.type === 'UPDATE_USER') {
        const data = action.payload;
        return {
            ...data
        }
    }
    return state;
}
