import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);
const Button = ({ text, style }) => {
    return (
        <div>
            <button className={cx('btn')}>{text}</button>
        </div>
    );
};

export default memo(Button);
