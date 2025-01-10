import { useEffect, useRef, useState } from 'react';

export const LazyImage = ({ src, alt, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const currentImgRef = imgRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        if (currentImgRef) {
            observer.observe(currentImgRef);
        }

        return () => {
            if (currentImgRef) {
                observer.unobserve(currentImgRef);
            }
        };
    }, []);

    return (
        <img
            ref={imgRef}
            src={isVisible ? src : ''}
            alt={alt}
            {...props}
            loading="lazy"
        />
    );
};