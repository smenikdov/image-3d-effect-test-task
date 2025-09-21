import { useEffect, useRef } from 'react';
import useWindowSize from 'hooks/useWindowSize';
import useEventListener from 'hooks/useEventListener';
import useElementPosition from 'hooks/useElementPosition';
import useDebounce from 'hooks/useDebounce';

import type { TiltEffectSettings, TiltEffectReturn } from './TiltImage.types';
import type { RefObject } from 'react';

export const useTiltEffect = (elementRef: RefObject<HTMLElement | null>, settings: TiltEffectSettings = {}): TiltEffectReturn => {
    const {
        disabled = false,
        reverseX = false,
        reverseY = false,
        maxAngle = 15,
        perspective = 1000,
        easing = 'cubic-bezier(.03,.98,.52,.99)',
        speed = 300,
        disableAnimationDelay = 1000,
    } = settings;

    const { elementPosition, updateElementPosition } = useElementPosition(elementRef);
    const windowSize = useWindowSize();
    const updateCall = useRef<number | null>(null);
    const clientX = useRef(0);
    const clientY = useRef(0);
    const isMouseOnCard = useRef(false);
    const isAnimationActive = useRef(false);
    const setIsAnimationActive = useDebounce((value: boolean) => {
        isAnimationActive.current = value;
        if (!value) {
            resetStyles();
        }
    }, disableAnimationDelay);

    const onCardMouseEnter = () => {
        isAnimationActive.current = true;
        isMouseOnCard.current = true;
        setIsAnimationActive(true);
    };

    const onCardMouseLeave = () => {
        isMouseOnCard.current = false;
    };

    const onWindowMouseMove = (event: MouseEvent) => {
        if (!isAnimationActive.current || disabled) {
            return;
        }

        if (!isMouseOnCard.current) {
            setIsAnimationActive(false);
        }

        if (updateCall.current !== null) {
            cancelAnimationFrame(updateCall.current);
        }

        clientX.current = event.clientX;
        clientY.current = event.clientY;
        updateCall.current = requestAnimationFrame(updateStyles);
    };

    const calculateRotation = (client: number, center: number, size: number, reverse: boolean) => {
        // Рассчитываем отношение текущей позиции курсора к центру элемента
        const ratio = (client - center) / size;
        // Умножаем на максимальный угол и учитываем направление
        const rotate = (reverse ? -1 : 1) * ratio * maxAngle;
        return rotate.toFixed(2);
    };

    const updateStyles = () => {
        if (!elementRef.current) {
            return;
        }

        const rotateY = calculateRotation(clientX.current, elementPosition.current.centerX, windowSize.current.width, reverseX);
        const rotateX = calculateRotation(clientY.current, elementPosition.current.centerY, windowSize.current.height, reverseY);

        elementRef.current.style.transform = `perspective(${perspective}px) ` +
            `rotateX(${rotateX}deg) ` +
            `rotateY(${rotateY}deg)`;

        updateCall.current = null;
    };

    const resetStyles = () => {
        clientX.current = elementPosition.current.centerX;
        clientY.current = elementPosition.current.centerY;
        updateStyles();
    };

    useEventListener('mouseenter', onCardMouseEnter, elementRef);
    useEventListener('mouseleave', onCardMouseLeave, elementRef);
    useEventListener('mousemove', onWindowMouseMove);
    useEffect(() => {
        return () => {
            if (updateCall.current !== null) {
                cancelAnimationFrame(updateCall.current);
            }
        };
    }, []);

    return {
        updateStyles: updateStyles,
        styles: {
            willChange: 'transform',
            transition: `${speed}ms ${easing}`,
        },
    };
};
