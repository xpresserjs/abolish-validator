import { Abolish } from "abolish";
import { Http } from "xpresser/types/http";
import { ValidationError } from "abolish/src/types";

export = () => ({
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
     * Provide Abolish Extender.
     */
    provideAbolish: (): typeof Abolish => {
        // Add abolish string validators
        Abolish.addGlobalValidators(require("abolish/validators/string"));

        return Abolish;
    }
});
