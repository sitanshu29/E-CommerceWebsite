import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);

        //redirect when count is 0
        count === 0 && history.push("/");

        //cleanup
        return () => clearInterval(interval);


    }, [count]);

    return (
        <div className="container p-5 text-center">
            <p className="text-danger">Redirecting you in {count} second...</p>
        </div>
    );
}

export default LoadingToRedirect;