import {Obj} from "object-collection/exports";
import {ValidateRoutes, AbolishRoutesMethods, AbolishRoutesRule} from "./index";


class AbolishRoutes {
    #rules = Obj({});

    /**
     * Validate Post Request
     * @param action
     * @param rules
     */
    post(action: string, rules: AbolishRoutesRule) {
        this.#rules.path("POST").set(action, rules);
        return this;
    }

    /**
     * Validate Put Request
     * @param action
     * @param rules
     */
    put(action: string, rules: AbolishRoutesRule) {
        this.#rules.path("PUT").set(action, rules);
        return this;
    }

    /**
     * Validate Patch Request
     * @param action
     * @param rules
     */
    patch(action: string, rules: AbolishRoutesRule) {
        this.#rules.path("PATCH").set(action, rules);
        return this;
    }

    /**
     * Merge another Abolish Route Instance.
     * @param source
     */
    merge(source: Record<string, any> | AbolishRoutes) {
        this.#rules.merge(
            source instanceof AbolishRoutes ? source.compileRules() : source
        );
        return this;
    }

    rules(): AbolishRoutesMethods {
        return this.#rules.data
    }

    compileRules(): AbolishRoutesMethods {
        return ValidateRoutes(this.#rules.data);
    }
}

export = AbolishRoutes;
