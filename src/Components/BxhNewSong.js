import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import icons from '../utils/Icons';
import classNames from 'classnames/bind';
import styles from './BxhNewSong.module.scss';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as actions from '../Store/action';

const cx = classNames.bind(styles);

const BxhNewSong = () => {
    const { GrNext } = icons;
    const dispatch = useDispatch();
    const { hNewrelease } = useSelector((state) => state.app);

    useEffect(() => {
        const photoSile = document.getElementsByClassName(cx('bxhNewsong-item'));
        let currentIndex = 0;

        function showImages() {
            const photoSileArray = Array.from(photoSile);
            photoSileArray.forEach((item, index) => {
                item.classList.remove('animate-slide-left');
                if (index < currentIndex + 3 && index >= currentIndex) {
                    item.classList.add('animate-slide-left');
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        const intervalPt = setInterval(() => {
            showImages();
            currentIndex = currentIndex < photoSile.length - 3 ? currentIndex + 1 : 0;
        }, 8000);

        return () => {
            intervalPt && clearInterval(intervalPt);
        };
    }, []);

    return (
        <div className={cx('bxhNewsong')}>
            <div className={cx('bxhNewsong-header')}>
                <h3 className={cx('bxhNewsong-heading')}>{hNewrelease?.title}</h3>
                <a className={cx('bxhNewsong-discoverBtn')} href="/">
                    <span className={cx('sum-btn')}> TẤT CẢ</span>
                    <i className={cx('bxhNewsong-icon')}>
                        <GrNext size={16} />
                    </i>
                </a>
            </div>
            <div className={cx('bxhNewsong-list')}>
                {hNewrelease?.items?.map((item, index) => (
                    <div
                        key={item.encodeId}
                        className={cx('bxhNewsong-item', { active: index <= 2, hidden: index > 2 })}
                    >
                        <img
                            src={item.thumbnail}
                            alt="thumbnail"
                            className={cx('bxhNewsong-img')}
                            onClick={() => {
                                dispatch(actions.setCurSongId(item.encodeId));
                                dispatch(actions.play(true));
                            }}
                        />
                        <div className={cx('bxhNewsong-info')}>
                            <div className={cx('bxhNewsong-name')}>
                                <span className={cx('bxhNewsong-title')}>{item.title}</span>
                                <span className={cx('bxhNewsong-artistsNames')}>{item.artistsNames}</span>
                            </div>
                            <div className={cx('bxhNewsong-time')}>
                                <span className={cx('bxhNewsong-number')}>#{index + 1}</span>

                                <span className={cx('bxhNewsong-date')}>
                                    {moment.unix(item?.releaseDate).format('DD/MM/YYYY')}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BxhNewSong;
