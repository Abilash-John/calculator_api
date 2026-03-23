import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class AuthService {
    static async register(data: any) {
        const { first_name, last_name, email, password } = data;

        const userRepository = AppDataSource.getRepository(User);

        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            throw new Error("Email already registered!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User();
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.password = hashedPassword;

        await userRepository.save(user);

        return { message: "User registered successfully" };
    }

    static async login(data: any) {
        const { email, password } = data;

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ email });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error("Invalid credentials");
        }

        const secret = process.env.JWT_SECRET || "default_secret";
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

        return { 
            message: "Login successful",
            token, 
            user: { 
                id: user.id, 
                email: user.email, 
                first_name: user.first_name, 
                last_name: user.last_name 
            } 
        };
    }
}
