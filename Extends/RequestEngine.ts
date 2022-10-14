import type { ValidationResult } from "abolish/src/types";
import type { Abolish } from "abolish";
import { getInstance } from "xpresser";

const $ = getInstance();
// Get provided Abolish Class
const ProvidedAbolish = $.engineData.call<typeof Abolish>("getProvidedAbolish");

class AbolishRequestEngine extends $.extendedRequestEngine() {
    /**
     * Initialize abolish instance
     */
    public abolish = new ProvidedAbolish();

    /**
     * Validate data
     * @param object
     * @param rules
     */
    validate<R extends Record<string, any> = Record<string, any>>(
        object: Record<string, any>,
        rules: Record<keyof R | string, any>
    ): ValidationResult<R> {
        return (this.abolish || ProvidedAbolish).validate<R>(object, rules);
    }

    /**
     * Validate data Async
     * @param object
     * @param rules
     */
    validateAsync<R extends Record<string, any> = Record<string, any>>(
        object: Record<string, any>,
        rules: Record<keyof R | string, any>
    ): Promise<ValidationResult<R>> {
        return (this.abolish || ProvidedAbolish).validateAsync<R>(object, rules);
    }

    /**
     * Use a specific abolish validator class
     * @param abolish
     */
    useAbolish<T = Abolish>(abolish: T) {
        this.abolish = abolish as unknown as Abolish;
        return this;
    }

    /**
     * Get new validator instance
     */
    newAbolish(): Abolish {
        return new ProvidedAbolish();
    }

    /**
     * Validate query data
     * @param rules
     */
    validateQuery<R extends Record<string, any> = Record<string, any>>(
        rules: Record<keyof R | string, any>
    ): ValidationResult<R> {
        return this.validate<R>(this.req.query, rules);
    }

    /**
     * Validate body data
     * @param rules
     */
    validateBody<R extends Record<string, any> = Record<string, any>>(
        rules: Record<keyof R | string, any>
    ): ValidationResult<R> {
        return this.validate<R>(this.req.body, rules);
    }

    /**
     * Validate query data Async
     * @param rules
     */
    validateQueryAsync<R extends Record<string, any> = Record<string, any>>(
        rules: Record<keyof R | string, any>
    ): Promise<ValidationResult<R>> {
        return this.validateAsync<R>(this.req.query, rules);
    }

    /**
     * Validate body data Async
     * @param rules
     */
    validateBodyAsync<R extends Record<string, any> = Record<string, any>>(
        rules: Record<keyof R | string, any>
    ): Promise<ValidationResult<R>> {
        return this.validateAsync<R>(this.req.body, rules);
    }

    /**
     * Get validated body data.
     */
    validatedBody<R = Record<string, any>>(): R {
        return this.state.data["validatedBody"] || ({} as R);
    }
}

export = AbolishRequestEngine;

declare module "xpresser/types/http" {
    interface Http extends AbolishRequestEngine {}
}
