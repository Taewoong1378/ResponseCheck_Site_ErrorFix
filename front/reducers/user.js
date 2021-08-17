export const initialState = {
    addNicknameLoading: false,
    addNicknameDone: false,
    addNicknameError: null,
    loadNicknamesLoading: false,
    loadNickanmesDone: false,
    loadNickanmesError: null,
    mainUsers: [],
};

export const ADD_NICKNAME_REQUEST = 'ADD_NICKNAME_REQUEST';
export const ADD_NICKNAME_SUCCESS = 'ADD_NICKNAME_SUCCESS';
export const ADD_NICKNAME_FAILURE = 'ADD_NICKNAME_FAILURE';

export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILURE = 'RESET_FAILURE';

export const LOAD_NICKNAMES_REQUEST = 'LOAD_NICKNAMES_REQUEST';
export const LOAD_NICKNAMES_SUCCESS = 'LOAD_NICKNAMES_SUCCESS';
export const LOAD_NICKNAMES_FAILURE = 'LOAD_NICKNAMES_FAILURE';

// const dummyUser = (data) => ({
//     ...data,
//     nickname: ['ktw2378', 'xodnd2378', '강태웅'],
//     score: [212, 343, 387],
// });
  
export const addNicknameRequestAction = (data) => ({
    type: ADD_NICKNAME_REQUEST,
    data,
});

export const resetRequestAction = (data) => ({
    type: RESET_SUCCESS,
    data,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_SUCCESS:
            return {
                ...state,
                addnicknameLoading: false,
                addnicknameDone: false,
                addnicknameError: null,
            };
        case ADD_NICKNAME_REQUEST:
            return {
                ...state,
                addnicknameLoading: true,
                addnicknameDone: false,
                addnicknameError: null,
            };
        case ADD_NICKNAME_SUCCESS:
            return {
                ...state,
                addnicknameLoading: false,
                mainUsers: state.mainUsers.unshift(action.data),
                addnicknameDone: true,
                addnicknameError: null,
            };
        case ADD_NICKNAME_FAILURE:
            return {
                ...state,
                addnicknameLoading: false,
                addnicknameError: action.error,
            };
        case LOAD_NICKNAMES_REQUEST:
            return {
                ...state,
                loadNicknamesLoading: true,
                loadNicknamesDone: false,
                loadNicknamesError: null,
            };
        case LOAD_NICKNAMES_SUCCESS:
            return {
                ...state,
                loadNicknamesLoading: false,
                mainUsers: state.mainUsers.concat(action.data),
                loadNicknamesDone: true,
                loadNicknamesError: null,
            };
        case LOAD_NICKNAMES_FAILURE:
            return {
                ...state,
                loadNicknamesLoading: false,
                loadNicknamesError: action.error,
            };
        default:
            return state;
    }
};

export default reducer;
