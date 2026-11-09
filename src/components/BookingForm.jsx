import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Calendar, Clock, User, Mail, Phone, FileText, Video, MapPin, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingForm = ({ doctor, onBook }) => {
    const [selectedDate, setSelectedDate] = useState(doctor.availableDates[0]);
    const [selectedTime, setSelectedTime] = useState('');

    const formik = useFormik({
        initialValues: {
            patientName: '',
            email: '',
            phone: '',
            age: '',
            notes: '',
            consultationType: 'In-person',
        },
        validationSchema: Yup.object({
            patientName: Yup.string().min(3, 'Name must be at least 3 characters').required('Patient name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string().matches(/^[0-9+\-\s()]{10,}$/, 'Invalid phone number').required('Phone number is required'),
            age: Yup.number().min(1, 'Invalid age').max(120, 'Invalid age').required('Age is required'),
            notes: Yup.string().max(500, 'Notes too long'),
        }),
        onSubmit: (values, { resetForm }) => {
            if (!selectedTime) {
                toast.error('Please select a time slot');
                return;
            }

            const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
            const duplicate = existingAppointments.find(
                (a) =>
                    a.doctorId === doctor.id &&
                    a.date === selectedDate &&
                    a.time === selectedTime &&
                    a.status === 'upcoming'
            );

            if (duplicate) {
                toast.error('This time slot is already booked for this doctor');
                return;
            }

            const newAppointment = {
                id: Date.now().toString(),
                doctorId: doctor.id,
                doctorName: doctor.name,
                specialization: doctor.specialization,
                date: selectedDate,
                time: selectedTime,
                ...values,
                fee: doctor.fee,
                status: 'upcoming',
                createdAt: new Date().toISOString(),
            };

            existingAppointments.push(newAppointment);
            localStorage.setItem('appointments', JSON.stringify(existingAppointments));
            toast.success('Appointment booked successfully!');
            resetForm();
            setSelectedTime('');
            onBook?.(newAppointment);
        },
    });

    const inputClass = (field) =>
        `w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched[field] && formik.errors[field]
            ? 'border-red-400 bg-red-50'
            : 'border-gray-200 bg-gray-50'
        }`;

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Select Date
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {doctor.availableDates.map((date) => (
                        <button
                            key={date}
                            type="button"
                            onClick={() => setSelectedDate(date)}
                            className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedDate === date
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-50 text-gray-700 hover:bg-blue-50 border border-gray-200'
                                }`}
                        >
                            {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Select Time
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {doctor.timeSlots.map((time) => (
                        <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedTime === time
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-50 text-gray-700 hover:bg-blue-50 border border-gray-200'
                                }`}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Consultation Type</h3>
                <div className="grid grid-cols-2 gap-3">
                    {['In-person', 'Online'].map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => formik.setFieldValue('consultationType', type)}
                            className={`flex items-center gap-2 justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${formik.values.consultationType === type
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-50 text-gray-700 hover:bg-blue-50 border border-gray-200'
                                }`}
                        >
                            {type === 'Online' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Patient Name *</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="patientName"
                            placeholder="Enter patient name"
                            value={formik.values.patientName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={inputClass('patientName')}
                        />
                    </div>
                    {formik.touched.patientName && formik.errors.patientName && (
                        <p className="text-xs text-red-500 mt-1">{formik.errors.patientName}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Age *</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="number"
                            name="age"
                            placeholder="Enter age"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={inputClass('age')}
                        />
                    </div>
                    {formik.touched.age && formik.errors.age && (
                        <p className="text-xs text-red-500 mt-1">{formik.errors.age}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="phone"
                            placeholder="+1 555 123 4567"
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
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes (Optional)</label>
                <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                        name="notes"
                        rows={3}
                        placeholder="Describe your symptoms or concerns..."
                        value={formik.values.notes}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">Consultation Fee</p>
                    <p className="text-2xl font-bold text-blue-600">${doctor.fee}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Payment at clinic</p>
                    <p className="text-sm font-medium text-gray-700">or online</p>
                </div>
            </div>

            <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
                <CheckCircle className="w-5 h-5" />
                Confirm Appointment
            </button>
        </form>
    );
};

export default BookingForm;