import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { SearchReducer } from "./SearchReducer";
import { CartReducer } from "./CartReducer";
import { couponReducer } from "./couponReducer";

const rootReducer = combineReducers({
    user: userReducer,
    search: SearchReducer,
    cart: CartReducer,
    coupon: couponReducer,
});

export default rootReducer;