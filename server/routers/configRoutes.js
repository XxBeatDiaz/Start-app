import routerWorkspacce from "./workspaceRoute.js";
import routeLink from "./linkRoute.js";
import routePath from "./pathFileRoute.js"


function configRoutes(app) {
    app.use("/link",routeLink)
    app.use("/path", routePath)
    app.use("/workspace",routerWorkspacce)


    app.use("/", (req, res) => {
        res.status(404).send("Not Found Router");
        console.log('not found ');

    });
}
export { configRoutes };
