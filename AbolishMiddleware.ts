import { Http } from "xpresser/types/http";
import { getInstance } from "xpresser";
import { pluginConfig } from "./plugin-config";
import AbolishRoutes from "./AbolishRoutes";

const $ = getInstance();
const ValidationRulesPath = pluginConfig.get("validationRules.file");
const OnErrorFunction = pluginConfig.get("validationRules.onError");

let ValidationRules: any = {};

/**
 * Load Validation rules file before we boot server;
 */

if (pluginConfig.get("validationRules.enabled", false)) {
    $.on.bootServer((next) => {
        // Require Validation rules.
        try {
            ValidationRules = require($.path.resolve(ValidationRulesPath));

            if (!ValidationRules || typeof ValidationRules !== "object") {
                return $.logErrorAndExit(`ValidationRules File must return an object!`);
            }

            if (
                ValidationRules instanceof AbolishRoutes ||
                typeof (ValidationRules as AbolishRoutes).compileRules === "function"
            ) {
                ValidationRules = ValidationRules.compileRules();
            }
        } catch (e: any) {
            return $.logErrorAndExit(e.message);
        }

        next();
    });
}

/**
 * AbolishMiddleware
 */
export = async (http: Http): Promise<any> => {
    // Only for POST, PUT & PATCH REQUESTS
    const method = http.req.method.toUpperCase();
    if (!["POST", "PATCH", "PUT"].includes(method)) {
        return http.next();
    }

    if (!ValidationRules.hasOwnProperty(method)) return http.next();

    let rules = ValidationRules[method][http.req.route?.path || http.req.path];

    // Parse if function.
    if (typeof rules === "function") {
        rules = await rules(http);
    }

    // check if current path has validation rules
    if (!rules) {
        return http.next();
    }

    // Validate
    const [err, validated] = await http.validateBodyAsync(rules);

    // return Error if error
    if (err) {
        return OnErrorFunction(http, err);
    }

    // Save to state for later use.
    http.state.set("validatedBody", validated);

    // Continue request.
    return http.next();
};
