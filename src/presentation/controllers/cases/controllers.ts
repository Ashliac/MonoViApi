import { Request, Response } from "express";
import { MonoViModel } from "../../../data/models/monoVi.model";

export class CaseController {

    public async listAllCases(req: Request, res: Response): Promise<Response> {
        try {
            const allCases = await MonoViModel.find();
            if (allCases.length === 0) {
                return res.status(404).json({ message: "No cases found in the database." });
            }
            return res.status(200).json(allCases);
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving cases from the database.", error });
        }
    }


    public async addNewCase(req: Request, res: Response): Promise<Response> {
        try {
            const { name, genre, age, lat, lng, country, city } = req.body;

            if (!name || !genre || !age || !lat || !lng || !country || !city) {
                return res.status(400).json({ message: "Missing required fields to create a case." });
            }

            const caseDetails = new MonoViModel({
                name,
                genre,
                age,
                lat,
                lng,
                country,
                city
            });

            const savedCase = await caseDetails.save();
            return res.status(201).json({ message: "New case created successfully.", savedCase });
        } catch (error) {
            return res.status(500).json({ message: "Error occurred while creating the case.", error });
        }
    }

    public async findCaseById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const foundCase = await MonoViModel.findById(id);
            if (!foundCase) {
                return res.status(404).json({ message: `Case with ID ${id} not found.` });
            }
            return res.status(200).json(foundCase);
        } catch (error) {
            return res.status(500).json({ message: `Error retrieving case with ID ${id}.`, error });
        }
    }


    public async updateCase(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, genre, age, lat, lng, country, city, isEmailSent } = req.body;

        try {
            const updatedCase = await MonoViModel.findByIdAndUpdate(
                id,
                { name, genre, age, lat, lng, country, city, isEmailSent },
                { new: true }
            );

            if (!updatedCase) {
                return res.status(404).json({ message: `Cannot update case with ID ${id} because it does not exist.` });
            }

            return res.status(200).json({ message: `Case with ID ${id} updated successfully.`, updatedCase });
        } catch (error) {
            return res.status(500).json({ message: `Error occurred while updating the case with ID ${id}.`, error });
        }
    }


    public async deleteCase(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const deletedCase = await MonoViModel.findByIdAndDelete(id);

            if (!deletedCase) {
                return res.status(404).json({ message: `Cannot delete case with ID ${id}, it does not exist.` });
            }

            return res.status(200).json({ message: `Case with ID ${id} deleted successfully.`, deletedCase });
        } catch (error) {
            return res.status(500).json({ message: `Error occurred while deleting the case with ID ${id}.`, error });
        }
    }


    public async getRecentCases(req: Request, res: Response): Promise<Response> {
        try {
            const today = new Date();
            const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

            const recentCases = await MonoViModel.find({
                creationDate: { $gte: lastWeek, $lte: today }
            });

            if (recentCases.length === 0) {
                return res.status(404).json({ message: "No cases found from the last week." });
            }

            return res.status(200).json(recentCases);
        } catch (error) {
            return res.status(500).json({ message: "Error occurred while retrieving recent cases.", error });
        }
    }
}
