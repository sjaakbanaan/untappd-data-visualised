import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '../UI/Icon/Icon';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [untappdUsername, setUntappdUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!untappdUsername) {
          throw new Error('Please enter your Untappd username');
        }
        await signup(email, password, untappdUsername);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-gray-800 p-6 md:rounded-2xl md:p-8 md:shadow-2xl">
        <div className="text-center">
          <h2 className="mt-0 text-3xl font-extrabold text-yellow-500">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {isLogin ? 'Log in to see your stats' : 'Join and save your beer journey'}
          </p>
        </div>

        {error && (
          <div className="rounded border border-red-500 bg-red-500/10 p-4 text-center text-sm text-red-500">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {!isLogin && (
              <div>
                <label
                  className="mb-1 block text-sm text-gray-400"
                  htmlFor="untappd_username"
                >
                  Untappd Username
                </label>
                <input
                  id="untappd_username"
                  name="untappd_username"
                  type="text"
                  required
                  value={untappdUsername}
                  onChange={(e) => setUntappdUsername(e.target.value)}
                  className="w-full appearance-none rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder:text-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  placeholder="untappd_user"
                />
              </div>
            )}
            <div>
              <label className="mb-1 block text-sm text-gray-400" htmlFor="email-address">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full appearance-none rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder:text-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                placeholder="beer@lover.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full appearance-none rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder:text-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-bold text-black transition-colors duration-200 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:bg-yellow-700"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign in' : 'Create account'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-800 px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:bg-gray-700"
            >
              <Icon icon="GOOGLE" pathFill="white" className="w-4" />
              Google
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-yellow-500 transition-colors duration-200 hover:text-yellow-400"
          >
            {isLogin ? 'New here? Sign up!' : 'Returning visitor? Sign in!'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
