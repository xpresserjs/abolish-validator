import "xpresser/types/http";
import type {ValidationResult} from "abolish/src/Types";
import type {Abolish} from "abolish";

declare module "xpresser/types/http" {
    interface Http {
        abolish: Abolish;

        newAbolish(): Abolish

        useAbolish(abolish: Abolish | ((abolish: Abolish) => Abolish)): this;

        validate<R = Record<string, any>>(object: Record<string, any>, rules: Record<keyof R | string, any>): ValidationResult<R>

        validateQuery<R = Record<string, any>>(rules: Record<keyof R | string, any>): ValidationResult<R>

        validateBody<R = Record<string, any>>(rules: Record<keyof R | string, any>): ValidationResult<R>

        validateAsync<R = Record<string, any>>(object: Record<string, any>, rules: Record<keyof R | string, any>): Promise<ValidationResult<R>>

        validateQueryAsync<R = Record<string, any>>(rules: Record<keyof R | string, any>): Promise<ValidationResult<R>>

        validateBodyAsync<R = Record<string, any>>(rules: Record<keyof R | string, any>): Promise<ValidationResult<R>>

        validatedBody<R = Record<string, any>>(): R
    }
}