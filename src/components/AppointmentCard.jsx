import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Video, XCircle, Eye, CheckCircle, User } from 'lucide-react';

const AppointmentCard = ({ appointment, doctor, onCancel }) => {
    const statusConfig = {
        upcoming: { color: 'bg-blue-100 text-blue-700', icon: Clock },
        completed: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
        cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle },
    };

    const config = statusConfig[appointment.status] || statusConfig.upcoming;
    const StatusIcon = config.icon;

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
            <div className="flex items-start gap-4">
                <img
                    src={doctor?.image}
                    alt={doctor?.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor?.name || 'Doctor')}&background=3b82f6&color=fff`;
                    }}
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="font-bold text-gray-800 truncate">{doctor?.name}</h3>
                            <p className="text-sm text-blue-600">{doctor?.specialization}</p>
                        </div>
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color} capitalize flex-shrink-0`}>
                            <StatusIcon className="w-3 h-3" />
                            {appointment.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            {appointment.consultationType === 'Online' ? (
                                <Video className="w-4 h-4 text-purple-500" />
                            ) : (
                                <MapPin className="w-4 h-4 text-green-500" />
                            )}
                            <span>{appointment.consultationType}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4 text-gray-500" />
                            <span>Patient: {appointment.patientName}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                        <Link
                            to={`/appointments/${appointment.id}`}
                            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            <Eye className="w-4 h-4" />
                            Details
                        </Link>
                        {appointment.status === 'upcoming' && (
                            <button
                                onClick={() => onCancel(appointment.id)}
                                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                <XCircle className="w-4 h-4" />
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;