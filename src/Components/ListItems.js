import React, { memo, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ListItems.module.scss';
import icons from '../utils/Icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as actions from '../Store/action';
const { IoMusicalNotesOutline, FaStar } = icons;
const cx = classNames.bind(styles);
const ListItems = ({ songData, songs, songsxl }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // xử lý khi click hiện background bài hát
        const songs = Array.from(document.getElementsByClassName(cx('media-song')));
        songs.forEach((item) => {
            item.addEventListener('click', () => {
                songs.forEach((song) => song.classList.remove(cx('activeBackground')));
                item.classList.add(cx('activeBackground'));
                // khi click bài hát sẽ dc trượt lên
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
    }, []);

    return (
        <div
            className={cx('media-song')}
            onClick={() => {
                dispatch(actions.setCurSongId(songData?.encodeId));
                dispatch(actions.playAlBum(true));
                dispatch(actions.play(true));
                dispatch(
                    actions.setRecenSong({
                        thumbnail: songData?.thumbnail,
                        title: songData?.title,
                        artistsNames: songData?.artistsNames,
                        sid: songData?.encodeId,
                    }),
                );
            }}
        >
            <div className={cx('media-left')}>
                {songs ? (
                    ''
                ) : (
                    <span>
                        <IoMusicalNotesOutline size={14} />
                    </span>
                )}
                <img className={cx('media-images')} src={songData?.thumbnail} alt="thumbnail" />
                <span className={cx('media-info')}>
                    <span className={cx('media-title')}>
                        {songData?.title.length > 20 ? `${songData?.title?.slice(0, 30)}...` : songData?.title}
                    </span>
                    {songs ? (
                        <span className={cx('media-singers')}>
                            {songData?.artistsNames}
                            <span>
                                <FaStar size={10} />
                            </span>
                        </span>
                    ) : (
                        <span className={cx('media-singer')}>{songData?.artistsNames}</span>
                    )}
                </span>
            </div>
            {songsxl ? '' : <div className={cx('media-content')}>{songData?.album?.title}</div>}
            <div className={cx('media-right')}>{moment.utc(songData?.duration * 1000).format('mm:ss')}</div>
        </div>
    );
};

export default memo(ListItems);
