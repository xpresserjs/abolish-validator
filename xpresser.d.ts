import "xpresser/types/http";
import type AbolishRequestEngine from "./dist/Extends/RequestEngine";

declare module "xpresser/types/http" {
    interface Http extends AbolishRequestEngine {}
}
