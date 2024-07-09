import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getArtist } from '../../Apis/';
import { SectionChild } from '../../Components';
import classNames from 'classnames/bind';
import styles from './SearchPlaylist.module.scss';
const cx = classNames.bind(styles);
const SearchPlaylist = () => {
    const { searchData } = useSelector((state) => state.music);
    const [playlist, setPlaylist] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const res = await getArtist(searchData?.top?.alias);
            console.log(res);
            if (res.data.err === 0) {
                setPlaylist(res.data.data.sections[1]);
            }
        };
        fetch();
    }, [searchData]);
    return (
        <div className={cx('SearchPlaylist')}>
            <h3 className={cx('SearchPlaylist-heading')}>Playlist/Album</h3>
            <div className={cx('SearchPlaylist-list')}>
                {playlist &&
                    playlist?.items?.length > 0 &&
                    playlist?.items?.map((item) => (
                        <SectionChild
                            title={item.title}
                            link={item.link}
                            thumbnailM={item.thumbnailM}
                            glc
                            artistsNames={item.artistsNames}
                            encodeId={item.encodeId}
                        />
                    ))}
            </div>
        </div>
    );
};

export default memo(SearchPlaylist);
