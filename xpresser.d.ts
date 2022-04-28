import "xpresser/types/http";
import type AbolishRequestEngine from "./Extends/RequestEngine";

declare module "xpresser/types/http" {
    interface Http extends AbolishRequestEngine {}
}
