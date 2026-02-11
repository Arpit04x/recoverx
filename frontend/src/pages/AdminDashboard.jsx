import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { BarChart3, Package, Search, AlertCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalLost: 0,
        totalFound: 0,
        pendingClaims: 0,
    });
    const [recentClaims, setRecentClaims] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const statsRes = await api.get('/admin/stats');
                setStats(statsRes.data);

                const claimsRes = await api.get('/admin/claims?status=pending&limit=5');
                setRecentClaims(claimsRes.data);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setStats({ totalLost: 120, totalFound: 85, pendingClaims: 12 });
                setRecentClaims([
                    { id: 101, itemName: 'Blue Backpack', claimantName: 'John Doe', date: '2023-10-25', status: 'Pending' },
                    { id: 102, itemName: 'iPhone 13', claimantName: 'Jane Smith', date: '2023-10-26', status: 'Pending' },
                    { id: 103, itemName: 'Water Bottle', claimantName: 'Alice Johnson', date: '2023-10-27', status: 'Pending' },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-black text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-black min-h-screen text-white pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400">Overview of system activity and pending actions.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-sm flex items-center">
                        <div className="p-3 rounded-full bg-red-500/10 text-red-500 mr-4 border border-red-500/20">
                            <Search className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">Total Lost Items</p>
                            <h3 className="text-2xl font-bold text-white">{stats.totalLost}</h3>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-sm flex items-center">
                        <div className="p-3 rounded-full bg-green-500/10 text-green-500 mr-4 border border-green-500/20">
                            <Package className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">Total Found Items</p>
                            <h3 className="text-2xl font-bold text-white">{stats.totalFound}</h3>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-sm flex items-center">
                        <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-500 mr-4 border border-yellow-500/20">
                            <AlertCircle className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">Pending Claims</p>
                            <h3 className="text-2xl font-bold text-white">{stats.pendingClaims}</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Claims List */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-sm overflow-hidden col-span-2">
                        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <h2 className="text-lg font-semibold text-white">Pending Claims</h2>
                            <Link to="/admin/claims" className="text-sm text-purple-400 hover:text-purple-300 font-medium">View All</Link>
                        </div>
                        <div className="divide-y divide-white/10">
                            {recentClaims.length > 0 ? (
                                recentClaims.map((claim) => (
                                    <div key={claim.id} className="p-6 hover:bg-white/5 transition-colors flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="mr-4">
                                                <div className="h-10 w-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold">
                                                    {claim.claimantName.charAt(0)}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-white">{claim.itemName}</h4>
                                                <p className="text-sm text-gray-400">Claimed by {claim.claimantName} • {claim.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                                <Clock className="w-3 h-3 mr-1" /> Pending
                                            </span>
                                            <Link to={`/admin/claim/${claim.id}`} className="inline-flex items-center px-3 py-1.5 border border-white/20 hover:border-white/40 text-xs font-medium rounded text-white bg-transparent hover:bg-white/10 transition-colors">
                                                Review
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-gray-500">No pending claims found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
