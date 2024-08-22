import { useEffect, useState } from 'react';
import {debounce} from "lodash";

type WindowDimensions = {
    width: number | undefined;
    height: number | undefined;
};

const useWindowDimensions = (): WindowDimensions => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
        width: undefined,
        height: undefined,
    });


    useEffect(() => {
        function handleResize(): void {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        handleResize();
        window.addEventListener('resize', debounce(handleResize, 500));
        return (): void => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
};

export default useWindowDimensions;