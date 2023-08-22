// @ts-ignore
import RoutesGuard from "../RoutesGuard";
import { Abolish } from "abolish";

const guard = new RoutesGuard(true);

export const LoginSchema = Abolish.compileObject({
    email: "required|email",
    username: "required|alphaNumeric"
});

guard.post("App@login", LoginSchema);

export default guard;
