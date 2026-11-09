import { useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import doctors from '../data/doctors';
import AppointmentCard from '../components/AppointmentCard';
import EmptyState from '../components/EmptyState';

const readUserAppointments = () => {
    const all = JSON.parse(localStorage.getItem('appointments') || '[]');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return all
        .filter((a) => a.email === user.email || a.patientName === user.name)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const MyAppointments = () => {
    const [appointments, setAppointments] = useState(readUserAppointments);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const handleCancel = (id) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
        const all = JSON.parse(localStorage.getItem('appointments') || '[]');
        const updated = all.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a));
        localStorage.setItem('appointments', JSON.stringify(updated));
        setAppointments(readUserAppointments());
        toast.success('Appointment cancelled');
    };

    const filtered = appointments.filter((a) => {
        const matchesFilter = filter === 'all' || a.status === filter;
        const matchesSearch = a.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const tabs = [
        { key: 'all', label: 'All', count: appointments.length },
        { key: 'upcoming', label: 'Upcoming', count: appointments.filter((a) => a.status === 'upcoming').length },
        { key: 'completed', label: 'Completed', count: appointments.filter((a) => a.status === 'completed').length },
        { key: 'cancelled', label: 'Cancelled', count: appointments.filter((a) => a.status === 'cancelled').length },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
                    <p className="text-gray-500 mt-1">Manage all your booked appointments in one place</p>
                </div>

                <div className="bg-white rounded-xl p-3 mb-5 shadow-sm">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setFilter(tab.key)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === tab.key
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {tab.label}
                                <span
                                    className={`px-1.5 py-0.5 rounded text-xs ${filter === tab.key ? 'bg-white/20' : 'bg-gray-100'
                                        }`}
                                >
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 mb-5 shadow-sm relative">
                    <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by doctor name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm">
                        <EmptyState
                            title="No appointments found"
                            message={
                                filter === 'all'
                                    ? "You haven't booked any appointments yet."
                                    : `No ${filter} appointments.`
                            }
                            actionLabel="Book an Appointment"
                            actionLink="/doctors"
                            icon={Calendar}
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filtered.map((appointment) => {
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
    );
};

export default MyAppointments;