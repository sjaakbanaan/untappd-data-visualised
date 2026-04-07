import { Link } from 'react-router-dom';
import Icon from '../UI/Icon/Icon';

const LandingPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center py-10 text-center">
      <div className="max-w-4xl px-4">
        <h1 className="mb-4 text-5xl font-extrabold text-yellow-500 md:text-7xl">
          Tappd
        </h1>
        <h2 className="mb-8 text-xl font-extrabold text-gray-400 md:text-2xl">
          Untappd Data Visualised
        </h2>
        <p className="mb-8 text-xl text-gray-300 md:text-2xl">
          Track your beer journey with style. Beautiful charts, maps, and stats from your
          Untappd check-ins, now saved and accessible anywhere.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/login"
            className="w-full rounded-full bg-yellow-500 px-10 py-4 text-xl font-bold text-gray-800 transition-transform duration-300 hover:scale-105 sm:w-auto"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/sjaakbanaan/untappd-data-visualised/"
            title="Github repository"
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-600 bg-gray-800 px-10 py-4 text-xl font-bold text-white transition-all duration-300 hover:bg-gray-700 sm:w-auto"
          >
            <Icon icon="GITHUB" className="w-6 fill-white" />
            GitHub
          </a>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="mb-2 text-xl font-bold text-yellow-500">Visual Insights</h3>
            <p className="text-gray-400">
              Interactive maps, brewery statistics, and check-in trends at your
              fingertips.
            </p>
          </div>
          <div className="rounded-2xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="mb-2 text-xl font-bold text-yellow-500">Persisted Data</h3>
            <p className="text-gray-400">
              Upload once, access everywhere. Your beer data is securely stored in the
              cloud.
            </p>
          </div>
          <div className="rounded-2xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="mb-2 text-xl font-bold text-yellow-500">Tappd Wrappd</h3>
            <p className="text-gray-400">
              Relive your year in beer with our custom-made year-in-review experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
