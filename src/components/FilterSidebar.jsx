import { Filter, Star, DollarSign, Award } from 'lucide-react';

const FilterSidebar = ({ filters, setFilters, }) => {
  const handleFeeChange = (value) => {
    setFilters({ ...filters, maxFee: value });
  };

  const handleRatingChange = (value) => {
    setFilters({ ...filters, minRating: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center gap-2 mb-5">
        <Filter className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-gray-800">Filters</h3>
      </div>

      <div className="space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="w-4 h-4 text-green-500" />
            Max Consultation Fee
          </label>
          <input
            type="range"
            min="50"
            max="250"
            step="10"
            value={filters.maxFee}
            onChange={(e) => handleFeeChange(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$50</span>
            <span className="font-semibold text-blue-600">${filters.maxFee}</span>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Star className="w-4 h-4 text-yellow-500" />
            Minimum Rating
          </label>
          <div className="space-y-1.5">
            {[4.5, 4.7, 4.8].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  filters.minRating === rating
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  {rating}+
                </span>
              </button>
            ))}
            <button
              onClick={() => handleRatingChange(0)}
              className={`w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                filters.minRating === 0
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              All Ratings
            </button>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Award className="w-4 h-4 text-purple-500" />
            Min Experience
          </label>
          <select
            value={filters.minExperience}
            onChange={(e) => setFilters({ ...filters, minExperience: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>Any Experience</option>
            <option value={5}>5+ years</option>
            <option value={10}>10+ years</option>
            <option value={15}>15+ years</option>
          </select>
        </div>

        <button
          onClick={() => setFilters({ maxFee: 250, minRating: 0, minExperience: 0 })}
          className="w-full py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors font-medium"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;