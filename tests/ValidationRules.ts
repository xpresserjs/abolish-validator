import AbolishRoutes from "../dist/AbolishRoutes";

const routes = new AbolishRoutes();

routes.post("/", {name: "required"})

export = routes;