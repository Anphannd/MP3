import React, { memo } from 'react';
import { handleNumber } from '../utils/fn';
import classNames from 'classnames/bind';
import styles from './Artist.module.scss';
import icons from '../utils/Icons';
import { Link } from 'react-router-dom';

const { IoIosPersonAdd } = icons;
const cx = classNames.bind(styles);

const Artist = ({ name, thumbnail, id, totalFollow, link }) => {
    return (
        <div className={cx('Artist')}>
            <div className={cx('Artist-Info')}>
                <Link to={link} className={cx('Artist-photoImages')}>
                    <img src={thumbnail} alt="thumbnail" className={cx('Artist-imgs')} />
                </Link>
                <div className={cx('Artist-listInfo')}>
                    <span className={cx('Artist-name')}>{name}</span>
                    <span className={cx('Artist-totalFollow')}>{handleNumber(totalFollow) + ' ' + 'quan tâm'}</span>
                    <buton className={cx('Artist-btn')}>
                        <span>
                            <IoIosPersonAdd size={14} />
                        </span>
                        <span>QUAN TÂM</span>
                    </buton>
                </div>
            </div>
        </div>
    );
};

export default memo(Artist);
