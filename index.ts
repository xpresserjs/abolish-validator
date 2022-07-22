import { DollarSign, PluginData } from "xpresser/types";
import { pluginConfig } from "./plugin-config";
import { Http } from "xpresser/types/http";
import { Abolish, Schema } from "abolish";
import { AbolishCompiled } from "abolish/src/Compiler";

let dollarSign: DollarSign;
let routes: any[] = [];

export function dependsOn() {
    return ["abolish"];
}

/**
 * Xpresser Run Plugin Function
 * @param config
 * @param $
 */
export function run(config: PluginData, $: DollarSign) {
    dollarSign = $;

    /**
     * Skip connecting to db when running native xpresser commands
     */
    if ($.isNativeCliCommand()) return;

    // Load abolish Extender
    $.on.boot((next) => {
        const { Abolish } = require("abolish");

        if (pluginConfig.has("extendAbolish")) {
            $.logDeprecated("1.11.1", "1.11.1", [
                "Abolish Config: `extendAbolish` is now deprecated, please rename the function to `provideAbolish` instead"
            ]);

            $.logErrorAndExit("Make changes and restart server to apply changes");
        }

        let providedAbolish = Abolish;
        if (pluginConfig.has("provideAbolish")) {
            providedAbolish = pluginConfig.data.provideAbolish();
        }

        $.engineData.set("getProvidedAbolish", () => providedAbolish);

        return next();
    });

    // Load Processed Routes
    $.on.bootServer((next) => {
        routes = $.routerEngine.allProcessedRoutes();

        return next();
    });
}

export type RoutesGuardRule = Record<string, any> | ((http: Http) => Record<string, any>);
export type RoutesGuardRules = Record<string, RoutesGuardRule>;
export type RoutesGuardMethods = {
    POST?: RoutesGuardRules;
    PUT?: RoutesGuardRules;
    PATCH?: RoutesGuardRules;
};

/**
 * ValidateRoutes
 * Parse all rules for performance purposes.
 * @constructor
 * @param methods
 * @param useCompiledRules
 */
export function CompileRouteRules(
    methods: RoutesGuardMethods,
    useCompiledRules = false
): RoutesGuardMethods {
    // New rules holder
    let parsedRules: Record<string, any> = {};

    for (let [method, rules] of Object.entries(methods)) {
        parsedRules[method] = {} as RoutesGuardRules;
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
                typeof thisRule === "function" || thisRule instanceof AbolishCompiled
                    ? thisRule
                    : useCompiledRules
                    ? Abolish.compileObject(thisRule)
                    : Schema(thisRule);
        }
    }

    // Return ParsedRules.
    return parsedRules as RoutesGuardMethods;
}

/**
 * Get path using controller name.
 * @param controller
 * @constructor
 */
function ControllerToPath(controller: string) {
    const $ = dollarSign;

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
