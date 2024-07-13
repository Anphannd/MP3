import React, { useState } from 'react';
import icons from '../../utils/Icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import * as actions from '../../Store/action';
import { useNavigate, createSearchParams } from 'react-router-dom';
import path from '../../utils/path';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);
const { CiSearch, IoCloseCircle } = icons;

const Search = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword, setKeyWord] = useState('');

    const handleSearch = (e) => {
        if (e.keyCode === 13) {
            dispatch(actions.search(keyword));
            // chuyển trang theo vị trí(tim-kiem/tat-ca/q?...)
            navigate({
                pathname: `/${path.SEARCH}/${path.ALL}`,
                search: createSearchParams({
                    q: keyword,
                }).toString(),
            });
        }
    };
    return (
        <div className={cx('search')}>
            <span className={cx('search-btn')}>
                <CiSearch size={24} />
            </span>
            {keyword && (
                <span onClick={() => setKeyWord('')} className={cx('search-close')}>
                    <IoCloseCircle size={18} />
                </span>
            )}
            <input
                className={cx('search-input')}
                type="text"
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                value={keyword}
                onChange={(e) => setKeyWord(e.target.value)}
                onKeyUp={handleSearch}
            />
        </div>
    );
};

export default Search;
