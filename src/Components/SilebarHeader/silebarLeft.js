import React from 'react';
import logo from '../../assets/img/logo.svg';
import classNames from 'classnames/bind';
import styles from './silebarLeft.module.scss';
import { NavLink } from 'react-router-dom';
import { Menu } from '../../utils/MenuSilebar';
import { useNavigate } from 'react-router-dom'; // chuyển route
import path from '../../utils/path';

const cx = classNames.bind(styles);

const SilebarLeft = () => {
    const navigate = useNavigate();
    return (
        <div className={cx('silebar-left')}>
            <div onClick={() => navigate(path.HOME)} className={cx('header-logo')}>
                <img src={logo} alt="" className={cx('logo')} />
            </div>
            <div className={cx('menu')}>
                {Menu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={(nav) => cx('menu-item', { active: nav.isActive })}
                    >
                        <span className={cx('menu-icon')}>{item.icon}</span>
                        <span className={cx('menu-title')}>{item.title}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default SilebarLeft;
