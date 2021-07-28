import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { SearchReducer } from "./SearchReducer";
import { CartReducer } from "./CartReducer";

const rootReducer = combineReducers({
    user: userReducer,
    search: SearchReducer,
    cart: CartReducer,
});

export default rootReducer;