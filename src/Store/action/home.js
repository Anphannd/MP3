import actionType from './actionType';

import * as apis from '../../Apis';

export const getHome = () => async (dispatch) => {
    try {
        const res = await apis.getHome();
        console.log(res);
        if (res?.data.err === 0) {
            dispatch({
                type: actionType.GET_HOME,
                homeData: res.data.data.items,
            });
        } else {
            dispatch({
                type: actionType.GET_HOME,
                homeData: null,
            });
        }
        console.log(res);
    } catch (error) {
        dispatch({
            type: actionType.GET_HOME,
            homeData: null,
        });
    }
};
export const getScrollTop = (flag) => {
    return {
        type: actionType.ZERO_SCROLLTOP,
        flag,
    };
};
