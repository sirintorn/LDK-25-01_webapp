"use client"


const LoginPage: React.FC = () => {

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault(); 
        window.location.assign('/dashboard');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className='flex justify-center items-center'>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-black">
                            E-mail
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black"
                        />
                    </div>
                    <button type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">Login</button>
                </form>
                <div className='text-center'>
                    <span className="text-gray-500 text-sm"></span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

