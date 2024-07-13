import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './ListSong.module.scss';
import ListItems from './ListItems';
import icons from '../utils/Icons';
import moment from 'moment';
import { useSelector } from 'react-redux';

const { BiSolidSortAlt, LuDot } = icons;
const cx = classNames.bind(styles);

const ListSong = ({ totalDurations, noheader, xsm }) => {
    // console.log({ songs, totalDurations });
    const { SONGS } = useSelector((state) => state.music);
    return (
        <div className={cx('play-List')}>
            {noheader ? (
                ''
            ) : (
                <div className={cx('listItem')}>
                    <span className={cx('song-icons')}>
                        <BiSolidSortAlt size={16} />
                        <span>BÀI HÁT</span>
                    </span>
                    <span className={cx('album-time')}>
                        <span className={cx('album')}>ALBUM</span>
                        <span>THỜI GIAN</span>
                    </span>
                </div>
            )}
            <div className={cx('media-song')}>
                {SONGS?.map((item) => (
                    <ListItems key={item.encodeId} songData={item} />
                ))}
            </div>
            {totalDurations && (
                <div className={cx('sumSong-time')}>
                    <span>{`${SONGS?.length} bài hát`}</span>
                    <span className={cx('icon-dot')}>
                        <LuDot />
                    </span>
                    <span>{moment.utc(totalDurations * 1000).format('HH:mm')}</span>
                </div>
            )}
        </div>
    );
};

export default memo(ListSong);
