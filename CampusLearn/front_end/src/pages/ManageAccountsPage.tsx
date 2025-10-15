import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Link is no longer needed since we use navigate
import Header from '../components/Header';
import Footer from '../components/Footer';

// Removed react-icons imports, using inline SVGs instead for compilation stability.

// --- Inline SVG Icons ---
const UserShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0c4.6 0 9.2 1.4 13.1 4L500.6 82.9c7.1 4.7 11.4 13.2 11.4 22.1V288c0 106-72.3 203.4-187.7 232.7c-17.1 4.2-34.5 4.2-51.6 0C83.7 491.4 11 394 11 288V105C11 96.1 15.3 87.6 22.4 82.9L242.9 4C246.8 1.4 251.4 0 256 0zm0 134c-25.9 0-47 21.1-47 47s21.1 47 47 47s47-21.1 47-47s-21.1-47-47-47zm-55.7 192.5c4.8 5.4 11.9 8.5 19.3 8.5h72.8c7.4 0 14.5-3.1 19.3-8.5c15.5-17.6 27.6-37.8 35.7-59.5C362.4 286.9 334.3 288 256 288s-106.4-1.1-137.7-6.9c8.1 21.7 20.2 41.9 35.7 59.5z"/></svg>
);
const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zm-208 0c0-69.5-56.5-126-126-126S82 138.5 82 208s56.5 126 126 126s126-56.5 126-126z"/></svg>
);
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 17.3c-23 5.4-47.5 9.1-72.3 11.5c-9.1 1-17.4-4.8-19.3-13.8c-1.8-8.9 3.9-17.6 13.1-19.1c21.8-3.4 43.8-6.1 65.4-8c10.5-1 20.3-6.2 25.5-15.1c5.2-8.9 5.2-19.4 0-28.3c-20.1-34.4-30.8-71.5-30.8-109.8C156 128.9 188.7 96 228.3 96c40.3 0 73 32.9 73 73c0 38.3-10.7 75.4-30.8 109.8c-5.2 8.9-5.2 19.4 0 28.3c5.2 8.9 15 14.1 25.5 15.1c21.6 1.9 43.6 4.6 65.4 8c9.2 1.5 15 10.2 13.1 19.1c-1.9 9-10.2 14.8-19.3 13.8c-24.8-2.4-49.3-6.1-72.3-11.5c-9.5-2.2-19.4-2.2-29.2 0c-43.1 9.9-88.6 9.9-131.7 0c-9.8-2.2-19.7-2.2-29.2 0z"/></svg>
);
const CapIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M320 0a160 160 0 1 1 0 320a160 160 0 1 1 0-320zm304 352a16 16 0 0 0-16 16v96H32v-96a16 16 0 0 0-16-16A16 16 0 0 0 0 368v112c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16V368a16 16 0 0 0-16-16zm-380.8-21.2l-37.5-68.9c-2-3.8-6.1-6-10.4-6H160c-8.8 0-16 7.2-16 16v128c0 8.8 7.2 16 16 16h240c8.8 0 16-7.2 16-16V299.7c0-2-0.8-4-2.4-5.4l-44-38.6c-4.4-3.9-6.8-9.4-6.8-15.1V224h128v160h-32c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32V256H352v-21.3c0-4.6 1.8-9 4.8-12.1l40-40.4c1.8-1.8 2.8-4.2 2.8-6.8V160h-96c-8.8 0-16 7.2-16 16v16zM544 192a64 64 0 1 1 0-128a64 64 0 1 1 0 128zM320 288a128 128 0 1 0 0-256a128 128 0 1 0 0 256z"/></svg>
);
const BackArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H109.3L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
);


// --- MOCK Data Structure for Users ---
interface UserAccount {
    id: string;
    name: string;
    studentNumber?: string; // Optional for Tutors
    role: 'Tutor' | 'Student';
}

const MOCK_USERS: UserAccount[] = [
    { id: 'usr1', name: 'Mrs. Eva', role: 'Tutor' },
    { id: 'usr2', name: 'Mr. Raymond', role: 'Tutor' },
    { id: 'usr3', name: '655243 (Lindiwe)', role: 'Student', studentNumber: '655243' },
    { id: 'usr4', name: 'Simba M.', role: 'Student', studentNumber: '789012' },
    { id: 'usr5', name: 'Hanno V.', role: 'Tutor' },
    { id: 'usr6', name: 'Reece K.', role: 'Student', studentNumber: '123456' },
];

// --- Sub-Components ---

// Component for a single user item in the list
const UserAvatarCard: React.FC<{ user: UserAccount; onClick: (id: string) => void }> = ({ user, onClick }) => {
    return (
        <div
            className="flex flex-col items-center cursor-pointer p-2 rounded-xl transition-transform duration-200 hover:scale-105 hover:shadow-purple-500/50 shadow-lg"
            onClick={() => onClick(user.id)}
        >
            {/* Campus Learn Logo Avatar (using CapIcon) */}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1 mb-1 border-2 border-purple-400">
                <CapIcon className="text-purple-600 w-full h-full p-2" />
            </div>
            <p className="text-white text-sm font-semibold text-center">{user.name}</p>
            <p className={`text-xs ${user.role === 'Tutor' ? 'text-teal-300' : 'text-purple-300'}`}>({user.role})</p>
        </div>
    );
};


const ManageAccountsPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<UserAccount[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserAccount[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    // Simulated data fetching (replace with Firestore real-time listener)
    useEffect(() => {
        // Simulating onSnapshot fetch
        setUsers(MOCK_USERS);
    }, []);

    // Filter users based on search term
    useEffect(() => {
        const lowerCaseSearch = searchTerm.toLowerCase();
        const results = users.filter(user =>
            user.name.toLowerCase().includes(lowerCaseSearch) ||
            user.studentNumber?.includes(lowerCaseSearch)
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    // Handle selecting a user
    const handleUserSelect = (userId: string) => {
        // Navigate to the user detail management page
        console.log(`User selected for management: ${userId}`);
        setSelectedUserId(userId); 
        navigate(`/admin/manage-user/${userId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden font-sans">
            <Header />

            <main className="max-w-4xl mx-auto py-8 px-4 relative z-10 space-y-6">
                
                {/* Back Button and Title */}
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

                {/* Account Management Banner */}
                <div className="relative w-full p-6 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 shadow-2xl overflow-hidden">
                    <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-4">
                            <UserShieldIcon className="w-12 h-12 text-white opacity-80" />
                            <h2 className="text-3xl font-extrabold text-white uppercase tracking-wider">
                                Manage User Accounts
                            </h2>
                        </div>
                    </div>
                    {/* Visual Effect: Circuitry Overlay */}
                    <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <pattern id="circuit-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 0 5 L 10 5 M 5 0 L 5 10" stroke="#fff" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
                        </svg>
                    </div>
                </div>

                {/* Search Input Section */}
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

                {/* User List and Action Prompt */}
                <div className="bg-gray-800 p-6 rounded-2xl shadow-inner shadow-purple-900/50 min-h-[300px]">
                    <h3 className="text-xl font-bold text-purple-300 mb-4">Search Results</h3>

                    {filteredUsers.length > 0 ? (
                        <div className="flex flex-wrap gap-6 justify-start">
                            {filteredUsers.map(user => (
                                <UserAvatarCard key={user.id} user={user} onClick={handleUserSelect} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <UserIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-2xl font-light text-gray-400">
                                Click on a person to Manage Account
                            </p>
                            {searchTerm && (
                                <p className="text-md text-gray-500 mt-2">No users found matching "{searchTerm}"</p>
                            )}
                        </div>
                    )}
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default ManageAccountsPage;
