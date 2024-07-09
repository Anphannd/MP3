import classNames from 'classnames/bind';
import React, { useEffect, useState, useRef } from 'react';
import styles from './Player.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as apis from '../../Apis';
import * as actions from '../../Store/action';
import icons from '../../utils/Icons';
import moment from 'moment';
import { toast } from 'react-toastify';
import { LoadingSpiner } from '../../Components';
const {
    FaRegHeart,
    IoEllipsisHorizontal,
    IoShuffleOutline,
    MdSkipPrevious,
    FaRegCirclePlay,
    MdSkipNext,
    IoRepeatOutline,
    MdOutlinePauseCircleOutline,
    LuRepeat1,
    GiMicrophone,
    FaWindowRestore,
    FaVolumeUp,
    FaVolumeMute,
    BsMusicNoteList,
    FaVolumeDown,
} = icons;
const cx = classNames.bind(styles);
var intervaId;
const Player = ({ setIsShowSilebarRight }) => {
    const [audio, setAudio] = useState(new Audio());
    const { curSongId, isPlaying, SONGS } = useSelector((state) => state.music);
    const [progress, setProgress] = useState(0);
    const [songInfo, setSongInfo] = useState(null);
    const [timestart, setTimeStart] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [repeatTrack, setRepeatTrack] = useState(false);
    const [isLoadingSpiner, setIsLoadingSpiner] = useState(true);
    const [volume, setVolume] = useState(100);
    const dispatch = useDispatch();
    const nextRef = useRef();
    // console.log('curSongId', curSongId);
    useEffect(() => {
        const fetchDetailSong = async () => {
            setIsLoadingSpiner(false);
            const [res, res1] = await Promise.all([apis.getDetailSong(curSongId), apis.getSong(curSongId)]);
            console.log('detailsong', res);
            console.log('detailsong', res1);
            setIsLoadingSpiner(true);
            if (res.data.err === 0) {
                setSongInfo(res?.data.data);
                // console.log(songInfo);
                dispatch(actions.setCurSongData(res?.data.data));
            }
            if (res1.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res1?.data.data['128'])); //// note
            } else {
                setAudio(new Audio());
                audio.pause();
                dispatch(actions.play(false));
                toast.warn(res1.data.msg);
            }
        };
        fetchDetailSong();
    }, [curSongId]);

    useEffect(() => {
        if (isPlaying) {
            intervaId = setInterval(() => {
                let progressPercent = Math.floor((audio.currentTime * 10000) / songInfo?.duration) / 100;
                setProgress(progressPercent);
                setTimeStart(audio.currentTime);
            }, 200);
        } else {
            intervaId && clearInterval(intervaId);
        }
        return () => {
            clearInterval(intervaId);
        };
    }, [isPlaying, songInfo, audio]);

    useEffect(() => {
        function handleEnded() {
            if (isShuffle) {
                handleShuffle();
            } else if (repeatTrack) {
                audio.play();
            } else if (isRepeat) {
                handleNextSong();
            } else {
                audio.pause();
                dispatch(actions.play(false));
            }
        }

        audio?.addEventListener('ended', handleEnded);

        return () => {
            audio?.removeEventListener('ended', handleEnded);
        };
    }, [audio, isRepeat, isShuffle, repeatTrack]);

    useEffect(() => {
        audio?.load();
        if (isPlaying) audio?.play();
    }, [audio]); // note
    // lắng nghe cùng onclick volume
    useEffect(() => {
        if (audio) {
            audio.volume = volume / 100;
        }
    }, [volume]);

    function handlePlayMusic() {
        if (isPlaying) {
            audio.pause();

            dispatch(actions.play(false));
        } else {
            audio.play();

            dispatch(actions.play(true));
        }
    }
    function handleProgress(e) {
        audio.play();
        dispatch(actions.play(true));
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
    }
    function handlePrevSong() {
        if (SONGS) {
            let curIndex;
            SONGS?.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    curIndex = index;
                }
            });
            dispatch(actions.setCurSongId(SONGS[curIndex - 1].encodeId));
            dispatch(actions.play(true));
        }
    }
    function handleNextSong() {
        if (SONGS) {
            let curIndex;
            SONGS?.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    curIndex = index;
                }
                // console.log(curIndex);
            });
            dispatch(actions.setCurSongId(SONGS[curIndex + 1].encodeId));
            dispatch(actions.play(true));
        }
    }
    function handleShuffle() {
        const randomIndex = Math.floor(Math.random() * SONGS?.length - 1);
        dispatch(actions.setCurSongId(SONGS[randomIndex].encodeId));
    }
    function handleToggleAutoNext() {
        if (isRepeat) {
            setIsRepeat(false);
            setRepeatTrack(true);
            nextRef.current.style.display = 'none';
        } else {
            setIsRepeat(true);
        }
    }
    function handleToggleRepeatTrack() {
        if (repeatTrack) {
            setRepeatTrack(false);
            nextRef.current.style.display = 'block';
            setIsRepeat(false);
        } else if (!isRepeat) {
            setIsRepeat(true);
            setRepeatTrack(false);
        } else {
            setRepeatTrack(true);
        }
    }
    function handleVolume(e) {
        setVolume(e.target.value);
    }
    return (
        <div className="flex h-full px-5">
            <div className={cx('song')}>
                <img src={songInfo?.thumbnail} alt="thumbnail" className={cx('imageSong')} />
                <div className={cx('info')}>
                    <span className={cx('nameSong')}>{songInfo?.title}</span>
                    <span className={cx('singerSong')}>{songInfo?.artistsNames}</span>
                </div>
                <div className={cx('icons')}>
                    <button title="Thêm vào thư viện" className={cx('iconsItem')}>
                        <FaRegHeart />
                    </button>
                    <button title="Xem thêm" className={cx('iconsItem')}>
                        <IoEllipsisHorizontal />
                    </button>
                </div>
            </div>
            <div className={cx('play')}>
                <div className={cx('iconsList')}>
                    <button
                        title="Bật phát ngẫu nhiên"
                        className={cx('iconsItem', { active: isShuffle })}
                        onClick={() => setIsShuffle((prev) => !prev)}
                    >
                        <IoShuffleOutline size={24} />
                    </button>
                    <button
                        className={cx('iconsItem', {
                            'text-gray-500': !SONGS,
                            'cursor-pointer': SONGS,
                        })}
                        onClick={handlePrevSong}
                    >
                        <MdSkipPrevious size={24} />
                    </button>
                    <button className={cx('iconsItem-xl')} onClick={handlePlayMusic}>
                        {!isLoadingSpiner ? (
                            <LoadingSpiner />
                        ) : isPlaying ? (
                            <MdOutlinePauseCircleOutline size={40} />
                        ) : (
                            <FaRegCirclePlay size={40} />
                        )}
                    </button>
                    <button
                        className={cx('iconsItem', {
                            'text-gray-500': !SONGS,
                            'cursor-pointer': SONGS,
                        })}
                        onClick={handleNextSong}
                    >
                        <MdSkipNext size={24} />
                    </button>

                    <button
                        title="Bật phát tất cả"
                        className={cx('iconsItem', { active: isRepeat })}
                        onClick={handleToggleAutoNext}
                        ref={nextRef}
                    >
                        <IoRepeatOutline size={24} />
                    </button>
                    {repeatTrack && (
                        <button
                            title="Bật phát lại một bài"
                            className={cx('iconsItem', { active: repeatTrack })}
                            onClick={handleToggleRepeatTrack}
                        >
                            <LuRepeat1 size={24} />
                        </button>
                    )}
                </div>
                <div className={cx('progress-bar')}>
                    <span className={cx('time-start')}>{moment.utc(timestart * 1000).format('mm:ss')}</span>
                    <input
                        className={cx('progress')}
                        type="range"
                        value={progress}
                        step={1}
                        min={0}
                        max={100}
                        style={{ '--progress': `${progress}%` }}
                        onInput={handleProgress}
                    />
                    <span className={cx('time-end')}>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className={cx('tools')}>
                <div className={cx('tools-icons')}>
                    <span className={cx('iconsItem')}>
                        <GiMicrophone size={16} />
                    </span>
                    <span className={cx('iconsItem')}>
                        <FaWindowRestore size={16} />
                    </span>
                    <span className={cx('iconsItem')} onClick={() => setVolume((prev) => (+prev === 0 ? 80 : 0))}>
                        {+volume >= 50 ? (
                            <FaVolumeUp size={16} />
                        ) : +volume === 0 ? (
                            <FaVolumeMute size={16} />
                        ) : (
                            <FaVolumeDown size={16} />
                        )}
                    </span>
                    <input
                        type="range"
                        step={1}
                        min={0}
                        max={100}
                        value={volume}
                        onChange={handleVolume}
                        className={cx('progress', 'progress-volume')}
                        style={{ '--volume': `${volume}%` }}
                    />
                    <span className={cx('border-right')}></span>
                    <span className={cx('listSong-btn')} onClick={() => setIsShowSilebarRight((prev) => !prev)}>
                        <BsMusicNoteList size={16} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Player;
