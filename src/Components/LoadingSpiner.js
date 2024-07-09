import React, { memo } from 'react';
import { RotatingLines } from 'react-loader-spinner';
const LoadingSpiner = () => {
    return (
        <RotatingLines
            visible={true}
            height="40"
            width="40"
            color="#fff"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
};

export default memo(LoadingSpiner);
