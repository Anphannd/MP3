import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './SearchAll.module.scss';
import { handleNumber } from '../../utils/fn';
import { SongItem, ListItems, SectionChild, Artist } from '../../Components';
import icons from '../../utils/Icons';
const cx = classNames.bind(styles);
const { GrNext } = icons;
const SearchAll = () => {
    const { searchData } = useSelector((state) => state.music);
    console.log(searchData);
    return (
        <div className={cx('searchAll')}>
            <div className={cx('searchAll-outstanding')}>
                <h3 className={cx('searchAll-heading')}>Nổi Bật</h3>
                <div className={cx('searchAll-list')}>
                    {searchData?.top && (
                        <div className={cx('searchAll-Info')}>
                            <div className={cx('searchAll-photoImg')}>
                                <img src={searchData?.top.thumbnail} alt="thumbnail" className={cx('searchAll-imgs')} />
                            </div>
                            <div className={cx('searchAll-InfoRight')}>
                                <span className={cx('searchAll-artist')}>
                                    {searchData?.top?.objectType === 'artist' ? 'Nghệ sĩ' : ''}
                                </span>
                                <span className={cx('searchAll-name')}>{searchData?.top?.name}</span>
                                {searchData?.top?.objectType === 'artist' && (
                                    <span className={cx('searchAll-totalFollow')}>
                                        {handleNumber(searchData?.artists[0]?.totalFollow) + ' ' + 'quan tâm'}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {searchData?.songs
                        ?.filter((item, index) => index < 2)
                        ?.map((item) => (
                            <div className={cx('searchAll-item')}>
                                <SongItem
                                    key={item.encodeId}
                                    title={item.title}
                                    sid={item.encodeId}
                                    thumbnail={item.thumbnail}
                                    artistsNames={item.artistsNames}
                                    imgxl
                                />
                            </div>
                        ))}
                </div>
            </div>
            <div className={cx('searchAll-songs')}>
                <div className={cx('songs-header')}>
                    <h3 className={cx('searchAll-heading')}>Bài Hát</h3>
                    <a className={cx('searchAll-discoverBtn')} href="/">
                        <span className={cx('sum-btn')}> TẤT CẢ</span>
                        <i className={cx('searchAll-icon')}>
                            <GrNext size={16} />
                        </i>
                    </a>
                </div>
                <div className={cx('songs-list')}>
                    {searchData?.songs?.map((item, index) => (
                        <div key={item.encodeId} className={cx('songs-Info', `${index % 2 !== 0 ? 'pl-8' : 'pr-8'}`)}>
                            <ListItems songData={item} songs songsxl />
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('searchAll-songs')}>
                <div className={cx('songs-header')}>
                    <h3 className={cx('searchAll-heading')}>Playlist/Album</h3>
                    <a className={cx('searchAll-discoverBtn')} href="/">
                        <span className={cx('sum-btn')}> TẤT CẢ</span>
                        <i className={cx('searchAll-icon')}>
                            <GrNext size={16} />
                        </i>
                    </a>
                </div>
                <div className={cx('playlist-list')}>
                    {searchData?.playlists
                        ?.filter((item, index) => index <= 4)
                        ?.map((item) => (
                            <SectionChild
                                key={item.encodeId}
                                title={item.title}
                                link={item.link}
                                thumbnailM={item.thumbnailM}
                                sortDescription={item.sortDescription}
                                artistsNames={item.artistsNames}
                                encodeId={item.encodeId}
                            />
                        ))}
                </div>
            </div>
            <div className={cx('searchAll-songs')}>
                <div className={cx('songs-header')}>
                    <h3 className={cx('searchAll-heading')}>Nghệ Sĩ/OA</h3>
                    <a className={cx('searchAll-discoverBtn')} href="/">
                        <span className={cx('sum-btn')}> TẤT CẢ</span>
                        <i className={cx('searchAll-icon')}>
                            <GrNext size={16} />
                        </i>
                    </a>
                </div>
                <div className={cx('playlist-listOA')}>
                    {searchData?.artists
                        ?.filter((item, index) => index <= 4)
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
        </div>
    );
};

export default SearchAll;
