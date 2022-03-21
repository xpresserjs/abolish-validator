import { DollarSign } from "xpresser/types";
import { Http } from "xpresser/types/http";
import { Abolish } from "abolish";
import { ValidationError } from "abolish/src/Types";
import { registerAllValidators } from "abolish/src/ValidatorHelpers";

export = ($: DollarSign) => ({
    /**
     * Validation Rules
     * If `validationRules.enabled` is true
     * Your ValidationRule file will be loaded
     */
    validationRules: {
        enabled: true,
        // Validation File Path
        file: "backend://ValidationRules",
        // On Validation Error
        onError(http: Http, err: ValidationError) {
            return http.status(400).json({ error: err.message });
        }
    },

    /**
     * Provide Abolish.
     * The Abolish Class returned here will be used for validation.
     * This method also gives you the opportunity to extend Abolish
     * Or provide a custom class to be used.
     */
    provideAbolish: (): typeof Abolish => {
        // Uncomment below if you don't want to use all abolish validators.
        registerAllValidators(Abolish);

        // Provide Abolish.
        return Abolish;
    }
});
