import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";

export class UserService {
    static async getAllUsers() {
        const repo = AppDataSource.getRepository(User);
        // Exclude the password explicitly
        return repo.find({ select: ["id", "first_name", "last_name", "email", "is_active"] });
    }

    static async getUserIdByEmail(email: string) {
        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOne({ 
            where: { email },
            select: ["id", "email"]
        });
        if (!user) throw new Error("User not found");
        return { id: user.id, email: user.email };
    }

    static async getUserById(id: number) {
        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOne({ 
            where: { id },
            select: ["id", "first_name", "last_name", "email", "is_active"]
        });
        if (!user) throw new Error("User not found");
        return user;
    }

    static async updateUser(id: number, data: any) {
        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOneBy({ id });
        if (!user) throw new Error("User not found");

        if (data.first_name !== undefined) user.first_name = data.first_name;
        if (data.last_name !== undefined) user.last_name = data.last_name;
        if (data.is_active !== undefined) user.is_active = Boolean(data.is_active);
        if (data.password) {
            user.password = await bcrypt.hash(data.password, 10);
        }

        // Specifically ignoring any data.email fields exactly as requested!
        await repo.save(user);
        
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    static async deleteUser(id: number) {
        const repo = AppDataSource.getRepository(User);
        const result = await repo.delete(id);
        if (result.affected === 0) throw new Error("User not found");
        return { message: "User deleted successfully. All calculations under this user were also automatically cascaded to deletion!" };
    }
}
