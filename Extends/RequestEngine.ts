import {Abolish} from "abolish";
import {extendRequestEngine} from "@xpresser/plugin-tools";
import Validator from "./Validator";
import {ValidationResult} from "abolish/types/src/Types";

export = extendRequestEngine((RequestEngineClass) => {
    return class extends RequestEngineClass {


        validate<R = Record<string, any>>(object: Record<string, any>, rules: Record<keyof R | string, any>): ValidationResult<R> {
            const body = this.$body.all();
            return Validator.validate<R>(body, rules);
        }

        newAbolish(): Abolish {
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


        validateAsync<R = Record<string, any>>(object: Record<string, any>, rules: Record<keyof R | string, any>): Promise<ValidationResult<R>> {
            const body = this.$body.all();
            return Validator.validateAsync<R>(body, rules);
        }

        validateQueryAsync<R = Record<string, any>>(rules: Record<keyof R | string, any>): Promise<ValidationResult<R>> {
            const query = this.$query.all();
            return this.validateAsync<R>(query, rules);
        }

        validateBodyAsync<R = Record<string, any>>(rules: Record<keyof R | string, any>): Promise<ValidationResult<R>> {
            const body = this.$body.all();
            return this.validateAsync<R>(body, rules);
        }
    }
});

// export = (RequestEngineClass: typeof RequestEngine) => {
//
