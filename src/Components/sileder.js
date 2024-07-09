import { getArrSlider } from '../utils/fn';
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './sileder.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../Store/action';
import icons from '../utils/Icons';
import { useNavigate } from 'react-router-dom';
const { GrPrevious, GrNext } = icons;

const cx = classNames.bind(styles);
var intervalId;
const Sileder = () => {
    const { banner } = useSelector((state) => state.app);
    // console.log(banner);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ishover, setIshover] = useState(false);
    // const [curIndex, setCurIndex] = useState(0);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(2);
    const [isAuto, setIsAuto] = useState(true);

    function handleHover() {
        setIshover(true);
    }
    function handleLeave() {
        setIshover(false);
    }

    useEffect(() => {
        if (isAuto) {
            intervalId = setInterval(() => {
                handleAnimationBaner(1);
            }, 3000);
        }
        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, [min, max, isAuto]);
    // useEffect(() => {
    //     if (curIndex !== 0) {
    //         intervalId && clearInterval(intervalId);
    //     }
    // }, [curIndex]);
    function handleAnimationBaner(step) {
        const photoSile = document.getElementsByClassName(cx('photo-banner'));
        const list = getArrSlider(min, max, photoSile.length - 1);
        for (let i = 0; i < photoSile.length; i++) {
            // Delete classnames (css)
            photoSile[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-20');
            photoSile[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-10');
            photoSile[i]?.classList?.remove('animate-slide-left2', 'order-2', 'z-10');

            // Hide or Show images
            if (list.some((item) => item === i)) {
                photoSile[i].style.cssText = `display: block`;
            } else {
                photoSile[i].style.cssText = `display: none`;
            }
        }
        // Add animation by adding classnames
        list.forEach((item) => {
            if (item === max) {
                photoSile[item]?.classList?.add('animate-slide-right', 'order-last', 'z-20');
            } else if (item === min) {
                photoSile[item]?.classList?.add('animate-slide-left', 'order-first', 'z-10');
            } else {
                photoSile[item]?.classList?.add('animate-slide-left2', 'order-2', 'z-10');
            }
        });

        if (step === 1) {
            setMin((prev) => (prev === photoSile.length - 1 ? 0 : prev + step));
            setMax((prev) => (prev === photoSile.length - 1 ? 0 : prev + step));
        }
        if (step === -1) {
            setMin((prev) => (prev === 0 ? photoSile.length - 1 : prev + step));
            setMax((prev) => (prev === 0 ? photoSile.length - 1 : prev + step));
        }
    }
    function handleBanner(item) {
        console.log(item);
        if (item?.type === 1) {
            dispatch(actions.setCurSongId(item.encodeId));
            dispatch(actions.setPlayList(null));
            dispatch(actions.play(true));
        } else if (item?.type === 4) {
            dispatch(actions.playAlBum(true));
            const playListPath = item?.link?.split('.')[0];
            navigate(playListPath);
        } else {
            dispatch(actions.setPlayList(null));
        }
    }

    const handleClick = useCallback(
        (step) => {
            intervalId && clearInterval(intervalId);
            setIsAuto(false);
            handleAnimationBaner(step);
        },
        [min, max],
    );
    return (
        <div className={cx('slider')} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
            {ishover && (
                <button className={cx('prevBtn-btn')} onClick={() => handleClick(1)}>
                    <GrPrevious size={32} />
                </button>
            )}
            <div className={cx('slider-list')} onMouseLeave={(e) => setIsAuto(true)}>
                {banner?.map((item, index) => (
                    <img
                        key={item.encodeId}
                        src={item.banner}
                        alt=""
                        className={cx('photo-banner', { block: index <= 2, hidden: index > 2 })}
                        onClick={() => handleBanner(item)}
                    />
                ))}
            </div>
            {ishover && (
                <button className={cx('nextBtn-btn')} onClick={() => handleClick(-1)}>
                    <GrNext size={32} />
                </button>
            )}
        </div>
    );
};

export default Sileder;
