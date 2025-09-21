import React, { useRef } from 'react';
import CatImage from 'assets/image.png';
import TiltImage from 'components/TiltImage';
import type { TiltEffectSettings } from 'components/TiltImage';
import 'styles/index.scss';

function App() {
    const settings = useRef<TiltEffectSettings>({ reverseY: true, perspective: 300, maxAngle: 20 });

    return (
        <main className="app">
            <TiltImage
                src={CatImage}
                alt="Upside down gray cat"
                className="cat-image"
                tiltSettings={settings.current}
            />
        </main>
    );
}

export default App;
