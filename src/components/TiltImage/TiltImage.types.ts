export interface TiltEffectSettings {
    disabled?: boolean;
    reverseX?: boolean;
    reverseY?: boolean;
    maxAngle?: number;
    perspective?: number;
    easing?: string;
    speed?: number;
    disableAnimationDelay?: number;
};

export interface TiltEffectReturn {
    updateStyles: () => void;
    styles: React.CSSProperties;
}

export interface TiltImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    tiltSettings: TiltEffectSettings;
};
