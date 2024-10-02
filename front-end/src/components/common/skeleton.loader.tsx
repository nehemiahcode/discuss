import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';


interface SkeletonLoaderProps {
    count: number;
    containerStyle?: string;
    loaderStyle: string;
}
const SkeletonLoader = ({
    count = 1,
    containerStyle = "grid grid-cols-1 xl:grid-cols-3 gap-4",
    loaderStyle = 'rounded-md bg-[#D9D9D9] h-[400px] w-full'
}: SkeletonLoaderProps) => {
    return (
        <div
            className={`flex ${containerStyle}`}
        >
            {[...Array(count)].map((_, index) => (
                <Skeleton
                    key={index}
                    className={`${loaderStyle}`}
                />
            ))}
        </div>
    );
};

export default SkeletonLoader;
