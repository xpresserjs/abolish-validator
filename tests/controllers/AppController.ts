import {Controller} from "xpresser/types/http";

export = <Controller.Object>{
    index(http) {
        return http.view("index")
    },

    login(http){
        return http.validatedBody()
    }
}