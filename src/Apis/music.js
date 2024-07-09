import axios from '../axios';

export const getSong = (sid) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/song',
                method: 'get',
                params: { id: sid },
            });
            resolve(response);
            console.log(sid);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết bài hát:', error);
            reject(error);
        }
    });
export const getDetailSong = (sid) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/infosong',
                method: 'get',
                params: { id: sid },
            });
            console.log(sid);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const getPlaylists = (pid) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/detailPlaylist',
                method: 'get',
                params: { id: pid },
            });

            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const getSearch = (keyword) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/search',
                method: 'get',
                params: { keyword },
            });

            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const getArtistSong = (singerId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/artistsong',
                method: 'get',
                params: {
                    id: singerId,
                    page: 1,
                    count: 50,
                },
            });

            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const getArtist = (alias) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/artist',
                method: 'get',
                params: {
                    name: alias,
                },
            });

            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
