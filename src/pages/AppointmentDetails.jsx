import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Mail,
    Phone,
    FileText,
    DollarSign,
    MapPin,
    Video,
    XCircle,
    CheckCircle,
    Stethoscope,
} from 'lucide-react';
import toast from 'react-hot-toast';
import doctors from '../data/doctors';
import EmptyState from '../components/EmptyState';

const readAppointment = (id) => {
    const all = JSON.parse(localStorage.getItem('appointments') || '[]');
    return all.find((a) => a.id === id) || null;
};

const AppointmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Lazy initializer: reads localStorage once on first render — no useEffect, no sync setState.
    const [appointment, setAppointment] = useState(() => readAppointment(id));

    // Derive doctor directly from the appointment, no need for separate state.
    const doctor = useMemo(
        () => (appointment ? doctors.find((d) => d.id === appointment.doctorId) || null : null),
        [appointment]
    );

    const handleCancel = () => {
        if (!window.confirm('Cancel this appointment?')) return;
        const all = JSON.parse(localStorage.getItem('appointments') || '[]');
        const updated = all.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a));
        localStorage.setItem('appointments', JSON.stringify(updated));
        setAppointment((prev) => (prev ? { ...prev, status: 'cancelled' } : prev));
        toast.success('Appointment cancelled');
    };

    if (!appointment) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <EmptyState
                    title="Appointment not found"
                    message="The appointment you are looking for does not exist."
                    actionLabel="View Appointments"
                    actionLink="/my-appointments"
                />
            </div>
        );
    }

    const statusStyles = {
        upcoming: 'bg-blue-100 text-blue-700',
        completed: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700',
    };

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

                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                    <div className="flex items-start justify-between gap-3 flex-wrap mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Appointment Details</h1>
                            <p className="text-sm text-gray-500 mt-1">ID: #{appointment.id}</p>
                        </div>
                        <span
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${statusStyles[appointment.status]}`}
                        >
                            {appointment.status === 'upcoming' && <Clock className="w-3.5 h-3.5" />}
                            {appointment.status === 'completed' && <CheckCircle className="w-3.5 h-3.5" />}
                            {appointment.status === 'cancelled' && <XCircle className="w-3.5 h-3.5" />}
                            {appointment.status}
                        </span>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-5 mb-6">
                        <div className="flex items-center gap-4">
                            <img
                                src={doctor?.image}
                                alt={doctor?.name}
                                className="w-16 h-16 rounded-xl object-cover"
                                onError={(e) => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        doctor?.name || 'Doctor'
                                    )}&background=3b82f6&color=fff`;
                                }}
                            />
                            <div className="flex-1">
                                <h2 className="font-bold text-gray-900">
                                    {doctor?.name || appointment.doctorName}
                                </h2>
                                <p className="text-sm text-blue-600">{appointment.specialization}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{doctor?.hospital}</p>
                            </div>
                            <Link
                                to={`/doctors/${appointment.doctorId}`}
                                className="hidden sm:flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
                            >
                                <Stethoscope className="w-3.5 h-3.5" />
                                View Profile
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-800 text-sm mb-3">Appointment Info</h3>
                            <div className="space-y-2.5 text-sm">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-500">Date:</span>
                                    <span className="font-medium">{appointment.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-500">Time:</span>
                                    <span className="font-medium">{appointment.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    {appointment.consultationType === 'Online' ? (
                                        <Video className="w-4 h-4 text-purple-600" />
                                    ) : (
                                        <MapPin className="w-4 h-4 text-green-600" />
                                    )}
                                    <span className="text-gray-500">Type:</span>
                                    <span className="font-medium">{appointment.consultationType}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <DollarSign className="w-4 h-4 text-green-600" />
                                    <span className="text-gray-500">Fee:</span>
                                    <span className="font-medium">${appointment.fee}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-800 text-sm mb-3">Patient Info</h3>
                            <div className="space-y-2.5 text-sm">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <User className="w-4 h-4 text-blue-600" />
                                    <span className="font-medium">{appointment.patientName}</span>
                                    <span className="text-gray-500">({appointment.age} yrs)</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="w-4 h-4 text-blue-600" />
                                    <span>{appointment.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Phone className="w-4 h-4 text-blue-600" />
                                    <span>{appointment.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {appointment.notes && (
                        <div className="mt-5 bg-gray-50 rounded-xl p-4">
                            <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm mb-2">
                                <FileText className="w-4 h-4 text-blue-600" />
                                Notes
                            </h3>
                            <p className="text-sm text-gray-600">{appointment.notes}</p>
                        </div>
                    )}

                    {appointment.status === 'upcoming' && (
                        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                            >
                                <XCircle className="w-4 h-4" />
                                Cancel Appointment
                            </button>
                            <Link
                                to="/my-appointments"
                                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                Back to Appointments
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetails;