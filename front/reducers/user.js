export const initialState = {
    nickname: null,
    nicknameLoading: false,
    nicknameDone: false,
    nicknameError: null,
    score: null,
};

export const NICKNAME_REQUEST = 'NICKNAME_REQUEST';
export const NICKNAME_SUCCESS = 'NICKNAME_SUCCESS';
export const NICKNAME_FAILURE = 'NICKNAME_FAILURE';

export const nicknameRequestAction = (data) => ({
    type: NICKNAME_REQUEST,
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
                nickname: action.data.nickname,
                score: action.data.score,
                nicknameDone: false,
                nicknameError: null,
            };
        case NICKNAME_FAILURE:
            return {
                ...state,
                nicknameLoading: false,
                nicknameError: action.error,
            };
        default:
            return state;
    }
};

export default reducer;
