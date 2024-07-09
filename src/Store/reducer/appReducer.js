import actionType from '../action/actionType';

const initstate = {
    banner: [],
    friday: {},
    chill: {},
    remix: {},
    toponehundred: {},
    albumhot: {},
    isLoading: false,
    newrelease: {},
    weekChart: [],
    hNewrelease: [],
    chart: {},
    rank: [],
    scrollTop: true,
};
const appReducer = (state = initstate, action) => {
    switch (action.type) {
        case actionType.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find((item) => item.sectionId === 'hSlider')?.items || null,
                friday: action.homeData?.find((item) => item.sectionId === 'hSeasonTheme') || {},
                chill: action.homeData?.find((item) => item.sectionId === 'hEditorTheme') || {},
                remix: action.homeData?.find((item) => item.sectionId === 'hEditorTheme3') || {},
                toponehundred: action.homeData?.find((item) => item.sectionId === 'h100') || {},
                albumhot: action.homeData?.find((item) => item.sectionId === 'hAlbum') || {},
                newrelease: action.homeData?.find((item) => item.sectionType === 'new-release') || {},
                weekChart: action.homeData?.find((item) => item.sectionType === 'weekChart')?.items || [],
                hNewrelease: action.homeData?.find((item) => item.sectionId === 'hNewrelease') || {},
                chart: action.homeData?.find((item) => item.sectionId === 'hZC')?.chart || {},
                rank: action.homeData?.find((item) => item.sectionId === 'hZC')?.items || [],
            };
        case actionType.LOADING:
            return {
                ...state,
                isLoading: action.flag,
            };
        case actionType.ZERO_SCROLLTOP:
            return {
                ...state,
                scrollTop: action.flag,
            };
        default:
            return state;
    }
};
export default appReducer;
