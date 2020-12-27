import {DollarSign} from "xpresser/types";
import {pluginConfig} from "./plugin-config"

export function run(config: any, $: DollarSign) {

    $.on.boot(next => {
        const Validator = require("./Extends/Validator");

        if(pluginConfig.has('extendAbolish')){
            pluginConfig.all().extendAbolish(Validator);
        }

        return next()
    })
}