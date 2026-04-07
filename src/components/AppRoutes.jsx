import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DataContext } from '../DataContext';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard/Dashboard';
import Uploader from './Uploader/Uploader';
import Wrappd from './Wrappd/Wrappd';
import AuthPage from './Auth/AuthPage';
import LandingPage from './Home/LandingPage';
import SettingsPage from './Settings/SettingsPage';
import LeaderboardPage from './Leaderboard/LeaderboardPage';

const AppRoutes = () => {
  const { beerData, dataLoading } = useContext(DataContext);
  const { user, userProfile, loading } = useAuth();

  const isProfileComplete = !!(userProfile?.untappd_username && userProfile?.venue_city);

  if (loading || dataLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-yellow-500">
        <div className="size-12 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
        <p className="text-xl font-bold">Loading your beer journey...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            !isProfileComplete ? (
              <Navigate to="/settings" replace />
            ) : beerData && beerData.length > 0 ? (
              <Dashboard />
            ) : (
              <Navigate to="/upload" replace />
            )
          ) : (
            <LandingPage />
          )
        }
      />
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
      <Route 
        path="/upload" 
        element={
          user ? (
            !isProfileComplete ? (
              <Navigate to="/settings" replace />
            ) : (
              <Uploader />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/login" replace />} />
      <Route path="/leaderboard" element={user ? <LeaderboardPage /> : <Navigate to="/login" replace />} />
      <Route path="/wrappd/:id" element={<Wrappd />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
