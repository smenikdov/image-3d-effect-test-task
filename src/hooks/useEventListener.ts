import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

function useEventListener<T extends Event = Event>(
    eventName: string,
    handler: (event: T) => void,
    elementRef?: RefObject<HTMLElement | null>,
) {
    const savedHandler = useRef<(event: T) => void | null>(null);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const targetElement = elementRef?.current ?? window;

        if (!targetElement) {
            return;
        }

        const eventListener = (event: T) => savedHandler.current?.(event);
        targetElement.addEventListener(eventName, eventListener as EventListener);

        return () => {
            targetElement.removeEventListener(eventName, eventListener as EventListener);
        };
    }, [eventName, elementRef]);
}

export default useEventListener;
