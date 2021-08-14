import { useEffect, useState } from 'react';

function useWaitAllImages(imageCount: number) {
    const [imagesLoadedCount, setImageLoadedCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (imagesLoadedCount >= imageCount && isLoading) {
            setIsLoading(false);
        }
    }, [imageCount, imagesLoadedCount, isLoading]);

    const onLoadNotification = () => {
        setImageLoadedCount(imagesLoadedCount + 1);
    }

    return { isLoading, onLoadNotification };
}

export default useWaitAllImages;