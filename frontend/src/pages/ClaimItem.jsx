import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CheckCircle, AlertCircle } from 'lucide-react';

const ClaimItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await api.get(`/items/${id}`);
                setItem(response.data);
            } catch (err) {
                console.error(err);
                // Fallback mock data
                setItem({
                    id: id,
                    name: 'Blue Backpack',
                    description: 'Found near the library entrance.',
                    location: 'Library',
                    date: '2023-10-24',
                    questions: [
                        { id: 1, question: 'What brand is the backpack?' },
                        { id: 2, question: 'Is there anything specific inside?' }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await api.post(`/items/${id}/claim`, { answers });
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError('Failed to submit claim. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading item details...</div>;

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full bg-white shadow rounded-lg p-10 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Claim Submitted!</h2>
                    <p className="text-gray-600 mb-8">
                        The admin will review your answers. You strictly will take 24-48 hours process.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Claim Item</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Verify ownership of this item.</p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Item Name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{item.name || 'Unknown Item'}</dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Location Found</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{item.location}</dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Description</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {item.description}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Questions</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {item.questions && item.questions.map((q) => (
                                <div key={q.id}>
                                    <label htmlFor={`question-${q.id}`} className="block text-sm font-medium text-gray-700">
                                        {q.question}
                                    </label>
                                    <input
                                        type="text"
                                        id={`question-${q.id}`}
                                        required
                                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
                                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                        placeholder="Your answer..."
                                    />
                                </div>
                            ))}
                            {(!item.questions || item.questions.length === 0) && (
                                <div>
                                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                                        Please describe the item in detail to prove ownership.
                                    </label>
                                    <textarea
                                        id="details"
                                        rows={4}
                                        required
                                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
                                        onChange={(e) => handleAnswerChange('general_details', e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="mt-4 rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertCircle className="h-5 w-5 text-red-400" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {submitting ? 'Submitting Claim...' : 'Submit Claim'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ClaimItem;
