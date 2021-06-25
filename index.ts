import {DollarSign} from "xpresser/types";
import {pluginConfig} from "./plugin-config"
import {Http} from "xpresser/types/http";
import {ParseRules} from "abolish";
import {getInstance} from "xpresser";

const $ = getInstance()
let routes: any[] = [];

export function run(config: any, $: DollarSign) {

    $.on.boot(next => {
        const Validator = require("./Extends/Validator");

        if (pluginConfig.has('extendAbolish')) {
            pluginConfig.all().extendAbolish(Validator);
        }

        return next()
    });

    $.on.bootServer((next) => {
        routes = $.routerEngine.allProcessedRoutes();
        return next();
    })
}

type ValidateRoutesArgType = Record<string, Record<string, any> | ((http: Http) => Record<string, any>)>

/**
 * ValidateRoutes
 * Parse all rules for performance purposes.
 * @constructor
 * @param methods
 */
export function ValidateRoutes(
    methods: {
        POST?: ValidateRoutesArgType,
        PUT?: ValidateRoutesArgType,
        PATCH?: ValidateRoutesArgType
    }
) {
    // New rules holder
    let parsedRules: Record<string, any> = {};

    for (let method in methods) {
        const rules = (methods as any)[method]
        parsedRules[method] = {};
        /**
         * Loop through rules, find controllers and replace with path.
         */
        for (let rule in rules) {
            if (!rules.hasOwnProperty(rule)) continue;

            // Get and Check rule
            const thisRule = rules[rule];

            // if is controller
            if (rule[0] !== "/" && rule.toLowerCase().includes("@"))
                // use path of controller instead
                rule = ControllerToPath(rule);

            // Else use as it is.
            parsedRules[method][rule] =
                typeof thisRule === "function" ? thisRule : ParseRules(thisRule);
        }
    }

    // Return ParsedRules.
    return parsedRules;
}

/**
 * Get path using controller name.
 * @param controller
 * @constructor
 */
function ControllerToPath(controller: string) {

    const find = routes.filter((route) => route.controller === controller);

    if (!find.length)
        return $.logErrorAndExit(
            `Validation Rules: Controller {${controller}} controller found.`
        );

    if (find.length > 1) {
        return $.logErrorAndExit(
            `Validation Rules: Controller {${controller}} is paired to multiple paths, use exact path instead.`
        );
    }

    return find[0].path;
}
