import { Obj } from "object-collection/exports";
import { CompileRouteRules, RoutesGuardMethods, RoutesGuardRule } from "./index";

type AbolishMergeSource = Record<string, any> | RoutesGuard;

class RoutesGuard {
    #rules = Obj({});

    constructor(public useCompiledRules = false) {}

    /**
     * Merge multiple abolish routes instances
     * @param sources
     */
    static many(sources: AbolishMergeSource | AbolishMergeSource[]) {
        if (!Array.isArray(sources)) {
            return new RoutesGuard().merge(sources);
        }

        // Create new instance and merge all sources
        const guard = new RoutesGuard();
        sources.forEach((source) => guard.merge(source));

        return guard;
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
        this.#rules.merge(source instanceof RoutesGuard ? source.compileRules() : source);
        return this;
    }

    /**
     * Return rules data
     */
    rules(): RoutesGuardMethods {
        return this.#rules.data;
    }

    /**
     * Compile rules
     */
    compileRules(): RoutesGuardMethods {
        return CompileRouteRules(this.#rules.data, this.useCompiledRules);
    }
}

export = RoutesGuard;
