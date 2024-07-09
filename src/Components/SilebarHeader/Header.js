import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './header.module.scss';
import icons from '../../utils/Icons';
import Search from './Search';
import { useNavigate } from 'react-router-dom';
const { FaArrowLeft, FaArrowRight } = icons;
const cx = classNames.bind(styles);
const Header = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState();
    const leftRef = useRef();
    const rightRef = useRef();
    function handleNavigationLeft() {
        navigate(-1);
        setIsActive(1);
        // leftRef.current.classList.add(cx('active'));
        // leftRef.current.classList.remove(cx('navigation-left'));
    }
    function handleNavigationRight() {
        navigate(+1);
        setIsActive(2);
        // rightRef.current.classList.remove(cx('navigation-right'));
        // rightRef.current.classList.add(cx('active'));
    }
    return (
        <div className={cx('header-xxl')}>
            <div className={cx('header-l')}>
                <div className={cx('navigation-arrows')}>
                    <span
                        ref={leftRef}
                        className={cx({ active: isActive === 1, navigation: isActive !== 1 })}
                        onClick={handleNavigationLeft}
                    >
                        <FaArrowLeft size={24} />
                    </span>
                    <span
                        ref={rightRef}
                        className={cx({ active: isActive === 2, navigation: isActive !== 2 })}
                        onClick={handleNavigationRight}
                    >
                        <FaArrowRight size={24} />
                    </span>
                </div>
                <div className={cx('Search')}>
                    <Search />
                </div>
            </div>
            <div className={cx('action')}>action</div>
        </div>
    );
};

export default Header;
