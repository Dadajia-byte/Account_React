import { configureStore } from "@reduxjs/toolkit";

import billStore from "./modules/billStore";

export default configureStore({
    reducer: {
        bill: billStore
    }
})