import type { AbolishSchema, ValidationResult } from "abolish/src/types";
import type { Abolish } from "abolish";
import { getInstance } from "xpresser";
import type { AbolishCompiledObject } from "abolish/src/Compiler";
import { IsAbolishXpresserError } from "../index";

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
        rules: AbolishSchema<R>
    ): ValidationResult<R>;
    validate<R extends Record<string, any>>(
        object: Record<string, any>,
        rules: AbolishCompiledObject
    ): ValidationResult<R>;
    validate<R extends Record<string, any> = Record<string, any>>(
        object: Record<string, any>,
        rules: Record<string, any>
    ): ValidationResult<R> {
        return (this.abolish || ProvidedAbolish).validate<R>(object, rules as AbolishSchema<R>);
    }

    /**
     * Validate data Async
     * @param object
     * @param rules
     */
    validateAsync<R extends Record<string, any> = Record<string, any>>(
        object: Record<string, any>,
        rules: AbolishSchema<R>
    ): Promise<ValidationResult<R>>;
    validateAsync<R extends Record<string, any>>(
        object: Record<string, any>,
        rules: AbolishCompiledObject
    ): Promise<ValidationResult<R>>;
    validateAsync<R extends Record<string, any> = Record<string, any>>(
        object: Record<string, any>,
        rules: Record<string, any>
    ): Promise<ValidationResult<R>> {
        return (this.abolish || ProvidedAbolish).validateAsync<R>(
            object,
            rules as AbolishSchema<R>
        );
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
        rules: AbolishSchema<R> | AbolishCompiledObject
    ): ValidationResult<R> {
        return this.validate<R>(this.req.query, rules as AbolishSchema<R>);
    }

    /**
     * Validate body data
     * @param rules
     */
    validateBody<R extends Record<string, any> = Record<string, any>>(
        rules: AbolishSchema<R> | AbolishCompiledObject
    ): ValidationResult<R> {
        return this.validate<R>(this.req.body, rules as AbolishSchema<R>);
    }

    /**
     * Validate query data Async
     * @param rules
     */
    validateQueryAsync<R extends Record<string, any> = Record<string, any>>(
        rules: AbolishSchema<R> | AbolishCompiledObject
    ): Promise<ValidationResult<R>> {
        return this.validateAsync<R>(this.req.query, rules as AbolishSchema<R>);
    }

    /**
     * Validate body data Async
     * @param rules
     */
    validateBodyAsync<R extends Record<string, any> = Record<string, any>>(
        rules: AbolishSchema<R> | AbolishCompiledObject
    ): Promise<ValidationResult<R>> {
        return this.validateAsync<R>(this.req.body, rules as AbolishSchema<R>);
    }

    /**
     * Get validated body data.
     */
    validatedBody<R = Record<string, any>>(): R {
        return this.state.data["validatedBody"] || ({} as R);
    }

    /**
     * Validate body or throw error
     * @param rules - Validation rules
     */
    validateBodyOrThrow<T extends Record<string, any>>(
        rules: AbolishCompiledObject | AbolishSchema<T>
    ): T {
        const [err, body] = this.validateBody<T>(rules);
        if (err) throw new IsAbolishXpresserError(err);
        return body!;
    }

    /**
     * Validate query or throw error
     * @param rules - Validation rules
     */
    validateQueryOrThrow<T extends Record<string, any>>(
        rules: AbolishCompiledObject | AbolishSchema<T>
    ): T {
        const [err, query] = this.validateQuery<T>(rules);
        if (err) throw new IsAbolishXpresserError(err);
        return query!;
    }

    /**
     * Validate body or throw error async
     * @param rules - Validation rules
     */
    async validateBodyOrThrowAsync<T extends Record<string, any>>(
        rules: AbolishCompiledObject | AbolishSchema<T>
    ): Promise<T> {
        const [err, body] = await this.validateBodyAsync<T>(rules);
        if (err) throw new IsAbolishXpresserError(err);
        return body!;
    }

    /**
     * Validate query or throw error async
     * @param rules - Validation rules
     */
    async validateQueryOrThrowAsync<T extends Record<string, any>>(
        rules: AbolishCompiledObject | AbolishSchema<T>
    ): Promise<T> {
        const [err, query] = await this.validateQueryAsync<T>(rules);
        if (err) throw new IsAbolishXpresserError(err);
        return query!;
    }
}

export = AbolishRequestEngine;

declare module "xpresser/types/http" {
    interface Http extends AbolishRequestEngine {}
}
