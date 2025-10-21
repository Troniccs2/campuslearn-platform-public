// src/pages/AccountManagementViewPage.tsx

import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';
import { FaArrowLeft } from 'react-icons/fa';

// Type for the user data displayed on the page
interface UserAccountDetails {
    fullName: string;
    role?: string;
}

// Type returned by the backend API for users
type UserApi = {
  id: number;
    fullName?: string;
  full_name?: string;
  studentId?: string;
  student_id?: string;
  certification?: string;
  approved?: boolean;
  role?: string;
};

// Utility component for the rounded profile detail rows
interface DetailRowProps {
    label: string;
    value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
    <div className="flex flex-col mb-4 p-3 bg-white/10 rounded-lg border border-purple-500/30">
        <span className="text-xs font-light text-gray-300 uppercase tracking-wider">{label}</span>
        <span className="text-base font-medium text-white">{value}</span>
    </div>
);

// Utility component for the settings dropdown/toggle
// Notification settings removed — not used in this project


const AccountManagementViewPage: React.FC = () => {
    const params = useParams<{ accountId?: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    // optional label passed from ManageAccountsPage via navigate state
    type NavigationState = { label?: string } | undefined;
    const navState = location.state as NavigationState;
    const navLabel = navState?.label;
    const [accountDetails, setAccountDetails] = React.useState<UserAccountDetails | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [isActionLoading, setIsActionLoading] = React.useState<boolean>(false);

    // Helper to safely extract an error message from unknown error shapes
    const extractErrorMessage = (e: unknown): string => {
        if (!e) return '';
        if (typeof e === 'string') return e;
        if (e instanceof Error) return e.message;
        try { return JSON.stringify(e); } catch { return String(e); }
    };

    // fetchDetails is exposed so Retry button can call it
    const fetchDetails = React.useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setAccountDetails(null);
        if (!params.accountId) {
            setError('Missing accountId in URL');
            setIsLoading(false);
            return;
        }
        try {
            const res = await api.get(`/internal/admin/accounts/${params.accountId}`);
            const found: UserApi = res.data;
            setAccountDetails({
                fullName: (found.fullName || found.full_name || '') as string,
                role: (found.role || '') as string,
            });
        } catch (err: unknown) {
            console.error('Failed to load account details', err);
            // Try to surface helpful info
            interface AxiosLikeError { response?: { status?: number; data?: unknown }; message?: string }
            const asAxios = (err && typeof err === 'object') ? (err as AxiosLikeError) : undefined;
            const status = asAxios?.response?.status;
            const data = asAxios?.response?.data;
            const message = asAxios?.message ?? String(err);
            // If server returned 404 and it looks like the request was routed to static resource handling,
            // try two fallbacks: 1) retry with trailing slash, 2) fetch the list and find the user locally.
                if (status === 404) {
                try {
                    console.warn('Primary single-user endpoint returned 404, retrying with trailing slash');
                    const alt = await api.get(`/internal/admin/accounts/${params.accountId}/`);
                    const foundAlt: UserApi = alt.data;
                    setAccountDetails({
                        fullName: (foundAlt.fullName || foundAlt.full_name || '') as string,
                        role: (foundAlt.role || '') as string,
                    });
                    setIsLoading(false);
                    return;
                    } catch (altErr) {
                    console.info('Retry with trailing slash also failed, attempting alternate by-id endpoint then list fallback', altErr);
                    // Try alternate explicit endpoint we added server-side
                    try {
                        const byId = await api.get(`/internal/admin/accounts/by-id/${params.accountId}`);
                        const foundById: UserApi = byId.data;
                        setAccountDetails({
                            fullName: (foundById.fullName || foundById.full_name || '') as string,
                            role: (foundById.role || '') as string,
                        });
                        setIsLoading(false);
                        return;
                    } catch (byIdErr) {
                        console.info('Alternate by-id endpoint failed, attempting list fallback', byIdErr);
                    }

                    try {
                        const listRes = await api.get(`/internal/admin/accounts`);
                        const list: UserApi[] = listRes.data || [];
                        const foundFromList = list.find(u => String(u.id) === String(params.accountId));
                        if (foundFromList) {
                            setAccountDetails({
                                fullName: (foundFromList.fullName || foundFromList.full_name || '') as string,
                                role: (foundFromList.role || '') as string,
                            });
                            setIsLoading(false);
                            return;
                        }
                    } catch (listErr) {
                        console.error('List fallback also failed', listErr);
                    }
                }
            }

            setError(`Failed to load user (${status ?? 'network error'}): ${data ? JSON.stringify(data) : message}`);
        } finally {
            setIsLoading(false);
        }
    }, [params.accountId]);

    React.useEffect(() => { fetchDetails(); }, [fetchDetails]);

    // Notification toggles removed

    const handleAccept = () => {
        if (!accountDetails) return;
        // API call to approve user
        if (!params.accountId) return;
        setIsActionLoading(true);
        api.post(`/internal/admin/accounts/${params.accountId}/approve`)
            .then(() => {
                // reflect approved state locally if returned; navigate back
                navigate('/dashboard/admin');
            })
            .catch(err => {
                console.error('Approve failed', err);
                setError('Approve failed: ' + extractErrorMessage(err));
            })
            .finally(() => setIsActionLoading(false));
    };

    const handleDelete = () => {
        if (!accountDetails) return;
        if (!params.accountId) return;
        if (window.confirm(`Are you sure you want to DELETE user: ${accountDetails.fullName}?`)) {
            setIsActionLoading(true);
            api.delete(`/internal/admin/accounts/${params.accountId}`)
                .then(() => navigate('/dashboard/admin'))
                .catch(err => {
                    console.error('Delete failed', err);
                    setError('Delete failed: ' + extractErrorMessage(err));
                })
                .finally(() => setIsActionLoading(false));
        }
    };

    if (isLoading || !accountDetails) {
        return (
            <div className="p-6"> 
                <h2 className="text-2xl font-semibold mb-4">Account Management</h2>
                {isLoading ? (
                    <div className="bg-white rounded shadow p-6">Loading user details...</div>
                ) : error ? (
                    <div className="bg-white rounded shadow p-6">
                        <p className="text-red-600 font-semibold">{error}</p>
                        <div className="mt-4">
                            <button onClick={() => fetchDetails()} className="px-4 py-2 bg-purple-600 text-white rounded">Retry</button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded shadow p-6">Loading user details...</div>
                )}
            </div>
        );
    }

    // derive display label: prefer navigation state, then studentId if present, else fullName
    const displayLabel = navLabel ?? accountDetails.fullName;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
                <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            </div>

            <Header />

            <main className="max-w-xl mx-auto py-4 px-4 space-y-6 relative z-10">
                
                {/* Top Navigation Panel - Mimicking the image structure */}
                <div className="flex justify-between items-center bg-[#512c85] p-3 rounded-t-lg shadow-xl">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 mr-3"></div>
                        <h1 className="text-xl font-semibold text-white">Profile</h1>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-2xl p-6 space-y-6 border border-purple-700/50">
                    
                    {/* Back Button / Manage Link */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium text-sm p-2 rounded-lg bg-purple-900/50"
                    >
                        <FaArrowLeft className="w-3 h-3" />
                        <span>Manage</span>
                    </button>

                    {/* Tutor/Student Details Banner */}
                    <div className="flex items-center justify-center p-4 rounded-xl bg-gradient-to-r from-purple-700 to-pink-600 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20  z-0"></div>
                            <div className="flex flex-col items-center z-10">
                                 <div className="flex items-center gap-3">
                                     <span className="text-4xl">🎓</span>
                                     <span className="text-4xl">👤</span>
                                 </div>
                                <h2 className="text-2xl font-bold uppercase tracking-widest mt-2">{displayLabel}</h2>
                                <p className="text-sm font-light opacity-80">User Profiles & Information</p>
                            </div>
                    </div>

                    {/* Profile Details Section */}
                    <div className="p-4 rounded-xl bg-purple-900/50 space-y-4 shadow-inner">
                        <h3 className="text-2xl font-bold text-white text-center mb-6">Profile Details</h3>
                        
                        {/* split fullName into first/last when possible */}
                        {(() => {
                            const parts = (accountDetails.fullName || '').trim().split(/\s+/);
                            const firstName = parts.length > 0 ? parts[0] : '';
                            const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';
                            return (
                                <>
                                    <DetailRow label="First Name:" value={firstName} />
                                    <DetailRow label="Last Name:" value={lastName} />
                                </>
                            );
                        })()}
                        <DetailRow label="Role:" value={(accountDetails.role || 'Student')} />
                        
                        {/* Settings section removed (notifications not used) */}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-center gap-6 pt-4">
                        <button
                            onClick={handleAccept}
                            disabled={isActionLoading}
                            className={`px-8 py-3 ${isActionLoading ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold rounded-lg transition-colors shadow-lg disabled:opacity-60`}
                        >
                            {isActionLoading ? 'Processing...' : 'Accept'}
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isActionLoading}
                            className={`px-8 py-3 ${isActionLoading ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'} text-white font-semibold rounded-lg transition-colors shadow-lg disabled:opacity-60`}
                        >
                            {isActionLoading ? 'Processing...' : 'Delete'}
                        </button>
                    </div>

                </div>
                
            </main>
            
            <Footer />
        </div>
    );
};

export default AccountManagementViewPage;