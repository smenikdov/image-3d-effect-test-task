import { useRef } from 'react';
import useEventListener from './useEventListener';

const useWindowSize = () => {
    const getWindowSize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return {
            width: width,
            height: height,
        };
    };

    const windowSize = useRef(getWindowSize());

    useEventListener('resize', () => {
        windowSize.current = getWindowSize();
    });

    return windowSize;
};

export default useWindowSize;
