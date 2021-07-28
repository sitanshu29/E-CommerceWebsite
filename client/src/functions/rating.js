import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {

    if (p && p.ratings) {
        let ratingsArray = p && p.ratings;
        let total = 0;
        let length = ratingsArray.length;

        ratingsArray.map((r) => total += r.star);

        let res = total / length;
        console.log("RES", res);

        return (
            <div className="text-center pt-1 pb-3">
                <span>
                    <StarRating
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="red"
                        editing={false}
                        rating={res} />
                </span>{" "}
                ({p.ratings.length})
            </div>
        )

    }
}