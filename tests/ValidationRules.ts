import AbolishRoutes from "../dist/AbolishRoutes";

const routes = new AbolishRoutes();

routes.post("App@login", {
    email: "required|email",
    username: "required|alphaNumeric"
});

export = routes;
