import React from 'react';
import Lottie from 'react-lottie';
import bookLoad from "../../src/json/loadingicon.json";

const BookLoading=()=>{
    const defaultOptions={
        loop: true,
        autoplay: true,
        animationData: bookLoad
        
    }
    return(
        <div>
            <Lottie 
             options={defaultOptions}
             height={250}
             width={250}
            />
        </div>
    )
}
export default BookLoading;