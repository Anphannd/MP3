import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './SongItem.module.scss';
import moment from 'moment';
import 'moment/locale/vi';
import { useDispatch } from 'react-redux';
import * as actions from '../Store/action';
const cx = classNames.bind(styles);
const SongItem = ({ thumbnail, title, artistsNames, releaseDate, sid, oder, percent, imgSm, imgxl }) => {
    const dispatch = useDispatch();
    return (
        <div
            className={cx({ activeOder: oder, songItem: !oder })}
            onClick={() => {
                dispatch(actions.setCurSongId(sid));
                dispatch(actions.play(true));
            }}
        >
            {oder && (
                <span className={cx('oder', { one: oder === 1, two: oder === 2, three: oder === 3 })}>{oder}</span>
            )}
            <img
                src={thumbnail}
                alt="thumbnail"
                className={cx({ songItemSm: imgSm, songItemImgs: !imgSm, songItemxl: imgxl, songItemImgs: !imgxl })}
            />
            <div className={cx('songItem-info')}>
                <span className={cx('songItem-title')}>{title?.length > 30 ? `${title?.slice(0, 30)}...` : title}</span>
                <span className={cx('songItem-artistsNames')}>
                    {artistsNames?.length > 30 ? `${artistsNames?.slice(0, 30)}...` : artistsNames}
                </span>
                {/* // convert sang ngày và giờ cập nhật trước đó */}
                {releaseDate && (
                    <span className={cx('songItem-releaseDate')}>{moment(releaseDate * 1000).fromNow()}</span>
                )}
            </div>
            {percent && <span className={cx('percent')}>{`${percent}%`}</span>}
        </div>
    );
};

export default memo(SongItem);
