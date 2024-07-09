import React from 'react';
import { memo } from 'react';
import icons from '../utils/Icons';
import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import { SectionChild } from './';

import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);
const { GrNext } = icons;
const Section = ({ data }) => {
    // console.log(data);
    return (
        <div className={cx('section')}>
            <div className={cx('section-header')}>
                <h3 className={cx('section-heading')}>{data?.title}</h3>
                <a className={cx('section-discoverBtn')} href="/">
                    <span className={cx('sum-btn')}> TẤT CẢ</span>
                    <i className={cx('section-icon')}>
                        <GrNext size={16} />
                    </i>
                </a>
            </div>
            <div className={cx('section-list')}>
                {data &&
                    data?.items?.length > 0 &&
                    data?.items
                        ?.filter((item, index) => index <= 4)

                        ?.map((item) => (
                            <SectionChild
                                title={item.title}
                                link={item.link}
                                thumbnailM={item.thumbnailM}
                                sortDescription={item.sortDescription}
                                data={data}
                                artistsNames={item.artistsNames}
                                encodeId={item.encodeId}
                                releaseDateText={item.releaseDateText}
                            />
                        ))}
            </div>
        </div>
    );
};

export default memo(Section);
