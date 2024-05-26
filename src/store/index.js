import { configureStore } from "@reduxjs/toolkit";

import billStore from "./modules/billStore";
import userStore from "./modules/user"
export default configureStore({
    reducer: {
        bill: billStore,
        user: userStore
    }
})