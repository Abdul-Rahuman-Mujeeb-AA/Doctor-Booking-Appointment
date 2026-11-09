import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, DollarSign, Award, GraduationCap, Languages, Building2, Calendar, ArrowLeft, Heart } from 'lucide-react';
import doctors from '../data/doctors';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const DoctorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const timer = setTimeout(() => {
            if (cancelled) return;
            const found = doctors.find((d) => d.id === Number(id));
            setDoctor(found);
            setLoading(false);
        }, 400);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [id]);

    if (loading) return <LoadingSpinner message="Loading doctor profile..." />;

    if (!doctor) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <EmptyState
                    title="Doctor not found"
                    message="The doctor you are looking for does not exist."
                    actionLabel="Browse Doctors"
                    actionLink="/doctors"
                />
            </div>
        );
    }

    const user = localStorage.getItem('user');

    const handleBook = () => {
        if (!user) {
            navigate('/login', { state: { from: `/book/${doctor.id}` } });
        } else {
            navigate(`/book/${doctor.id}`);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 mb-5 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-full sm:w-40 h-40 rounded-2xl object-cover flex-shrink-0"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=3b82f6&color=fff&size=200`;
                                    }}
                                />
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{doctor.name}</h1>
                                            <p className="text-blue-600 font-semibold mt-1">{doctor.specialization}</p>
                                            <p className="text-sm text-gray-500 mt-1">{doctor.qualification}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold text-gray-800">{doctor.rating}</span>
                                            <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                                        </div>
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${doctor.availability === 'Available Today'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-orange-100 text-orange-700'
                                                }`}
                                        >
                                            {doctor.availability}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                                                <Award className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Experience</p>
                                                <p className="text-sm font-semibold text-gray-800">{doctor.experience} years</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                                                <DollarSign className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Fee</p>
                                                <p className="text-sm font-semibold text-gray-800">${doctor.fee}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h2 className="font-bold text-gray-800 mb-2">About</h2>
                                <p className="text-sm text-gray-600 leading-relaxed">{doctor.about}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
                                <GraduationCap className="w-5 h-5 text-blue-600" />
                                Education & Qualifications
                            </h2>
                            <ul className="space-y-2.5">
                                {doctor.education.map((edu, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                                        {edu}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h2 className="font-bold text-gray-800 mb-4">Additional Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Hospital</p>
                                        <p className="text-sm font-semibold text-gray-800">{doctor.hospital}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                        <Languages className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Languages</p>
                                        <p className="text-sm font-semibold text-gray-800">{doctor.languages.join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-24">
                            <h2 className="font-bold text-gray-800 mb-4">Book Appointment</h2>
                            <div className="mb-4">
                                <p className="text-xs text-gray-500 mb-2">Available Dates</p>
                                <div className="flex flex-wrap gap-2">
                                    {doctor.availableDates.slice(0, 3).map((date) => (
                                        <div
                                            key={date}
                                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium"
                                        >
                                            {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-5">
                                <p className="text-xs text-gray-500 mb-2">Available Time Slots</p>
                                <div className="flex flex-wrap gap-2">
                                    {doctor.timeSlots.slice(0, 4).map((time) => (
                                        <div
                                            key={time}
                                            className="px-2.5 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-xs font-medium"
                                        >
                                            {time}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-blue-50 rounded-xl p-3 mb-4">
                                <p className="text-xs text-gray-600">Consultation Fee</p>
                                <p className="text-2xl font-bold text-blue-600">${doctor.fee}</p>
                            </div>
                            <button
                                onClick={handleBook}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
                            >
                                <Calendar className="w-5 h-5" />
                                Book Appointment
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 mt-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                <Heart className="w-4 h-4" />
                                Save to Favorites
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;