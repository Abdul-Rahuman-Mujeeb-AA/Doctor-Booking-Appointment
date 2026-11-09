import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="text-center max-w-md">
        <div className="text-8xl md:text-9xl font-bold text-blue-600 mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            to="/doctors"
            className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Search className="w-4 h-4" />
            Find Doctors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;