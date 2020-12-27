import {DollarSign} from "xpresser/types";
import {Abolish} from "abolish";

export = ($: DollarSign) => ({
    /**
     * Abolish Instance Extender.
     * @param Validator
     */
    extendAbolish: (Validator: typeof Abolish): typeof Abolish => {
        // Extend Abolish here.

        return Validator;
    }
})