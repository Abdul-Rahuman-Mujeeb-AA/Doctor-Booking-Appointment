import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Phone, Save, Edit, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const readUser = () => JSON.parse(localStorage.getItem('user') || 'null');

const Profile = () => {
    // Lazy initializer — reads localStorage once, no useEffect, no sync setState
    const [user, setUser] = useState(readUser);
    const [editing, setEditing] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Name must be at least 3 characters')
                .required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            phone: Yup.string()
                .matches(/^[0-9+\-\s()]{10,}$/, 'Invalid phone number')
                .required('Phone is required'),
        }),
        onSubmit: (values) => {
            const updated = { ...user, ...values };
            localStorage.setItem('user', JSON.stringify(updated));

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const updatedUsers = users.map((u) =>
                u.email === user.email ? { ...u, ...values } : u
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            setUser(updated);
            setEditing(false);
            window.dispatchEvent(new Event('profileUpdated'));
            toast.success('Profile updated successfully');
        },
    });

    if (!user) return null;

    const inputClass = (field) =>
        `w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 ${formik.touched[field] && formik.errors[field]
            ? 'border-red-400 bg-red-50'
            : 'border-gray-200'
        }`;

    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const myAppointments = appointments.filter(
        (a) => a.email === user.email || a.patientName === user.name
    );

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your personal information</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-32 relative">
                        <div className="absolute -bottom-10 left-6">
                            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                                <span className="text-3xl font-bold text-blue-600">
                                    {user.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-14 px-6 pb-6">
                        <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                                    <Shield className="w-3.5 h-3.5" />
                                    Verified Account
                                </div>
                            </div>
                            {!editing && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="bg-blue-50 rounded-xl p-3 text-center">
                                <p className="text-2xl font-bold text-blue-600">{myAppointments.length}</p>
                                <p className="text-xs text-gray-600">Total Appointments</p>
                            </div>
                            <div className="bg-green-50 rounded-xl p-3 text-center">
                                <p className="text-2xl font-bold text-green-600">
                                    {myAppointments.filter((a) => a.status === 'upcoming').length}
                                </p>
                                <p className="text-xs text-gray-600">Upcoming</p>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-3 text-center">
                                <p className="text-2xl font-bold text-purple-600">
                                    {myAppointments.filter((a) => a.status === 'completed').length}
                                </p>
                                <p className="text-xs text-gray-600">Completed</p>
                            </div>
                        </div>

                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        disabled={!editing}
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={inputClass('name')}
                                    />
                                </div>
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        disabled={!editing}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={inputClass('email')}
                                    />
                                </div>
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        name="phone"
                                        disabled={!editing}
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={inputClass('phone')}
                                    />
                                </div>
                                {formik.touched.phone && formik.errors.phone && (
                                    <p className="text-xs text-red-500 mt-1">{formik.errors.phone}</p>
                                )}
                            </div>

                            {editing && (
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            formik.resetForm();
                                            setEditing(false);
                                        }}
                                        className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;