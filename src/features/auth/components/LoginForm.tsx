import { AuthCard } from "./AuthCard";
import { PasswordInput } from "./PasswordInput";

export function LoginForm() {
    return (
        <AuthCard
            title="Welcome Back"
            description="Login"
        >
            <PasswordInput placeholder="Password" />
        </AuthCard>
    );
}