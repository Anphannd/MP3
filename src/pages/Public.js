import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { SilebarLeft, SilebarRight, Player, Header } from '../Components/SilebarHeader';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './public.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingData } from '../Components';
import * as actions from '../Store/action';

const cx = classNames.bind(styles);

const Public = () => {
    const [isShowSilebarRight, setIsShowSilebarRight] = useState(false);
    const { isLoading, scrollTop } = useSelector((state) => state.app);
    const { singer } = useParams();
    const dispatch = useDispatch();

    function handleScrollTop(e) {
        console.log(e.target.scrollTop);

        if (e.target.scrollTop === 0) {
            dispatch(actions.getScrollTop(true));
        } else {
            dispatch(actions.getScrollTop(false));
        }
    }

    return (
        <div className={cx('cover-xxl')}>
            <div className="flex flex-auto">
                <div className={cx('silebar-left')}>
                    <SilebarLeft />
                </div>
                <div className={cx('home-login')}>
                    {isLoading && (
                        <span className={cx('check-loading')}>
                            <LoadingData />
                        </span>
                    )}
                    <div className={cx('header', { headerSinger: scrollTop, headerNoSinger: !scrollTop })}>
                        <Header />
                    </div>
                    <Scrollbars style={{ width: '100%', height: '90%' }} onScroll={handleScrollTop}>
                        <Outlet />
                    </Scrollbars>
                </div>
                {isShowSilebarRight && (
                    <div className={cx('silebar-right', 'animate-slide-left')}>
                        <SilebarRight />
                    </div>
                )}
            </div>

            <div className={cx('player')}>
                <Player setIsShowSilebarRight={setIsShowSilebarRight} />
            </div>
        </div>
    );
};

export default Public;
