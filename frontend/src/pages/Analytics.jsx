import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { BarChart3, MapPin, Tag } from 'lucide-react';

const Analytics = () => {
    const [data, setData] = useState({
        categories: [],
        locations: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await api.get('/analytics');
                setData(response.data);
            } catch (err) {
                console.error(err);
                setData({
                    categories: [
                        { name: 'Electronics', count: 45 },
                        { name: 'IDs/Wallets', count: 32 },
                        { name: 'Keys', count: 28 },
                        { name: 'Clothing', count: 15 },
                        { name: 'Books', count: 10 }
                    ],
                    locations: [
                        { name: 'Library', count: 50 },
                        { name: 'Cafeteria', count: 42 },
                        { name: 'Gym', count: 20 },
                        { name: 'Classroom Block A', count: 18 },
                        { name: 'Main Hall', count: 12 }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const getMax = (arr) => Math.max(...arr.map(i => i.count));

    if (loading) return <div className="p-10 text-center text-white">Loading analytics...</div>;

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white flex justify-center items-center">
                        <BarChart3 className="mr-3 h-8 w-8 text-purple-500" />
                        System Analytics
                    </h1>
                    <p className="mt-2 text-gray-400">Insights into lost and found trends on campus.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Categories Chart */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:border-white/20 transition-all">
                        <div className="flex items-center mb-6">
                            <Tag className="h-5 w-5 text-purple-400 mr-2" />
                            <h2 className="text-lg font-bold text-white">Most Lost Categories</h2>
                        </div>
                        <div className="space-y-4">
                            {data.categories.map((cat, idx) => (
                                <div key={idx} className="relative">
                                    <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
                                        <span>{cat.name}</span>
                                        <span>{cat.count} items</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className="bg-purple-500 h-2.5 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                            style={{ width: `${(cat.count / getMax(data.categories)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Locations Chart */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:border-white/20 transition-all">
                        <div className="flex items-center mb-6">
                            <MapPin className="h-5 w-5 text-red-400 mr-2" />
                            <h2 className="text-lg font-bold text-white">Common Lost Locations</h2>
                        </div>
                        <div className="space-y-4">
                            {data.locations.map((loc, idx) => (
                                <div key={idx} className="relative">
                                    <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
                                        <span>{loc.name}</span>
                                        <span>{loc.count} reports</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className="bg-red-500 h-2.5 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                            style={{ width: `${(loc.count / getMax(data.locations)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
