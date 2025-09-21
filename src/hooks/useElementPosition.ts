import { useRef, useEffect, useCallback } from 'react';
import useEventListener from './useEventListener';
import type { RefObject } from 'react';

const useElementPosition = (elementRef: RefObject<HTMLElement | null>) => {
    const elementPosition = useRef({
        y: 0,
        x: 0,
        width: 0,
        height: 0,
        centerX: 0,
        centerY: 0,
    });

    const updateElementPosition = useCallback(() => {
        if (!elementRef.current) {
            return;
        }

        const rect = elementRef.current.getBoundingClientRect();

        elementPosition.current = {
            y: rect.y,
            x: rect.x,
            width: rect.width,
            height: rect.height,
            centerX: rect.x + rect.width / 2,
            centerY: rect.y + rect.height / 2,
        };
    }, [elementRef]);

    useEffect(() => {
        updateElementPosition();
    }, [updateElementPosition]);

    useEventListener('resize', updateElementPosition);
    useEventListener('scroll', updateElementPosition);

    return { elementPosition, updateElementPosition };
};

export default useElementPosition;
