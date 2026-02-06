import type { JSX } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "@/api/authApi";
import Loading from "../ui/Loading";

interface RegisterReq {
    email: string;
    username: string;
    password: string;
}
type FormErrors = Partial<Record<keyof RegisterReq, string>>;

const initialForm: RegisterReq = {
    email: "",
    username: "",
    password: "",
};

export const RegisterForm = (): JSX.Element => {

    const [formData, setFormData] = useState<RegisterReq>(initialForm);
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

    const validate = (data: RegisterReq): FormErrors => {
        const errs: FormErrors = {};

        if (!data.email.includes("@")) {
            errs.email = "Enter proper email"
        }

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
            return;
        }
        setErrors({});
        setLoading(true);

        try {
            const { data } = await register(formData);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            setFormData(initialForm);
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading message="Loggin you in..."/>

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="authForm"
            >
                <h1> Register </h1>
                <div>
                    <div>
                        <label className="authFormLabel">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="authFormInput"
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

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