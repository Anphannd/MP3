import React, { memo, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getArtist } from '../Apis';
import classNames from 'classnames/bind';
import styles from './Singer.module.scss';
import icons from '../utils/Icons';
import { ListItems, Section, Artist } from '../Components';

const { IoIosPersonAdd, IoPlay, GrNext, FaStar } = icons;
const cx = classNames.bind(styles);

const Singer = () => {
    const { singer } = useParams();
    const [artistData, setArtistData] = useState(null);
    const singerRef = useRef();

    useEffect(() => {
        const fetch = async () => {
            const res = await getArtist(singer);
            console.log(res);
            if (res.data.err === 0) {
                setArtistData(res?.data?.data);
            }
        };
        singer && fetch();
    }, [singer]);

    useEffect(() => {
        singerRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [singer]);

    return (
        <div className={cx('singer')}>
            <div ref={singerRef} className={cx('singer-header')}>
                <img src={artistData?.cover} alt="background" className={cx('singer-img')} />
                <div className={cx('singer-gradien')}>
                    <div className={cx('singer-info')}>
                        <img src={artistData?.thumbnailM} alt="thumbnailM" className={cx('singer-infoImage')} />
                        <div className={cx('singer-infomation')}>
                            <div className={cx('singer-infoName')}>
                                <span className={cx('singer-name')}>{artistData?.name}</span>
                                <span className={cx('singer-iconPlay')}>
                                    <IoPlay size={24} />
                                </span>
                            </div>
                            <div className={cx('singer-infoTotalFollow')}>
                                <span className={cx('singer-ylike')}>{`${Number(
                                    artistData?.totalFollow.toFixed(1),
                                ).toLocaleString()} người quan tâm`}</span>
                                <buton className={cx('singer-infoBtn')}>
                                    <span>
                                        <IoIosPersonAdd size={14} />
                                    </span>
                                    <span>QUAN TÂM</span>
                                </buton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('singer-content')}>
                {artistData?.topAlbum && (
                    <div className={cx('singer-contentSong')}>
                        <h3 className={cx('singer-contentHeading')}>Mới Phát Hành</h3>
                        <div className={cx('singer-contentInfo')}>
                            <img
                                src={artistData?.topAlbum?.thumbnail}
                                alt="thumbnail"
                                className={cx('singer-contentImag')}
                            />
                            <div className={cx('singer-contentDetails')}>
                                <span className={cx('singer-contentTextType')}>{artistData?.topAlbum?.textType}</span>
                                <span className={cx('singer-contentTitle')}>{artistData?.topAlbum?.title}</span>
                                <span className={cx('singer-contentArtistsNames')}>
                                    {artistData?.topAlbum?.artistsNames}
                                    <span>
                                        <FaStar size={10} />
                                    </span>
                                </span>
                                <span className={cx('singer-contentReleaseDate')}>
                                    {artistData?.topAlbum?.releaseDate}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className={cx({
                        singerContentListSong: artistData?.topAlbum,
                        singerContentNoListSong: !artistData?.topAlbum,
                    })}
                >
                    <div className={cx('singer-contentheader')}>
                        <h3 className={cx('singer-contentheading')}>Bài Hát Nổi Bật</h3>
                        <a className={cx('singer-contentdiscoverBtn')} href="/">
                            <span className={cx('sum-btn')}> TẤT CẢ</span>
                            <i className={cx('singer-contenticon')}>
                                <GrNext size={16} />
                            </i>
                        </a>
                    </div>
                    <div>
                        <div className={cx('singer-contentlistItem')}>
                            {artistData?.sections
                                ?.find((item) => item.sectionType === 'song')
                                ?.items.filter((item, index) => index < 6)
                                ?.map((item, index) => (
                                    <div
                                        key={item.encodeId}
                                        className={cx('singer-contentItem', `${index % 2 !== 0 ? 'pl-8' : 'pr-8'}`)}
                                    >
                                        <ListItems songData={item} songs songsxl />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            {artistData?.sections
                ?.filter((item) => item.sectionType === 'playlist')
                ?.map((item, index) => (
                    <Section data={item} key={index} />
                ))}
            <div className={cx('singer-Artist')}>
                <h3 className={cx('singer-contentHeading')}>
                    {artistData?.sections?.find((item) => item.sectionId === 'aReArtist')?.title}
                </h3>

                <div className={cx('singer-listOA')}>
                    {artistData?.sections
                        ?.find((item) => item.sectionId === 'aReArtist')
                        ?.items?.filter((item, index) => index <= 4)
                        ?.map((item) => (
                            <Artist
                                key={item.id}
                                name={item.name}
                                thumbnail={item.thumbnail}
                                totalFollow={item.totalFollow}
                                id={item.id}
                                link={item.link}
                            />
                        ))}
                </div>
            </div>
            <div className={cx('singer-artistInfomation')}>
                <div className={cx('singer-artistInfoName')}>{`Về ${artistData?.name}`}</div>
                <div className={cx('singer-artistInfoList')}>
                    <img src={artistData?.thumbnailM} alt="thumbnailM" className={cx('singer-artistInfoImg')} />
                    <span className={cx('singer-artistInfocare')}>
                        <p
                            dangerouslySetInnerHTML={{ __html: artistData?.biography }}
                            className={cx('singer-biography')}
                        ></p>
                        <span className={cx('singer-infoYoucare')}>
                            <span className={cx('singer-numberYouCare')}>
                                {Number(artistData?.totalFollow.toFixed(1)).toLocaleString()}
                            </span>
                            <span className={cx('singer-youCare')}>Người Quan Tâm</span>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default memo(Singer);
