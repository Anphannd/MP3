import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import { WeekRank } from '..';
import { BxhNewSong, NewRelease, Section, Sileder, ZingChart } from '../../Components';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const Home = () => {
    const { friday, chill, remix, toponehundred, albumhot } = useSelector((state) => state.app);

    return (
        <div className={cx('center-public')}>
            <div className="w-full h-[70px]"></div>

            <Sileder />
            <NewRelease />

            {Object.keys(friday).length === 0 ? '' : <Section data={friday} />}

            <BxhNewSong />
            <Section data={chill} />
            <Section data={remix} />
            <ZingChart />
            <WeekRank />
            <Section data={toponehundred} />
            <Section data={albumhot} />
        </div>
    );
};

export default Home;
