import { Sileder, Section, NewRelease, BxhNewSong, ZingChart } from '../../Components';
import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useSelector } from 'react-redux';
import { WeekRank } from './';
const cx = classNames.bind(styles);
const Home = () => {
    const { friday, chill, remix, toponehundred, albumhot, weekChart } = useSelector((state) => state.app);
    console.log(weekChart);
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
