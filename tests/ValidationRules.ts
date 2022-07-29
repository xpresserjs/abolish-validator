// @ts-ignore
import RoutesGuard from "../RoutesGuard";

const guard = new RoutesGuard(true);

guard.post("App@login", {
    email: "required|email",
    username: "required|alphaNumeric"
});

console.dir(guard.compileRules(), { depth: null });

export = guard;
