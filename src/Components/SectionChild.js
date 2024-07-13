import React, { memo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import icons from '../utils/Icons';
import { AudioSpiner } from './';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../Store/action';

const { IoPlay, FaRegHeart, IoEllipsisHorizontal, FaStar } = icons;
const cx = classNames.bind(styles);

const SectionChild = ({
    title,
    link,
    data,
    thumbnailM,
    artistsNames,
    sortDescription,
    encodeId,
    glc,
    releaseDateText,
}) => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const { isPlaying } = useSelector((state) => state.music);
    const [ishover, setIshover] = useState(false);
    const imageRef = useRef();

    function handleHover() {
        setIshover(true);
        imageRef.current.classList.add(cx('actions-one'));
        imageRef.current.classList.remove(cx('actions-two'));
    }
    function handleLeave() {
        setIshover(false);
        imageRef.current.classList.add(cx('actions-two'));
        imageRef.current.classList.remove(cx('actions-one'));
    }
    return (
        <div className={cx('section-items')}>
            <div
                className={cx('section-photoImages')}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onClick={() => Navigate(link?.split('.')[0])}
            >
                {ishover && (
                    <div className={cx('icons-list')}>
                        <span className={cx('iconHeart-btn')} title="Thêm vào thư viện">
                            <FaRegHeart size={20} />
                        </span>
                        {isPlaying ? (
                            <span className={cx('iconAudio-btn')}>
                                <AudioSpiner />
                            </span>
                        ) : (
                            <span className={cx('iconPlay-btn')}>
                                <IoPlay
                                    size={24}
                                    onClick={() => {
                                        dispatch(actions.setCurSongId(encodeId));
                                        dispatch(actions.play(true));
                                    }}
                                />
                            </span>
                        )}
                        <span className={cx('iconEllips-btn')} title="khác">
                            <IoEllipsisHorizontal size={20} />
                        </span>
                    </div>
                )}
                <img src={thumbnailM} alt="avatar" className={cx('section-image')} ref={imageRef} />
            </div>
            <span className={cx('section-info')}>
                {data?.sectionId === 'h100' ||
                data?.sectionId === 'hAlbum' ||
                glc ||
                data?.sectionType === 'playlist' ? (
                    <span className={cx('sectionTitle-list')}>
                        {title?.length >= 40 ? `${title.slice(0, 40)}...` : title}
                    </span>
                ) : (
                    ''
                )}
                {data?.sectionType === 'playlist' ? <span>{releaseDateText}</span> : ''}
                <span>
                    {data?.sectionId === 'h100' ||
                    data?.sectionId === 'hAlbum' ||
                    glc ||
                    data?.sectionId === 'aPlaylist' ? (
                        <span className="flex items-center gap-1">
                            <span>{artistsNames}</span>
                            {data?.title === 'Tuyển tập' ? (
                                <span>
                                    <FaStar size={10} />
                                </span>
                            ) : (
                                ''
                            )}
                        </span>
                    ) : (
                        <span>
                            {sortDescription?.length >= 40 ? `${sortDescription.slice(0, 40)}...` : sortDescription}
                        </span>
                    )}
                </span>
            </span>
        </div>
    );
};

export default memo(SectionChild);
