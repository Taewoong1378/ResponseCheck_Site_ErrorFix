export const initialState = {
    nicknameLoading: false,
    nicknameDone: false,
    nicknameError: null,
    me: null,
};

export const NICKNAME_REQUEST = 'NICKNAME_REQUEST';
export const NICKNAME_SUCCESS = 'NICKNAME_SUCCESS';
export const NICKNAME_FAILURE = 'NICKNAME_FAILURE';

export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILURE = 'RESET_FAILURE';

// const dummyUser = (data) => ({
//     ...data,
//     nickname: ['ktw2378', 'xodnd2378', '강태웅'],
//     score: [212, 343, 387],
// });
  
export const nicknameRequestAction = (data) => ({
    type: NICKNAME_REQUEST,
    data,
});

export const resetRequestAction = (data) => ({
    type: RESET_REQUEST,
    data,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case NICKNAME_REQUEST:
            return {
                ...state,
                nicknameLoading: true,
                nicknameDone: false,
                nicknameError: null,
            };
        case NICKNAME_SUCCESS:
            return {
                ...state,
                nicknameLoading: false,
                me: action.data, /* dummyUser(action.data), */
                nicknameDone: true,
                nicknameError: null,
            };
        case NICKNAME_FAILURE:
            return {
                ...state,
                nicknameLoading: false,
                nicknameError: action.error,
            };
        case RESET_REQUEST:
            return {
                ...state,
                nicknameLoading: true,
                nicknameError: null,
            };
        case RESET_SUCCESS:
            return {
                ...state,
                nicknameLoading: false,
                nicknameDone: false,
                nicknameError: null,
            };
        case RESET_FAILURE:
            return {
                ...state,
                nicknameLoading: true,
                nicknameError: action.error,
            };
        default:
            return state;
    }
};

export default reducer;
