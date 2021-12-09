import Validator from "./Validator";
import { ValidationResult } from "abolish/src/Types";
import type { Abolish } from "abolish";
import { getInstance } from "xpresser";

const $ = getInstance();

class AbolishRequestEngine extends $.extendedRequestEngine() {
    /**
     * Initialize abolish instance
     */
    public abolish = new Validator();

    /**
     * Validate data
     * @param object
     * @param rules
     */
    validate<R = Record<string, any>>(
        object: Record<string, any>,
        rules: Record<keyof R | string, any>
    ): ValidationResult<R> {
        return (this.abolish || Validator).validate<R>(object, rules);
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
        return (this.abolish || Validator).validateAsync<R>(object, rules);
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
    newAbolish(): Validator {
        return new Validator();
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
        return this.state.get("validatedBody", {});
    }
}

export = AbolishRequestEngine;
