import React, { useState, useEffect } from 'react';
import icons from '../../utils/Icons';
import classNames from 'classnames/bind';
import styles from './silebarRight.module.scss';
import { useSelector } from 'react-redux';
import { SongItem } from '../../Components';
import { getPlaylists } from '../../Apis';
import { Scrollbars } from 'react-custom-scrollbars';

const cx = classNames.bind(styles);
const { IoEllipsisHorizontal, MdTimer } = icons;

const SilebarRight = () => {
    const { curSongData, curAlbumId, isPlaying, recenSong, curSongId } = useSelector((state) => state.music);
    // console.log(curSongData);
    const [isactive, setisActive] = useState(false);
    const [playList, setPlayList] = useState();
    const fetchDetailPlaylist = async () => {
        const res = await getPlaylists(curAlbumId);
        if (res.data?.err === 0) setPlayList(res.data?.data?.song?.items);
    };

    useEffect(() => {
        curAlbumId && fetchDetailPlaylist();
    }, []);

    useEffect(() => {
        if (curAlbumId && isPlaying) fetchDetailPlaylist();
    }, [curAlbumId, isPlaying]);

    useEffect(() => {
        isPlaying && setisActive(false);
    }, [curSongId, isPlaying]);

    return (
        <div className={cx('silebarRight-list')}>
            <div className={cx('silebarRight-header')}>
                <div className={cx('header-btn')}>
                    <h6
                        className={cx('songplaylist-btn', { listsong: !isactive })}
                        onClick={() => setisActive((prev) => !prev)}
                    >
                        Danh sách phát
                    </h6>
                    <h6
                        className={cx('songheardrecently-btn', { listsong: isactive })}
                        onClick={() => setisActive((prev) => !prev)}
                    >
                        Nghe gần đây
                    </h6>
                </div>
                <div className={cx('header-icon')}>
                    <span className={cx('icon-btn')}>
                        <MdTimer size={16} />
                    </span>
                    <span className={cx('icon-btn')}>
                        <IoEllipsisHorizontal size={16} />
                    </span>
                </div>
            </div>
            {isactive ? (
                <Scrollbars autoHide style={{ width: '100%', height: '80%' }}>
                    <div>
                        {recenSong?.map((item, index) => (
                            <SongItem
                                key={item.encodeId}
                                thumbnail={item.thumbnail}
                                title={item.title}
                                artistsNames={item.artistsNames}
                                sid={item.encodeId}
                                imgSm
                            />
                        ))}
                    </div>
                </Scrollbars>
            ) : (
                <Scrollbars autoHide style={{ width: '100%', height: '80%' }}>
                    <div className={cx('silebarRight-body')}>
                        <SongItem
                            key={curSongData?.encodeId}
                            thumbnail={curSongData?.thumbnail}
                            title={curSongData?.title}
                            artistsNames={curSongData?.artistsNames}
                            sid={curSongData?.encodeId}
                            imgSm
                        />
                        <div className={cx('silebarRight-body-more')}>
                            <span className={cx('silebarRight-next')}>Tiếp Theo</span>
                            <span className={cx('silebarRight-infolist')}>
                                <span className={cx('silebarRight-playlist')}>Từ playlist</span>
                                <span className={cx('silebarRight-name')}>{curSongData?.album?.title}</span>
                            </span>
                        </div>

                        {playList && (
                            <div className={cx('playList-song')}>
                                {playList?.map((item, index) => (
                                    <SongItem
                                        key={item.encodeId}
                                        thumbnail={item.thumbnail}
                                        title={item.title}
                                        artistsNames={item.artistsNames}
                                        sid={item.encodeId}
                                        imgSm
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </Scrollbars>
            )}
        </div>
    );
};

export default SilebarRight;
