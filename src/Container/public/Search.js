import React from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SearchMenu } from '../../utils/MenuSilebar';

const cx = classNames.bind(styles);
const Search = () => {
    const { keyword } = useSelector((state) => state.music);
    return (
        <div>
            <div className={cx('search-headerXl')}>
                <div className={cx('search-header')}>
                    <h3 className={cx('search-headerResult')}>Kết Quả Tìm Kiếm </h3>

                    <div className={cx('search-headerInfo')}>
                        {SearchMenu.map((item) => (
                            <NavLink
                                key={item.path}
                                to={`${item.path}?q=${keyword.replace(' ', '+')}`}
                                className={(nav) => cx('SearchMenu', { active: nav.isActive })}
                            >
                                <span className={cx('search-title')}>{item.title}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>

                <div>
                    <Outlet />
                </div>
                {/* <div className="w-full h-[90px]"></div> */}
            </div>
        </div>
    );
};

export default Search;
