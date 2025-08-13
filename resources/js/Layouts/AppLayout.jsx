import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props || {};
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className="block h-9 w-auto fill-current text-gray-800 font-bold text-xl">
                                    Medium Clone
                                </Link>
                            </div>
                        </div>
                        <div className="flex">
                            {auth?.user && (
                                <Link href="/post/create" className="flex items-center mr-4">
                                    <button className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                        Create Post
                                    </button>
                                </Link>
                            )}
                            {auth?.user ? (
                                <div className="hidden sm:flex sm:items-center sm:ms-6 relative">
                                    <button 
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        <div>{auth.user.name}</div>
                                        <div className="ms-1">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Profile
                                            </Link>
                                            <Link href="/my-posts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                My Posts
                                            </Link>
                                            <Link href="/logout" method="post" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Log Out
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link href="/register" className="hidden sm:flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                                        Create an Account
                                    </Link>
                                    <Link href="/login" className="hidden sm:flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}