import React, { useEffect, useState } from 'react';
import { memo } from 'react';
import icons from '../utils/Icons';
import classNames from 'classnames/bind';
import styles from './NewRelease.module.scss';
import { useSelector } from 'react-redux';
import { SongItem } from './';

const cx = classNames.bind(styles);
const { GrNext } = icons;

const NewRelease = () => {
    const { newrelease } = useSelector((state) => state.app);
    console.log(newrelease);
    const [isActive, setIsActive] = useState(0);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (isActive === 0) {
            setCategory(newrelease?.items?.all);
        } else if (isActive === 1) {
            setCategory(newrelease?.items?.vPop);
        } else {
            setCategory(newrelease?.items?.others);
        }
    }, [isActive, newrelease]);
    return (
        <div className={cx('NewRelease')}>
            <div className={cx('NewRelease-header')}>
                <h3 className={cx('NewRelease-heading')}>{newrelease?.title}</h3>
                <a className={cx('NewRelease-discoverBtn')} href="/">
                    <span className={cx('sum-btn')}> TẤT CẢ</span>
                    <i className={cx('NewRelease-icon')}>
                        <GrNext size={16} />
                    </i>
                </a>
            </div>
            <div className={cx('NewRelease-btn')}>
                <button className={cx('btn', { active: isActive === 0 })} onClick={() => setIsActive(0)}>
                    TẤT CẢ
                </button>
                <button className={cx('btn', { active: isActive === 1 })} onClick={() => setIsActive(1)}>
                    VIỆT NAM
                </button>
                <button className={cx('btn', { active: isActive === 2 })} onClick={() => setIsActive(2)}>
                    QUỐC TẾ
                </button>
            </div>
            <div className={cx('NewRelease-list')}>
                {category?.map((item, key) => (
                    <div className={cx('NewRelease-item')}>
                        <SongItem
                            key={item.encodeId}
                            thumbnail={item.thumbnail}
                            title={item.title}
                            artistsNames={item.artistsNames}
                            releaseDate={item.releaseDate}
                            sid={item.encodeId}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(NewRelease);
