import {Controller} from "xpresser/types/http";

export = <Controller.Object>{
    name: "AppController",

    middlewares: {
        // Abolish: ["login"]
    },

    index(http) {
        return http.view("index")
    },

    login(http){
        return http.validatedBody()
    }
}