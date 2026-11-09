import { Link } from 'react-router-dom';
import { Star, MapPin, DollarSign, Award } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=3b82f6&color=fff&size=400`;
          }}
        />
        <div className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-gray-800">{doctor.rating}</span>
          <span className="text-xs text-gray-500">({doctor.reviews})</span>
        </div>
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium shadow-md ${
          doctor.availability === 'Available Today'
            ? 'bg-green-100 text-green-700'
            : 'bg-orange-100 text-orange-700'
        }`}>
          {doctor.availability}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
          {doctor.name}
        </h3>
        <p className="text-sm text-blue-600 font-medium mt-1">{doctor.specialization}</p>
        <p className="text-xs text-gray-500 mt-1">{doctor.qualification}</p>

        <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-blue-500" />
            <span>{doctor.experience} yrs exp</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-green-500" />
            <span>${doctor.fee}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
          <MapPin className="w-3.5 h-3.5" />
          <span>{doctor.hospital}</span>
        </div>

        <Link
          to={`/doctors/${doctor.id}`}
          className="mt-4 w-full block text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          View Profile & Book
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;