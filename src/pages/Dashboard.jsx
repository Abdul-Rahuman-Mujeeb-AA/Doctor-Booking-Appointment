import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    ArrowRight,
    User,
    Stethoscope,
    TrendingUp,
    LayoutDashboard,
} from 'lucide-react';
import doctors from '../data/doctors';
import AppointmentCard from '../components/AppointmentCard';
import EmptyState from '../components/EmptyState';
import toast from 'react-hot-toast';

// Pure helpers, defined outside the component
const readUser = () => JSON.parse(localStorage.getItem('user') || 'null');

const readUserAppointments = () => {
    const userData = readUser();
    const all = JSON.parse(localStorage.getItem('appointments') || '[]');
    return all
        .filter((a) => a.email === userData?.email || a.patientName === userData?.name)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const Dashboard = () => {
    const [user] = useState(readUser);
    const [appointments, setAppointments] = useState(readUserAppointments);

    const handleCancel = (id) => {
        if (!window.confirm('Cancel this appointment?')) return;
        const all = JSON.parse(localStorage.getItem('appointments') || '[]');
        const updated = all.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a));
        localStorage.setItem('appointments', JSON.stringify(updated));
        setAppointments(readUserAppointments());
        toast.success('Appointment cancelled');
    };

    const stats = [
        { label: 'Total', value: appointments.length, icon: Calendar, color: 'blue' },
        {
            label: 'Upcoming',
            value: appointments.filter((a) => a.status === 'upcoming').length,
            icon: Clock,
            color: 'orange',
        },
        {
            label: 'Completed',
            value: appointments.filter((a) => a.status === 'completed').length,
            icon: CheckCircle,
            color: 'green',
        },
        {
            label: 'Cancelled',
            value: appointments.filter((a) => a.status === 'cancelled').length,
            icon: XCircle,
            color: 'red',
        },
    ];

    const colorMap = {
        blue: 'bg-blue-50 text-blue-600',
        orange: 'bg-orange-50 text-orange-600',
        green: 'bg-green-50 text-green-600',
        red: 'bg-red-50 text-red-600',
    };

    const recentAppointments = appointments.slice(0, 3);

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <LayoutDashboard className="w-7 h-7 text-blue-600" />
                        Dashboard
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Welcome back, {user?.name?.split(' ')[0] || 'User'}! Here's your health overview.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div
                                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${colorMap[stat.color]}`}
                            >
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{stat.label} Appointments</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold text-gray-900">Recent Bookings</h2>
                                <Link
                                    to="/my-appointments"
                                    className="flex items-center gap-1 text-sm text-blue-600 hover:gap-2 transition-all font-medium"
                                >
                                    View All <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {recentAppointments.length === 0 ? (
                                <EmptyState
                                    title="No appointments yet"
                                    message="You haven't booked any appointments yet. Find a doctor to get started."
                                    actionLabel="Find a Doctor"
                                    actionLink="/doctors"
                                    icon={Calendar}
                                />
                            ) : (
                                <div className="space-y-3">
                                    {recentAppointments.map((appointment) => {
                                        const doctor = doctors.find((d) => d.id === appointment.doctorId);
                                        return (
                                            <AppointmentCard
                                                key={appointment.id}
                                                appointment={appointment}
                                                doctor={doctor}
                                                onCancel={handleCancel}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                            <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-2.5">
                                <Link
                                    to="/doctors"
                                    className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
                                >
                                    <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <Stethoscope className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-900">Find a Doctor</p>
                                        <p className="text-xs text-gray-500">Book new appointment</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/my-appointments"
                                    className="flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group"
                                >
                                    <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
                                        <Calendar className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-900">My Appointments</p>
                                        <p className="text-xs text-gray-500">Manage bookings</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group"
                                >
                                    <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-900">My Profile</p>
                                        <p className="text-xs text-gray-500">Update details</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 text-white">
                            <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
                            <h3 className="font-bold mb-1">Health Tip</h3>
                            <p className="text-sm text-blue-100 leading-relaxed">
                                Regular checkups help prevent serious health issues. Schedule your annual health
                                screening today.
                            </p>
                            <Link
                                to="/doctors"
                                className="inline-block mt-4 text-sm font-semibold bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Book a Checkup
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;