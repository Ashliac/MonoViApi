import { Router } from "express";
import { CaseController } from "./controllers";



export class CaseRoutes {
    static get routes(): Router {
        const router = Router();
        const caseController = new CaseController();
        router.get("/", caseController.listAllCases);
        router.post("/", caseController.addNewCase);
        router.get("/:id", caseController.findCaseById);
        router.put("/:id", caseController.updateCase);
        router.delete("/:id", caseController.deleteCase);
        router.get("/recent/week", caseController.getRecentCases);

        return router;

    }
}