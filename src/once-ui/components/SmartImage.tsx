'use client';

import React, { CSSProperties, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Flex, Skeleton } from '@/once-ui/components';

export type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    className?: string;
    style?: React.CSSProperties;
    aspectRatio?: string;
    height?: number;
    radius?: string;
    isLoading?: boolean;
    objectFit?: CSSProperties['objectFit'];
    enlarge?: boolean;
    src: string;
};

const SmartImage: React.FC<SmartImageProps> = ({
    className,
    style,
    aspectRatio,
    height,
    radius,
    isLoading = false,
    objectFit = 'cover',
    enlarge = false,
    src,
    ...props // This ensures tabIndex and other img attributes are passed down
}) => {
    const [isEnlarged, setIsEnlarged] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (enlarge) {
            setIsEnlarged(!isEnlarged);
        }
    };

    useEffect(() => {
        document.body.style.overflow = isEnlarged ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isEnlarged]);

    const calculateTransform = () => {
        if (!imageRef.current) return {};

        const rect = imageRef.current.getBoundingClientRect();
        const scaleX = window.innerWidth / rect.width;
        const scaleY = window.innerHeight / rect.height;
        const scale = Math.min(scaleX, scaleY) * 0.9;

        const translateX = (window.innerWidth - rect.width) / 2 - rect.left;
        const translateY = (window.innerHeight - rect.height) / 2 - rect.top;

        return {
            transform: isEnlarged
                ? `translate(${translateX}px, ${translateY}px) scale(${scale})`
                : 'translate(0, 0) scale(1)',
            transition: 'all 0.3s ease-in-out',
            zIndex: isEnlarged ? 2 : 1,
        };
    };

    return (
        <>
            <Flex
                ref={imageRef}
                fillWidth
                position="relative"
                {...(!isEnlarged && { background: 'neutral-medium' })}
                style={{
                    outline: 'none',
                    overflow: 'hidden',
                    height: aspectRatio ? undefined : height ? `${height}rem` : '100%',
                    aspectRatio,
                    cursor: enlarge ? 'pointer' : 'default',
                    borderRadius: isEnlarged ? '0' : radius ? `var(--radius-${radius})` : undefined,
                    ...calculateTransform(),
                    ...style,
                }}
                className={classNames(className)}
                onClick={handleClick}>
                {isLoading && <Skeleton shape="block" />}

                {!isLoading && (
                    <img
                        {...props} // ✅ Allows tabIndex, alt, style, etc.
                        src={src}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: isEnlarged ? 'contain' : objectFit,
                        }}
                    />
                )}
            </Flex>
        </>
    );
};

SmartImage.displayName = 'SmartImage';

export { SmartImage };
