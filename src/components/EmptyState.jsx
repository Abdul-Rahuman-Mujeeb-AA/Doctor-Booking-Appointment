import { Link } from 'react-router-dom';
import { Inbox } from 'lucide-react';

const EmptyState = ({ title = 'Nothing here yet', message = 'There are no items to display.', actionLabel, actionLink, icon: Icon = Inbox }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-blue-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm max-w-md mb-6">{message}</p>
      {actionLabel && actionLink && (
        <Link
          to={actionLink}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;