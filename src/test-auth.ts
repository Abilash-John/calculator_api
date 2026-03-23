import { AppDataSource } from "./config/data-source";
import { AuthService } from "./service/AuthService";
import * as dotenv from "dotenv";

dotenv.config();

async function testUserModule() {
    console.log("Initializing database connection...");
    await AppDataSource.initialize();
    
    // Generate a random email for uniqueness across multiple runs
    const mockEmail = `testuser_${Date.now()}@example.com`;
    const mockPassword = "my_secure_password";

    console.log("\n[1] Testing Registration...");
    try {
        const registerResponse = await AuthService.register({
            first_name: "John",
            last_name: "Doe",
            email: mockEmail,
            password: mockPassword
        });
        console.log("✅ Registration Successful!");
        console.log(registerResponse);
    } catch (err: any) {
        console.error("❌ Registration Failed:", err.message);
    }

    console.log("\n[2] Testing Login with correct credentials...");
    try {
        const loginResponse = await AuthService.login({
            email: mockEmail,
            password: mockPassword
        });
        console.log("✅ Login Successful!");
        console.log({
            message: loginResponse.message,
            token: typeof loginResponse.token === 'string' ? `${loginResponse.token.substring(0, 25)}... [TRUNCATED]` : null,
            user: loginResponse.user
        });
    } catch (err: any) {
        console.error("❌ Login Failed:", err.message);
    }

    console.log("\n[3] Testing Login with INVALID credentials...");
    try {
        await AuthService.login({
            email: mockEmail,
            password: "wrong_password_here"
        });
        console.error("❌ Should have failed but succeeded!");
    } catch (err: any) {
        console.log("✅ Invalid Login correctly rejected!");
        console.log("Error Caught:", err.message);
    }

    console.log("\n[4] Testing Duplicate Registration...");
    try {
        await AuthService.register({
            first_name: "John",
            last_name: "Doe",
            email: mockEmail,
            password: mockPassword
        });
        console.error("❌ Should have failed but succeeded!");
    } catch (err: any) {
        console.log("✅ Duplicate logic correctly rejected!");
        console.log("Error Caught:", err.message);
    }

    // Cleanup and exit 
    await AppDataSource.destroy();
    console.log("\nDatabase connection closed. ✨ Test complete!");
}

testUserModule().catch(console.error);
