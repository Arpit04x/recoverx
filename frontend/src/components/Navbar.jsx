import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Home, Search, PackagePlus, ShieldCheck, BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold text-lg">LF</span>
                        </div>
                        <Link to="/" className="text-xl font-bold text-white tracking-tight hover:text-gray-300 transition-colors">
                            Lost & Found
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
                            Overview
                        </Link>
                        <Link to="/report-lost" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
                            I Lost Something
                        </Link>
                        <Link to="/report-found" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
                            I Found Something
                        </Link>

                        <div className="h-4 w-px bg-white/20 mx-2"></div>

                        {token ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/admin/dashboard" className="text-sm font-medium text-white hover:text-gray-300">
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <Link to="/admin/login" className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-all">
                                Admin Access
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-background border-t border-white/10 absolute w-full">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/5">Home</Link>
                        <Link to="/report-lost" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Report Lost</Link>
                        <Link to="/report-found" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Report Found</Link>
                        {token ? (
                            <>
                                <Link to="/admin/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Dashboard</Link>
                                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-white/5">Log out</button>
                            </>
                        ) : (
                            <Link to="/admin/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Admin Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
