// src/pages/SearchComposePage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserSearchCard from '../components/UserSearchCard';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

// simple debounce helper
const useDebounced = (value: string, delay = 400) => {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};

// Reusing FaArrowLeft from previous components
const FaArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);


const SearchComposePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  type UserResult = { id: string | number; name?: string; firstName?: string; lastName?: string; role?: string; email?: string };
  const mockUsers: UserResult[] = [
    { id: 'eva', name: 'Mrs. Eva', role: 'Tutor' },
    { id: 'raymond', name: 'Mr. Raymond', role: 'Tutor' },
    { id: '655243', name: '655243', role: 'Student' },
  ];
  const [results, setResults] = React.useState<UserResult[]>(mockUsers);
  const [tutors, setTutors] = React.useState<UserResult[]>([]);
  const debouncedTerm = useDebounced(searchTerm, 350);
  const { isAuthenticated, user } = useAuth();

  // Show no results when there's no search term (blank state)
  const [hasTyped, setHasTyped] = React.useState(false);

  // Automatic search on debounced term change
  React.useEffect(() => {
    const doSearch = async () => {
      if (!debouncedTerm) {
        setResults([]);
        return;
      }
      try {
        const r = await api.get('/messages/search?q=' + encodeURIComponent(debouncedTerm));
        setResults(r.data || []);
      } catch (e) {
        console.error(e);
        setResults([]);
      }
    };
    doSearch();
  }, [debouncedTerm]);

  // Load tutors once on mount (displayed so you can click tutors without typing)
  React.useEffect(() => {
    const loadTutors = async () => {
      try {
        const r = await api.get('/messages/tutors');
        setTutors(r.data || []);
        // if no typing yet, show tutors as default results area
        if (!hasTyped) setResults(r.data || []);
      } catch (e) {
        console.error('Failed to load tutors', e);
      }
    };
    loadTutors();
  }, [hasTyped]);

  const handleUserClick = async (userId: string | number) => {
    if (!isAuthenticated) {
      // Redirect to login if not signed in
      navigate('/auth/login');
      return;
    }
    try {
      // Ensure participant IDs are numeric (backend expects Longs)
      const participantIds: number[] = [];
      // include current user id if available client-side (harmless if backend also adds principal)
      if (user && (user as any).id != null) {
        participantIds.push(Number((user as any).id));
      }
      participantIds.push(Number(userId));

      const body = { participantIds };
      const resp = await api.post('/messages/create', body);
      const conv = resp.data;
      if (conv && conv.id) {
        // navigate to conversation view
        navigate(`/messages/${conv.id}`);
      } else {
        console.error('Invalid conversation returned', conv);
        alert('Could not open conversation. Check console for details.');
      }
    } catch (e: any) {
      // If unauthorized, force login; otherwise surface error
      if (e?.response?.status === 401) {
        navigate('/auth/login');
        return;
      }
      console.error('Failed to create conversation', e);
      alert('Failed to create conversation. See console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements (consistent) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
      
      <Header />

      <main className="max-w-4xl mx-auto py-4 px-4 space-y-6 relative z-10">
        
        {/* "Back to Browse" Link */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate('/messages')} // Go back to the message list
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>&lt; Browse</span>
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">Student/Tutor - Name</h1>
        
        {/* Search Input */}
        <input
            type="text"
            placeholder="Name or Student Number..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); if (e.target.value.trim().length > 0) setHasTyped(true); }}
            className="w-full p-4 rounded-lg bg-gray-800 bg-opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors mb-8"
        />

        {/* Search Results / Default Prompt */}
        <div className="bg-purple-900 bg-opacity-40 rounded-3xl p-6 shadow-xl border border-purple-800 border-opacity-50">
            <h2 className="text-white text-center text-xl font-semibold mb-6">Click on a person to start a new conversation</h2>

            <div className="flex justify-center gap-8 flex-wrap">
              {!hasTyped && results.length === 0 && (
                <p className="text-gray-200 text-center w-full">Start typing a name or student number to find a recipient, or pick a Tutor below.</p>
              )}

              {/* Tutors (always shown if available) */}
              {tutors.length > 0 && (
                <div className="w-full">
                  <h3 className="text-white text-lg text-center mb-4">Available Tutors</h3>
                  <div className="flex justify-center gap-8 flex-wrap">
                    {tutors.map((t) => (
                      <UserSearchCard key={t.id} name={(t.firstName ? `${t.firstName} ${t.lastName ?? ''}` : t.name) || t.email || ''} role={t.role ?? 'Tutor'} onClick={() => handleUserClick(t.id)} />
                    ))}
                  </div>
                </div>
              )}

              {hasTyped && results.length === 0 && (
                <p className="text-gray-200 text-center w-full">No users found for "{searchTerm}"</p>
              )}

              {hasTyped && results.map((user) => (
                <UserSearchCard 
                  key={user.id}
                  name={(user.firstName ? `${user.firstName} ${user.lastName ?? ''}` : user.name) || ''}
                  role={user.role ?? 'Student'}
                  onClick={() => handleUserClick(user.id)}
                />
              ))}
            </div>
        </div>
        
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchComposePage;