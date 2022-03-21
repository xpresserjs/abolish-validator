import type { ValidationResult } from "abolish/src/Types";
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
    validate<R = Record<string, any>>(
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
    validateAsync<R = Record<string, any>>(
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
    validateQuery<R = Record<string, any>>(
        rules: Record<keyof R | string, any>
    ): ValidationResult<R> {
        const query = this.$query.all();
        return this.validate<R>(query, rules);
    }

    /**
     * Validate body data
     * @param rules
     */
    validateBody<R = Record<string, any>>(
        rules: Record<keyof R | string, any>
    ): ValidationResult<R> {
        const body = this.$body.all();
        return this.validate<R>(body, rules);
    }

    /**
     * Validate query data Async
     * @param rules
     */
    validateQueryAsync<R = Record<string, any>>(
        rules: Record<keyof R | string, any>
    ): Promise<ValidationResult<R>> {
        const query = this.$query.all();
        return this.validateAsync<R>(query, rules);
    }

    /**
     * Validate body data Async
     * @param rules
     */
    validateBodyAsync<R = Record<string, any>>(
        rules: Record<keyof R | string, any>
    ): Promise<ValidationResult<R>> {
        const body = this.$body.all();
        return this.validateAsync<R>(body, rules);
    }

    /**
     * Get validated body data.
     */
    validatedBody<R = Record<string, any>>(): R {
        return this.state.get<R>("validatedBody", {} as R);
    }
}

export = AbolishRequestEngine;

declare module "xpresser/types/http" {
    interface Http extends AbolishRequestEngine {}
}
