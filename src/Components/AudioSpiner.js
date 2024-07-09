import React, { memo } from 'react';
import { Audio } from 'react-loader-spinner';
const AudioSpiner = () => {
    return (
        <Audio
            height="24"
            width="24"
            color="white"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    );
};

export default memo(AudioSpiner);
