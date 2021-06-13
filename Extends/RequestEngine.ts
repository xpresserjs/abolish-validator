import {extendRequestEngine} from "@xpresser/plugin-tools";
import Validator from "./Validator";
import {ValidationResult} from "abolish/src/Types";
import {Abolish} from "abolish";

export = extendRequestEngine((RequestEngineClass) => {
    return class extends RequestEngineClass {
        public abolish?: Validator;


        validate<R = Record<string, any>>(object: Record<string, any>, rules: Record<keyof R | string, any>): ValidationResult<R> {
            return (this.abolish || Validator).validate<R>(object, rules);
        }

        validateAsync<R = Record<string, any>>(object: Record<string, any>, rules: Record<keyof R | string, any>): Promise<ValidationResult<R>> {
            return (this.abolish || Validator).validateAsync<R>(object, rules);
        }

        useAbolish(abolish: Validator | ((abolish: Validator) => Validator)) {
            if (abolish instanceof Abolish) {
                this.abolish = abolish;
            } else {
                this.abolish = abolish(new Validator())
            }

            return this;
        }

        newAbolish(): Validator {
            return new Validator;
        }

        validateQuery<R = Record<string, any>>(rules: Record<keyof R | string, any>): ValidationResult<R> {
            const query = this.$query.all();
            return this.validate<R>(query, rules);
        }

        validateBody<R = Record<string, any>>(rules: Record<keyof R | string, any>): ValidationResult<R> {
            const body = this.$body.all();
            return this.validate<R>(body, rules);
        }

        validateQueryAsync<R = Record<string, any>>(rules: Record<keyof R | string, any>): Promise<ValidationResult<R>> {
            const query = this.$query.all();
            return this.validateAsync<R>(query, rules);
        }

        validateBodyAsync<R = Record<string, any>>(rules: Record<keyof R | string, any>): Promise<ValidationResult<R>> {
            const body = this.$body.all();
            return this.validateAsync<R>(body, rules);
        }

        validatedBody<R = Record<string, any>>(): R {
            return this.state.get("validatedBody", {})
        }
    }
});

// export = (RequestEngineClass: typeof RequestEngine) => {
//
