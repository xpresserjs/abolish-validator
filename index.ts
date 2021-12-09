import { DollarSign, PluginData } from "xpresser/types";
import { pluginConfig } from "./plugin-config";
import { Http } from "xpresser/types/http";
import { ParseRules } from "abolish";

let $: DollarSign;
let routes: any[] = [];

/**
 * Xpresser Run Plugin Function
 * @param config
 * @param $
 */
export function run(config: PluginData, $: DollarSign) {
    /**
     * Skip connecting to db when running native xpresser commands
     */
    if ($.isNativeCliCommand()) return;

    // Load abolish Extender
    $.on.boot((next) => {
        const Validator = require("./Extends/Validator");

        if (pluginConfig.has("extendAbolish")) {
            pluginConfig.all().extendAbolish(Validator);
        }

        return next();
    });

    // Load Processed Routes
    $.on.bootServer((next) => {
        routes = $.routerEngine.allProcessedRoutes();
        return next();
    });
}

export type AbolishRoutesRule = Record<string, any> | ((http: Http) => Record<string, any>);
export type AbolishRoutesRules = Record<string, AbolishRoutesRule>;
export type AbolishRoutesMethods = {
    POST?: AbolishRoutesRules;
    PUT?: AbolishRoutesRules;
    PATCH?: AbolishRoutesRules;
};

/**
 * ValidateRoutes
 * Parse all rules for performance purposes.
 * @constructor
 * @param methods
 */
export function ValidateRoutes(methods: AbolishRoutesMethods): AbolishRoutesMethods {
    // New rules holder
    let parsedRules: Record<string, any> = {};

    for (let [method, rules] of Object.entries(methods)) {
        parsedRules[method] = {} as AbolishRoutesRules;
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
    return parsedRules as AbolishRoutesMethods;
}

/**
 * Get path using controller name.
 * @param controller
 * @constructor
 */
function ControllerToPath(controller: string) {
    // Add Controller to string if not exists.
    if (!controller.toLowerCase().includes("controller@")) {
        const c = controller.split("@");
        c[0] = c[0] + "Controller";
        controller = c.join("@");
    }

    const find = routes.filter((route) => route.controller === controller);

    if (!find.length)
        return $.logErrorAndExit(`Validation Rules: Controller {${controller}} controller found.`);

    if (find.length > 1) {
        return $.logErrorAndExit(
            `Validation Rules: Controller {${controller}} is paired to multiple paths, use exact path instead.`
        );
    }

    return find[0].path;
}
