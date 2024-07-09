import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as actions from '../../Store/action';
import { useDispatch } from 'react-redux';
import { ListSong } from '../../Components';
import classNames from 'classnames/bind';
import styles from './SearchSong.module.scss';
const cx = classNames.bind(styles);
const SearchSong = () => {
    const { searchData } = useSelector((state) => state.music);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getSearchSong(searchData?.top?.id));
    }, [searchData]);
    return (
        <div className={cx('searchSong')}>
            <div className={cx('searchSong-song')}>Bài Hát</div>
            <div className={cx('searchSong-songList')}>
                <ListSong noheader />
            </div>
        </div>
    );
};

export default SearchSong;
