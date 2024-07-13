import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    Home,
    Login,
    Public,
    Personal,
    Playlist,
    WeekChart,
    ZingChartTo,
    Search,
    SearchAll,
    SearchSong,
    Singer,
    SearchPlaylist,
    Radio,
} from './pages';
import { Routes, Route } from 'react-router-dom';
import * as actions from './Store/action';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import path from './utils/path';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getHome());
    }, []);

    return (
        <>
            <div>
                <Routes>
                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.MY_MUSIC} element={<Personal />} />
                        <Route path={path.RADIO} element={<Radio />} />
                        <Route path={path.PLAYLIST_TITLE_PID} element={<Playlist />} />
                        <Route path={path.ALBUM_TITLE_PID} element={<Playlist />} />
                        <Route path={path.WEEKCHACRT_TITLE_PID} element={<WeekChart />} />
                        <Route path={path.ZING_CHART_TO} element={<ZingChartTo />} />
                        <Route path={path.PROFILER__SINGER} element={<Singer />} />
                        <Route path={path.PROFILER_ARTIST_SINGER} element={<Singer />} />
                        <Route path={path.SEARCH} element={<Search />}>
                            <Route path={path.ALL} element={<SearchAll />} />
                            <Route path={path.SONG} element={<SearchSong />} />
                            <Route path={path.PLAYLIST_SEARCH} element={<SearchPlaylist />} />
                        </Route>

                        <Route path={path.START} element={<Home />} />
                    </Route>
                </Routes>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
