import actionType from './actionType';

import * as apis from '../../Apis';

export const setCurSongId = (sid) => ({
    type: actionType.SET_CUR_SONG_ID,
    sid,
});
export const play = (flag) => ({
    type: actionType.PLAY,
    flag,
});
export const playAlBum = (flag) => ({
    type: actionType.SET_ALBUM,
    flag,
});
export const setPlayList = (songs) => ({
    type: actionType.PLAY_LIST,
    songs,
});
export const loading = (flag) => ({
    type: actionType.LOADING,
    flag,
});
export const setCurSongData = (data) => ({
    type: actionType.SET_CUR_SONG_DATA,
    data,
});
export const setCurAlbumId = (pid) => ({
    type: actionType.SET_CUR_ALBUM_ID,
    pid,
});
export const setRecenSong = (data) => ({
    type: actionType.SET_RECENSONG,
    data,
});
export const search = (keyword) => async (dispatch) => {
    try {
        const res = await apis.getSearch(keyword);
        if (res.data.err === 0) {
            dispatch({ type: actionType.SEARCH, data: res.data.data, keyword });
        } else {
            dispatch({
                type: actionType.SEARCH,
                data: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionType.SEARCH,
            data: null,
        });
    }
};
export const getSearchSong = (singerId) => async (dispatch) => {
    try {
        const res = await apis.getArtistSong(singerId);

        if (res.data.err === 0) {
            dispatch({ type: actionType.PLAY_LIST, songs: res.data?.data?.items });
        } else {
            dispatch({
                type: actionType.PLAY_LIST,
                songs: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionType.PLAY_LIST,
            songs: null,
        });
    }
};
