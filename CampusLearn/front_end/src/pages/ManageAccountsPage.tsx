import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserSearchCard from '../components/UserSearchCard';
import api from '../services/api';

// Inline SVG icons to avoid extra dependencies
const UserShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0c4.6 0 9.2 1.4 13.1 4L500.6 82.9c7.1 4.7 11.4 13.2 11.4 22.1V288c0 106-72.3 203.4-187.7 232.7c-17.1 4.2-34.5 4.2-51.6 0C83.7 491.4 11 394 11 288V105C11 96.1 15.3 87.6 22.4 82.9L242.9 4C246.8 1.4 251.4 0 256 0zm0 134c-25.9 0-47 21.1-47 47s21.1 47 47 47s47-21.1 47-47s-21.1-47-47-47zm-55.7 192.5c4.8 5.4 11.9 8.5 19.3 8.5h72.8c7.4 0 14.5-3.1 19.3-8.5c15.5-17.6 27.6-37.8 35.7-59.5C362.4 286.9 334.3 288 256 288s-106.4-1.1-137.7-6.9c8.1 21.7 20.2 41.9 35.7 59.5z"/></svg>
);
const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zm-208 0c0-69.5-56.5-126-126-126S82 138.5 82 208s56.5 126 126 126s126-56.5 126-126z"/></svg>
);
// UserIcon removed — unused in this page
// CapIcon removed (unused) — keep the UI consistent with other user lists using UserSearchCard
const BackArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H109.3L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
);

// Data structure for Users returned by backend
type AccountRole = 'Tutor' | 'Student' | 'Admin';

interface UserAccount {
    id: number;
    fullName: string;
    studentId?: string;
    role: AccountRole;
    approved?: boolean;
}

// Reuse the UserSearchCard styling used elsewhere (messages/topic creation)
// We still keep other icons for headings but list items use UserSearchCard for consistency.
// Fallback demo users shown when backend is unreachable
const fallbackUsers: UserAccount[] = [
    { id: -1, fullName: 'Demo Student', studentId: 'S0001', role: 'Student', approved: true },
    { id: -2, fullName: 'Demo Tutor', role: 'Tutor', approved: true },
];

const ManageAccountsPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<UserAccount[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserAccount[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);
    const [lastFetchStatus, setLastFetchStatus] = useState<number | null>(null);
    const [lastFetchCount, setLastFetchCount] = useState<number | null>(null);


    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
            try {
            // Try the admin endpoint first (preferred)
            const resp = await api.get<UserAccount[]>('/internal/admin/accounts');
            if (resp && Array.isArray(resp.data)) {
                const data = (resp.data || []).filter((u) => u.role !== 'Admin');
                setLastFetchStatus(resp.status);
                setUsers(data);
                setFilteredUsers(data);
                setLastFetchCount(data.length);
                setNotice(null);
                console.log('Fetched users via /internal/admin/accounts:', data);
                setIsLoading(false);
                return;
            }
        } catch (e: unknown) {
            // Safely extract status if axios-like error
            interface AxiosLikeError { response?: { status?: number } }
            const asAxios = (e && typeof e === 'object') ? (e as AxiosLikeError) : undefined;
            const statusInfo = asAxios && asAxios.response && asAxios.response.status ? asAxios.response.status : String(e);
            console.warn('/internal/admin/accounts failed, falling back to public user endpoints', statusInfo);

            // If admin endpoint fails (404/403/etc), attempt to fetch public lists used elsewhere
            try {
                // Minimal expected shapes returned by these endpoints
                type StudentDto = { id: number | string; firstName?: string; lastName?: string; email?: string; studentId?: string };
                type TutorDto = { id: number | string; firstName?: string; lastName?: string; email?: string; role?: string };

                const settled = await Promise.allSettled([
                    api.get<StudentDto[]>('/users/students'),
                    api.get<TutorDto[]>('/messages/tutors')
                ]);

                const studentsResp = settled[0] as PromiseFulfilledResult<{ data: StudentDto[] }> | PromiseRejectedResult;
                const tutorsResp = settled[1] as PromiseFulfilledResult<{ data: TutorDto[] }> | PromiseRejectedResult;

                const studentsData: StudentDto[] = studentsResp.status === 'fulfilled' ? (studentsResp.value.data || []) : [];
                const tutorsData: TutorDto[] = tutorsResp.status === 'fulfilled' ? (tutorsResp.value.data || []) : [];

                // Normalize to UserAccount shape used by this page
                const mappedStudents: UserAccount[] = studentsData.map((s: StudentDto) => ({
                    id: Number(s.id),
                    fullName: ((s.firstName || '') + ' ' + (s.lastName || '')).trim() || s.email || String(s.id),
                    studentId: (s.studentId || undefined),
                    role: 'Student',
                    approved: true
                }));

                const mappedTutors: UserAccount[] = tutorsData.map((t: TutorDto) => ({
                    id: Number(t.id),
                    fullName: ((t.firstName || '') + ' ' + (t.lastName || '')).trim() || t.email || String(t.id),
                    studentId: undefined,
                    role: (t.role && (t.role === 'Tutor' || t.role === 'TUTOR')) ? 'Tutor' : 'Student',
                    approved: true
                }));

                const combined = [...mappedStudents, ...mappedTutors].filter(u => u.role !== 'Admin');
                setUsers(combined);
                setFilteredUsers(combined);
                setLastFetchCount(combined.length);
                setLastFetchStatus(200);
                setNotice('Showing users from public endpoints (students+tutors) — admin endpoint was unavailable.');
                console.log('Fetched users via fallback endpoints:', { students: mappedStudents.length, tutors: mappedTutors.length });
                setIsLoading(false);
                return;
            } catch (fallbackErr) {
                console.error('Fallback user fetch failed', fallbackErr);
                // show demo fallback users so the page is usable while backend is down
                setUsers(fallbackUsers);
                setFilteredUsers(fallbackUsers);
                setLastFetchCount(fallbackUsers.length);
                const errMsg = e instanceof Error ? e.message : JSON.stringify(e);
                // set a non-blocking notice (don't treat as error so the list is visible)
                setNotice(`Backend unreachable — showing demo users. (${errMsg})`);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    useEffect(() => {
        const q = searchTerm.trim().toLowerCase();
        if (!q) {
            setFilteredUsers(users);
            return;
        }
        const results = users.filter(u =>
            u.fullName.toLowerCase().includes(q) || (u.studentId && u.studentId.includes(q))
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    // navigation handled directly by UserSearchCard 'to' prop

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden font-sans">
            <Header />

            <main className="max-w-4xl mx-auto py-8 px-4 relative z-10 space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate('/admin-panel')}
                        className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
                    >
                        <BackArrowIcon className="w-5 h-5" />
                        <span>Admin Panel</span>
                    </button>
                    <h1 className="text-4xl font-extrabold text-white">Account Management</h1>
                </div>

                <div className="relative w-full p-6 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 shadow-2xl overflow-hidden">
                    <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-4">
                            <UserShieldIcon className="w-12 h-12 text-white opacity-80" />
                            <h2 className="text-3xl font-extrabold text-white uppercase tracking-wider">Manage User Accounts</h2>
                        </div>
                        <div className="text-sm text-white/70">Status: {lastFetchStatus ?? 'n/a'} · Count: {lastFetchCount ?? '-'}</div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="relative">
                        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Name or Student Number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-4 pl-12 pr-6 text-lg rounded-xl bg-gray-800 border-2 border-purple-600 text-white placeholder-purple-300 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition shadow-xl"
                        />
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-2xl shadow-inner shadow-purple-900/50 min-h-[300px]">
                    <h3 className="text-xl font-bold text-purple-300 mb-4">Search Results</h3>

                    {isLoading ? (
                        <div className="text-center py-20 text-white/70">Loading users...</div>
                    ) : error ? (
                        <div className="text-center py-12 text-red-400">
                            <p className="text-sm mt-2">{String(error)}</p>
                            <div className="mt-4">
                                <button className="px-4 py-2 bg-purple-600 text-white rounded" onClick={() => fetchUsers()}>Retry</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {notice && (
                                <div className="mb-4 text-sm text-yellow-300">{notice}</div>
                            )}

                            {filteredUsers.length > 0 ? (
                                <div className="flex justify-center gap-8 flex-wrap">
                                    {filteredUsers.map((user) => (
                                        <UserSearchCard
                                            key={user.id}
                                            name={user.fullName + (user.studentId ? ` (${user.studentId})` : '')}
                                            role={user.role ?? 'Student'}
                                            to={`/admin/manage-user/${user.id}`}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-2xl font-light text-gray-400">Click on a person to Manage Account</p>
                                    <p className="text-md text-gray-500 mt-2">No users found.</p>
                                    {searchTerm && <p className="text-sm text-gray-500 mt-2">No users found matching "{searchTerm}"</p>}
                                </div>
                            )}
                        </>
                    )}
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default ManageAccountsPage;
