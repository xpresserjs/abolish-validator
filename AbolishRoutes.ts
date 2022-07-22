import { $ } from "./plugin-config";
import { Obj } from "object-collection/exports";
import { CompileRouteRules, RoutesGuardMethods, RoutesGuardRule } from "./index";

type AbolishMergeSource = Record<string, any> | AbolishRoutes;

class AbolishRoutes {
    #rules = Obj({});

    constructor() {
        $.logDeprecated(
            "1.12.0",
            "1.13.0",
            [
                `Class {{AbolishRoutes}} is deprecated. Use {{RoutesGuard}} instead.`,
                null,
                `{{RoutesGuard}} can be imported from: {{"@xpresser/abolish/RoutesGuard"}}`
            ],
            true
        );
        console.trace();
    }

    /**
     * Merge multiple abolish routes instances
     * @param sources
     */
    static many(sources: AbolishMergeSource | AbolishMergeSource[]) {
        if (!Array.isArray(sources)) {
            return new AbolishRoutes().merge(sources);
        }

        // Create new instance and merge all sources
        const abolishRoutes = new AbolishRoutes();
        sources.forEach((source) => abolishRoutes.merge(source));

        return abolishRoutes;
    }

    /**
     * Validate Post Request
     * @param action
     * @param rules
     */
    post(action: string, rules: RoutesGuardRule) {
        this.#rules.path("POST").set(action, rules);
        return this;
    }

    /**
     * Validate Put Request
     * @param action
     * @param rules
     */
    put(action: string, rules: RoutesGuardRule) {
        this.#rules.path("PUT").set(action, rules);
        return this;
    }

    /**
     * Validate Patch Request
     * @param action
     * @param rules
     */
    patch(action: string, rules: RoutesGuardRule) {
        this.#rules.path("PATCH").set(action, rules);
        return this;
    }

    /**
     * Merge another Abolish Route Instance.
     * @param source
     */
    merge(source: AbolishMergeSource) {
        this.#rules.merge(source instanceof AbolishRoutes ? source.compileRules() : source);
        return this;
    }

    rules(): RoutesGuardMethods {
        return this.#rules.data;
    }

    compileRules(): RoutesGuardMethods {
        return CompileRouteRules(this.#rules.data);
    }
}

export = AbolishRoutes;
