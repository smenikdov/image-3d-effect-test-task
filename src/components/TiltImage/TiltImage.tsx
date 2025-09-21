import React, { useRef } from 'react';
import { useTiltEffect } from './TiltImage.hooks';
import type { TiltImageProps } from './TiltImage.types';

const TiltImage: React.FC<TiltImageProps> = React.memo(({ tiltSettings, style, onLoad, ...otherPorps }) => {
    const imageRef = useRef<HTMLImageElement>(null);

    const {
        styles: tiltStyles,
        updateElementPosition,
    } = useTiltEffect(imageRef, tiltSettings);

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        updateElementPosition();
        onLoad?.(event);
    };

    return (
        <img
            ref={imageRef}
            onLoad={handleLoad}
            style={{ ...style, ...tiltStyles }}
            {...otherPorps}
        />
    );
});

export default TiltImage;
