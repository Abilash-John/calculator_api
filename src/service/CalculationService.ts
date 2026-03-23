import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import { Calculation } from "../entity/Calculation";

export class CalculationService {
    static async getAllCalculations() {
        const repo = AppDataSource.getRepository(Calculation);
        return repo.find({
            relations: ["user"],
            order: { created_at: "DESC" }
        });
    }

    static async getCalculationById(id: number) {
        const repo = AppDataSource.getRepository(Calculation);
        const calculation = await repo.findOne({
            where: { id },
            relations: ["user"]
        });
        if (!calculation) throw new Error("Calculation not found");
        return calculation;
    }

    static async performCalculation(userId: number, operand1: number, operator: string, operand2: number) {
        const userRepository = AppDataSource.getRepository(User);
        const calculationRepository = AppDataSource.getRepository(Calculation);

        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error("User not found");
        }

        let result: number;
        switch (operator) {
            case '+':
                result = operand1 + operand2;
                break;
            case '-':
                result = operand1 - operand2;
                break;
            case '*':
                result = operand1 * operand2;
                break;
            case '/':
                if (operand2 === 0) throw new Error("Division by zero is not allowed");
                result = operand1 / operand2;
                break;
            default:
                throw new Error("Invalid operator");
        }

        const calc = new Calculation();
        calc.operand1 = operand1;
        calc.operator = operator;
        calc.operand2 = operand2;
        calc.result = result;
        calc.user = user;

        await calculationRepository.save(calc);

        return calc;
    }

    static async getHistory(userId: number) {
        const calculationRepository = AppDataSource.getRepository(Calculation);
        return calculationRepository.find({
            where: { user: { id: userId } },
            relations: ["user"],
            order: { created_at: "DESC" }
        });
    }

    static async getCalculationsByUserId(userId: number) {
        const repo = AppDataSource.getRepository(Calculation);
        return repo.find({
            where: { user: { id: userId } },
            relations: ["user"],
            order: { created_at: "DESC" }
        });
    }

    static async deleteCalculationsByUserId(userId: number) {
        const repo = AppDataSource.getRepository(Calculation);
        const calcs = await repo.find({ where: { user: { id: userId } }, select: ["id"] });
        if (calcs.length > 0) {
            await repo.delete(calcs.map(c => c.id));
        }
        return { message: `Deleted ${calcs.length} calculations successfully for user ID ${userId}.` };
    }

    static async deleteAllCalculations() {
        const repo = AppDataSource.getRepository(Calculation);
        await repo.clear(); // Truncates calculation table cleanly
        return { message: "All calculations deleted explicitly across all users." };
    }
}
