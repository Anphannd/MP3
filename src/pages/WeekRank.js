import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const WeekRank = () => {
    const { weekChart } = useSelector((state) => state.app);
    return (
        <div className="flex items-center px-[49px] w-full mt-12">
            {weekChart?.map((item) => (
                <Link to={item?.link?.split('.')[0]} key={item?.country} className="flex-1 px-4">
                    <img src={item.cover} alt="cover" className="object-cover w-full rounded-md" />
                </Link>
            ))}
        </div>
    );
};

export default memo(WeekRank);
