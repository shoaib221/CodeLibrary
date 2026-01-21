import React from 'react';

export const Loading = () => {
    return (
        <div className='flex justify-center items-center' >
            <span className="text-2xl loading loading-infinity loading-xl"></span>

        </div>
    );
};


export const Loading2 = () => {
    return (
        <div className='grow flex justify-center items-center' >
            <span className="text-2xl loading loading-infinity loading-xl"></span>

        </div>
    );
};

export const Loading3 = () => {
    return (
        <div className='flex-1 flex justify-center items-center w-full' >
            <span className="text-2xl loading loading-infinity loading-xl"></span>

        </div>
    );
}

export const Loading4 = () => {

    return (
        <div id='loading-4' className="flex w-full h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
    )
}