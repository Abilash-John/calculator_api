import { AppDataSource } from "./config/data-source";
import { User } from "./entity/User";
import { Calculation } from "./entity/Calculation";
import * as dotenv from "dotenv";

dotenv.config();

AppDataSource.initialize().then(async () => {
    console.log("Seeding database...");

    const userRepository = AppDataSource.getRepository(User);
    const calculationRepository = AppDataSource.getRepository(Calculation);

    // Create a demo user
    const user = new User();
    user.first_name = "Admin";
    user.last_name = "User";
    user.email = "admin@example.com";
    user.password = "secret123"; // Plain text for demo; hash in real scenario
    user.is_active = true;

    // Check if user already exists
    let existingUser = await userRepository.findOneBy({ email: user.email });
    if (!existingUser) {
        existingUser = await userRepository.save(user);
        console.log("Demo user created.");
    } else {
        console.log("Demo user already exists.");
    }

    // Create a demo calculation
    const calc = new Calculation();
    calc.operand1 = 10;
    calc.operator = "+";
    calc.operand2 = 5;
    calc.result = 15;
    calc.user = existingUser;

    await calculationRepository.save(calc);
    console.log("Demo calculation created.");

    console.log("Database seeded successfully!");
    process.exit(0);
}).catch(error => {
    console.log(error);
    process.exit(1);
});
