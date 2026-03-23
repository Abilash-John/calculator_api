import { Request, Response } from "express";
import { UserService } from "../service/UserService";

export class UserController {
    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getUserIdByEmail(req: Request, res: Response) {
        try {
            const data = await UserService.getUserIdByEmail(String(req.params.email));
            res.json(data);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    static async getUserById(req: Request, res: Response) {
        try {
            const user = await UserService.getUserById(Number(req.params.id));
            res.json(user);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const user = await UserService.updateUser(Number(req.params.id), req.body);
            res.json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const result = await UserService.deleteUser(Number(req.params.id));
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
