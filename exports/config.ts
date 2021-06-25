import {DollarSign} from "xpresser/types";
import {Abolish} from "abolish";
import {Http} from "xpresser/types/http";
import AbolishError from "abolish/src/AbolishError";

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
        onError(http: Http, err: AbolishError) {
            return http.status(400).json({error: err.message});
        }
    },


    /**
     * Abolish Instance Extender.
     * @param Validator
     */
    extendAbolish: (Validator: typeof Abolish): typeof Abolish => {
        // Extend Abolish here.

        return Validator;
    }
})