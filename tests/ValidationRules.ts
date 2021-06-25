import {ValidateRoutes} from "../";

const routes = ValidateRoutes({
    POST: {
        "/": {
            name: "required",
        }
    }
})

export = routes;