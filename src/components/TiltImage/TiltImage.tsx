import React, { useRef } from 'react';
import { useTiltEffect } from './TiltImage.hooks';
import type { TiltImageProps } from './TiltImage.types';

const TiltImage: React.FC<TiltImageProps> = React.memo(({ tiltSettings, style, ...otherPorps }) => {
    const imageRef = useRef<HTMLImageElement>(null);

    const { styles: tiltStyles } = useTiltEffect(imageRef, tiltSettings);

    return (
        <img
            ref={imageRef}
            style={{ ...style, ...tiltStyles }}
            {...otherPorps}
        />
    );
});

export default TiltImage;
