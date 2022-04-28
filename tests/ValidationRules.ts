// @ts-ignore
import RoutesGuard from "../RoutesGuard";

const guard = new RoutesGuard();

guard.post("App@login", {
    email: "required|email",
    username: "required|alphaNumeric"
});

export = guard;
