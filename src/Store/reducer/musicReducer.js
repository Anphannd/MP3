import actionType from '../action/actionType';

const initstate = {
    curSongId: null,
    curSongData: null,
    isPlaying: false,
    atAlbum: false,
    SONGS: null,
    curAlbumId: null,
    recenSong: [],
    searchData: {},
    keyword: '',
};
const musicReducer = (state = initstate, action) => {
    switch (action.type) {
        case actionType.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sid || null,
            };

        case actionType.PLAY:
            return {
                ...state,
                isPlaying: action.flag,
            };
        case actionType.SET_ALBUM:
            return {
                ...state,
                atAlbum: action.flag,
            };
        case actionType.PLAY_LIST:
            return {
                ...state,
                SONGS: action.songs || null,
            };
        case actionType.SET_CUR_SONG_DATA:
            return {
                ...state,
                curSongData: action.data || null,
            };
        case actionType.SET_CUR_ALBUM_ID:
            return {
                ...state,
                curAlbumId: action.pid || null,
            };
        case actionType.SET_RECENSONG:
            let songs = state.recenSong;
            if (action.data) {
                if (songs.some((i) => i.sid === action.data.sid)) {
                    songs = songs.filter((i) => i.sid !== action.data.sid);
                }
                if (songs.length > 20) {
                    songs = songs.slice(0, -1);
                }
                songs = [action.data, ...songs];
            }

            return {
                ...state,
                recenSong: songs,
            };
        case actionType.SEARCH:
            return {
                ...state,
                searchData: action.data || {},
                keyword: action.keyword || '',
            };

        default:
            return state;
    }
};
export default musicReducer;
