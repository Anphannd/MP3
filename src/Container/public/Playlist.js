import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // lấy params trên url
import * as apis from '../../Apis';
import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import moment from 'moment';
import icons from '../../utils/Icons';
import { ListSong, AudioSpiner } from '../../Components';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Store/action';

const { IoPlay, FaRegHeart, IoEllipsisHorizontal } = icons;

const cx = classNames.bind(styles);
const Playlist = () => {
    const { title, pid } = useParams();
    // console.log({ title, pid });
    const { isPlaying } = useSelector((state) => state.music);
    const [listData, setListData] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.setCurAlbumId(pid));
        const fetchDetailPlaylist = async () => {
            dispatch(actions.loading(true));
            const res = await apis.getPlaylists(pid);
            dispatch(actions.loading(false));
            // console.log(res);
            if (res?.data.err === 0) {
                setListData(res?.data.data);
                dispatch(actions.setPlayList(res?.data?.data?.song?.items));
            }
        };
        fetchDetailPlaylist();
    }, [pid]);

    return (
        <div className={cx('listItem')}>
            <div className={cx('itemLeft')}>
                <div className={cx('images-btn')}>
                    <img className={cx('images-playlist')} src={listData?.thumbnailM} alt="thumbnailM" />
                    {isPlaying ? (
                        <span className={cx('iconAudio-btn')}>
                            <AudioSpiner />
                        </span>
                    ) : (
                        <span className={cx('iconPlay-btn')}>
                            <IoPlay size={24} />
                        </span>
                    )}
                </div>

                <h3 className={cx('songName')}>{listData?.title}</h3>
                <span className={cx('dayUpdate')}>
                    {/* covert sang ngafy thasng nam */}
                    Cập nhật: {moment.unix(listData?.contentLastUpdate).format('DD/MM/YYYY')}
                </span>

                <span className={cx('singerName')}>{listData?.artistsNames}</span>

                <span className={cx('userLike')}>{`${Math.round(listData?.like / 1000)}k người yêu thích`}</span>
                <div className={cx('play-item')}>
                    <button className={cx('play-btn')}>
                        <IoPlay size={16} />
                        <span>PHÁT NGẪU NHIÊN</span>
                    </button>
                    <div>
                        <button title="Thêm vào thư viện" className={cx('iconsItem')}>
                            <FaRegHeart />
                        </button>
                        <button title="Xem thêm" className={cx('iconsItem')}>
                            <IoEllipsisHorizontal />
                        </button>
                    </div>
                </div>
            </div>
            <Scrollbars style={{ width: '100%', height: '100%' }}>
                <div className={cx('itemRight')}>
                    <div className={cx('sortDescription')}>
                        <span className="text-gray-600">Lời tựa </span>
                        <span>{listData?.sortDescription}</span>
                    </div>

                    <ListSong songs={listData?.song?.items} totalDurations={listData?.song?.totalDuration} />
                </div>
            </Scrollbars>
        </div>
    );
};

export default Playlist;
