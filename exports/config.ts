import {DollarSign} from "xpresser/types";
import {Abolish} from "abolish";

export = ($: DollarSign) => ({
    extendAbolish: (Validator: typeof Abolish): typeof Abolish => {
        // Extend Abolish here.

        return Validator;
    }
})