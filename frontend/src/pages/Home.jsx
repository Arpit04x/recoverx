import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, PackagePlus, Eye, ArrowRight, CheckCircle, Shield, Globe } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <div className="bg-background text-white min-h-screen overflow-x-hidden selection:bg-purple-500 selection:text-white">

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                {/* Abstract Grid Background */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300 backdrop-blur-xl"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
                        Campus Wide System Live v1.0
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500"
                    >
                        Real-time item <br className="hidden md:block" /> intelligence.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-4 max-w-2xl text-lg md:text-xl text-gray-400 mb-10 leading-relaxed"
                    >
                        Unify lost and found reports across campus. Let our intelligent matching surface the items that matter. Instantly locate, verify, and recover your belongings.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                    >
                        <Link to="/report-lost"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            I Lost Something
                        </Link>
                        <Link to="/report-found"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-transparent px-8 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            I Found Something
                        </Link>
                    </motion.div>

                    {/* Graphical Abstract Element */}
                    <div className="mt-20 relative w-full max-w-5xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl -z-10"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                            {/* Card 1 */}
                            <motion.div style={{ y: y1 }} className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-white/20 transition-all group">
                                <div className="h-10 w-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                                    <Search className="text-white w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
                                <p className="text-gray-400 text-sm">
                                    Automatically matches descriptions with found items using keywords and categories.
                                </p>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div className="mt-12 md:mt-0 p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-white/20 transition-all group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="h-10 w-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors relative z-10">
                                    <Shield className="text-white w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 relative z-10">Secure Verification</h3>
                                <p className="text-gray-400 text-sm relative z-10">
                                    Claim items securely by answering verification questions only the owner would know.
                                </p>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div style={{ y: y2 }} className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-white/20 transition-all group">
                                <div className="h-10 w-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                                    <Globe className="text-white w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Campus Wide</h3>
                                <p className="text-gray-400 text-sm">
                                    Centralized database accessible from anywhere on campus, anytime.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 border-t border-white/5 bg-black/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-16 text-center">
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">24h</div>
                            <div className="text-sm text-gray-500 uppercase tracking-widest">Turnaround</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">100%</div>
                            <div className="text-sm text-gray-500 uppercase tracking-widest">Secure</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">500+</div>
                            <div className="text-sm text-gray-500 uppercase tracking-widest">Items Recovered</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-black py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-400 text-sm">
                        © 2024 RecoverX.
                    </div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a>
                        <Link to="/admin/login" className="text-gray-500 hover:text-white transition-colors">Admin</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
