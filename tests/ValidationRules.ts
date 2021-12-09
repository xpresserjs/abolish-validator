import AbolishRoutes from "../dist/AbolishRoutes";

const routes = new AbolishRoutes();

routes.post("/", {
    email: "required|email",
    username: "required|alphaNumeric"
});

export = routes;
