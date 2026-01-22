import type { JSX } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/authApi";
import { toast } from "sonner";

interface LoginReq {
    username: string;
    password: string;
}
type FormErrors = Partial<Record<keyof LoginReq, string>>;

const initialForm: LoginReq = {
    username: "",
    password: "",
};

export const LoginForm = (): JSX.Element => {

    const [formData, setFormData] = useState<LoginReq>(initialForm);
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = (data: LoginReq): FormErrors => {
        const errs: FormErrors = {};

        if (data.username.length < 3) {
            errs.username = "Enter a valid username";
        }
        if (data.password.length < 6) {
            errs.password = "Password must be at least 6 characters";
        }
        return errs;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errs = validate(formData);
        if (Object.keys(errs).length) {
            setErrors(errs);
            toast.error(errors.password || errors.username)
            return;
        }
        setErrors({});

        setLoading(true);

        try {
            const { data } = await login(formData);
            toast.success("Logged in!")
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            setFormData(initialForm);
            navigate("/");
        } catch (err: any) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                toast.error("Invalid username or password");
            } else {
                toast.error("Login failed. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="authForm"
            >
                <h1>Sign in</h1>
                <div>
                    <label className="authFormLabel">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="authFormInput"
                    />
                    {errors.username && (
                        <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                    )}
                </div>

                <div>
                    <label className="authFormLabel">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="authFormInput"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>
            </form>
        </div>
    )
}