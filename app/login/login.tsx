import { useState } from "react";
import { useNavigate } from "react-router";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/main"); // navigate to home page
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-2x1 shadow-md">
                <h2 className="text-2x1 font-semibold text-center mb-6 text-gray-700"> Login </h2>
                {error && (
                    <p className="text-red-600 bg-red-100 p-2 rounded mb-4 text-sm">
                        {error}
                    </p>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700"> Email </label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="you@example.com"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700"> Password </label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className=" text-gray-700mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"/>
                    </div>

                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-700"> 
                    Don't have an account? 
                    <a href="/register" className="text-blue-600 hover:underline"> Sign up </a>
                </p>
            </div>
        </div>
    ) 
}