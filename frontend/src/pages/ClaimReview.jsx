import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CheckCircle, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const ClaimReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [claim, setClaim] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClaim = async () => {
            try {
                const response = await api.get(`/admin/claims/${id}`);
                setClaim(response.data);
            } catch (err) {
                console.error(err);
                // Mock data
                setClaim({
                    id: id,
                    status: 'Pending',
                    item: {
                        id: 201,
                        name: 'Black Wallet',
                        category: 'IDs/Wallets',
                        location: 'Library',
                        foundDate: '2023-10-20',
                        description: 'Leather wallet found on table 4.',
                        image: null
                    },
                    claimant: {
                        id: 501,
                        name: 'John Student',
                        email: 'john@student.edu'
                    },
                    answers: [
                        { question: 'What is the color?', answer: 'Black leather' },
                        { question: 'Any specific ID inside?', answer: 'Yes, my student ID ending in 456' }
                    ],
                    score: 95
                });
            } finally {
                setLoading(false);
            }
        };
        fetchClaim();
    }, [id]);

    const handleAction = async (status) => {
        if (!window.confirm(`Are you sure you want to ${status} this claim?`)) return;

        setActionLoading(true);
        setError('');

        try {
            await api.patch(`/admin/claims/${id}`, { status });
            navigate('/admin/dashboard');
        } catch (err) {
            console.error(err);
            setError('Failed to update claim status.');
            setActionLoading(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading claim details...</div>;
    if (!claim) return <div className="p-10 text-center">Claim not found.</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="mb-6 flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                </button>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Claim Review #{claim.id}</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Review the claim details below.</p>
                        </div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                claim.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                            }`}>
                            {claim.status}
                        </span>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            {/* Item Details */}
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
                                <dt className="text-sm font-medium text-gray-500">Item Details</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <p className="font-semibold">{claim.item.name || claim.item.category}</p>
                                    <p>Found at: {claim.item.location}</p>
                                    <p>Date: {claim.item.foundDate}</p>
                                    <p className="italic text-gray-500">{claim.item.description}</p>
                                </dd>
                            </div>

                            {/* Claimant Details */}
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Claimant</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <p>{claim.claimant.name}</p>
                                    <p className="text-gray-500">{claim.claimant.email}</p>
                                </dd>
                            </div>

                            {/* Verification Answers */}
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Verification Answers</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <ul className="list-disc pl-5 space-y-2">
                                        {claim.answers && claim.answers.map((ans, idx) => (
                                            <li key={idx}>
                                                <span className="font-medium text-gray-700">{ans.question}:</span>
                                                <span className="ml-2 text-gray-900">{ans.answer}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">System Match Score</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <div className="flex items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-xs mr-2">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${claim.score}%` }}></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{claim.score}%</span>
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => handleAction('Rejected')}
                        disabled={actionLoading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject Claim
                    </button>
                    <button
                        onClick={() => handleAction('Approved')}
                        disabled={actionLoading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve & Mark Returned
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClaimReview;
