import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { CalculationService } from "../service/CalculationService";

export class CalculationController {
    static async getAllCalculations(req: AuthRequest, res: Response) {
        try {
            const calculations = await CalculationService.getAllCalculations();
            res.status(200).json(calculations);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getCalculationById(req: AuthRequest, res: Response) {
        try {
            const calculation = await CalculationService.getCalculationById(Number(req.params.id));
            res.status(200).json(calculation);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    static async calculate(req: AuthRequest, res: Response) {
        try {
            const userId = req.user.id;
            const { operand1, operator, operand2 } = req.body;

            if (operand1 === undefined || operator === undefined || operand2 === undefined) {
                return res.status(400).json({ error: "Missing required fields: operand1, operator, operand2" });
            }

            const result = await CalculationService.performCalculation(userId, Number(operand1), String(operator), Number(operand2));
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getHistory(req: AuthRequest, res: Response) {
        try {
            const userId = req.user.id;
            const history = await CalculationService.getHistory(userId);
            res.status(200).json(history);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getCalculationsByUserId(req: AuthRequest, res: Response) {
        try {
            const history = await CalculationService.getCalculationsByUserId(Number(req.params.userId));
            res.status(200).json(history);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteCalculationsByUserId(req: AuthRequest, res: Response) {
        try {
            const result = await CalculationService.deleteCalculationsByUserId(Number(req.params.userId));
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteAllCalculations(req: AuthRequest, res: Response) {
        try {
            const result = await CalculationService.deleteAllCalculations();
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
