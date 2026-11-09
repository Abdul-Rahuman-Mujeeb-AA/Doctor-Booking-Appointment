import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Calendar, Clock, User } from 'lucide-react';
import doctors from '../data/doctors';
import BookingForm from '../components/BookingForm';
import EmptyState from '../components/EmptyState';

const BookAppointment = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const [booked, setBooked] = useState(null);

    const doctor = useMemo(
        () => doctors.find((d) => d.id === Number(doctorId)) || null,
        [doctorId]
    );

    if (!doctor) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <EmptyState
                    title="Doctor not found"
                    message="Please select a valid doctor to book an appointment."
                    actionLabel="Browse Doctors"
                    actionLink="/doctors"
                />
            </div>
        );
    }

    if (booked) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
                    <p className="text-gray-500 text-sm mb-6">
                        Your appointment has been booked successfully. You will receive a confirmation email shortly.
                    </p>

                    <div className="bg-blue-50 rounded-2xl p-5 text-left mb-6 space-y-3">
                        <div className="flex items-center gap-3">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                                <p className="font-semibold text-gray-900">{doctor.name}</p>
                                <p className="text-xs text-blue-600">{doctor.specialization}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                {booked.date}
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Clock className="w-4 h-4 text-blue-600" />
                                {booked.time}
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <User className="w-4 h-4 text-blue-600" />
                                {booked.patientName}
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                                {booked.consultationType}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            to="/my-appointments"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
                        >
                            View My Appointments
                        </Link>
                        <Link
                            to="/doctors"
                            className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
                        >
                            Book Another
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 mb-5 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 sticky top-24">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-48 rounded-xl object-cover mb-4"
                            />
                            <h2 className="font-bold text-gray-900">{doctor.name}</h2>
                            <p className="text-sm text-blue-600">{doctor.specialization}</p>
                            <p className="text-xs text-gray-500 mt-1">{doctor.qualification}</p>
                            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Experience</span>
                                    <span className="font-medium">{doctor.experience} years</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Rating</span>
                                    <span className="font-medium">⭐ {doctor.rating}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Hospital</span>
                                    <span className="font-medium text-right">{doctor.hospital}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Your Appointment</h1>
                            <BookingForm doctor={doctor} onBook={setBooked} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;