import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Shield, Clock, Users, Award, ChevronRight, Star, Phone, Mail, ArrowRight } from 'lucide-react';
import doctors from '../data/doctors';
import specializations from '../data/specializations';
import services from '../data/services';
import DoctorCard from '../components/DoctorCard';

const Home = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpec, setSelectedSpec] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedSpec) params.set('spec', selectedSpec);
        navigate(`/doctors?${params.toString()}`);
    };

    const featuredDoctors = doctors.slice(0, 4);

    const testimonials = [
        {
            name: 'Jennifer Adams',
            role: 'Patient',
            text: 'Booking an appointment was incredibly easy. The doctors are professional and caring. Highly recommend MediCare!',
            rating: 5,
            avatar: 'JA',
        },
        {
            name: 'Mark Johnson',
            role: 'Patient',
            text: 'The online consultation feature saved me so much time. Quality healthcare from the comfort of my home.',
            rating: 5,
            avatar: 'MJ',
        },
        {
            name: 'Sarah Williams',
            role: 'Patient',
            text: 'I found the perfect specialist for my needs within minutes. The entire process was smooth and efficient.',
            rating: 5,
            avatar: 'SW',
        },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
                <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in">
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-5">
                                <Shield className="w-3.5 h-3.5" />
                                Trusted by 50,000+ patients
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5">
                                Book Your <span className="text-blue-600">Doctor</span> Appointment Online
                            </h1>
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                                Find and book appointments with top-rated doctors and specialists. Get quality healthcare whenever you need it.
                            </p>

                            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-3 md:p-4 max-w-xl">
                                <div className="flex flex-col md:flex-row gap-2">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Doctor name..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-3 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <select
                                        value={selectedSpec}
                                        onChange={(e) => setSelectedSpec(e.target.value)}
                                        className="flex-1 px-3 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        <option value="">All Specializations</option>
                                        {specializations.slice(0, 10).map((spec) => (
                                            <option key={spec.id} value={spec.name}>{spec.name}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Search className="w-4 h-4" />
                                        Search
                                    </button>
                                </div>
                            </form>

                            <div className="flex flex-wrap gap-8 mt-10">
                                {[
                                    { icon: Users, value: '50K+', label: 'Happy Patients' },
                                    { icon: Award, value: '200+', label: 'Expert Doctors' },
                                    { icon: Clock, value: '24/7', label: 'Support' },
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <stat.icon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                                            <p className="text-xs text-gray-500">{stat.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative hidden lg:block">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=700&fit=crop"
                                    alt="Doctor"
                                    className="w-full h-[520px] object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Verified Doctors</p>
                                    <p className="text-xs text-gray-500">100% Certified</p>
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    <div>
                                        <p className="text-lg font-bold text-gray-900">4.9/5</p>
                                        <p className="text-xs text-gray-500">Patient rating</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Doctors */}
            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-blue-600 font-semibold text-sm mb-2">TOP SPECIALISTS</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Doctors</h2>
                            <p className="text-gray-500 mt-2">Meet our highly qualified and experienced medical professionals</p>
                        </div>
                        <Link to="/doctors" className="hidden md:flex items-center gap-1 text-blue-600 font-medium hover:gap-2 transition-all">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredDoctors.map((doctor) => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        ))}
                    </div>

                    <Link to="/doctors" className="md:hidden flex items-center justify-center gap-1 mt-8 text-blue-600 font-medium">
                        View All Doctors <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Specializations */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-blue-600 font-semibold text-sm mb-2">BROWSE BY CATEGORY</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Medical Specialties</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Find the right specialist for your health needs from our wide range of medical departments</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {specializations.slice(0, 10).map((spec) => (
                            <Link
                                key={spec.id}
                                to={`/doctors?spec=${encodeURIComponent(spec.name)}`}
                                className="bg-white rounded-xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all border border-gray-100 group"
                            >
                                <div className="text-3xl mb-2">{spec.icon}</div>
                                <h3 className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors">{spec.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">{spec.count} doctors</p>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link
                            to="/doctors"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Explore All Specialties <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-blue-600 font-semibold text-sm mb-2">OUR SERVICES</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Healthcare Services</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Comprehensive healthcare services designed to meet all your medical needs</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-blue-100 transition-all group"
                            >
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                                    <span>{service.icon}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.description}</p>
                                <ul className="space-y-1.5">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                                            <ChevronRight className="w-3 h-3 text-blue-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-12">
                        <p className="text-blue-200 font-semibold text-sm mb-2">TESTIMONIALS</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">What Our Patients Say</h2>
                        <p className="text-blue-100 max-w-2xl mx-auto">Real experiences from real patients who trust us with their health</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex gap-1 mb-3">
                                    {[...Array(t.rating)].map((_, j) => (
                                        <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                                        <p className="text-xs text-gray-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact / CTA */}
            <section className="py-16 md:py-20 bg-white" id="contact">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Need Help Booking?</h2>
                                <p className="text-gray-600 mb-6">Our support team is available 24/7 to assist you with appointments and answer any questions.</p>
                                <div className="space-y-3">
                                    <a href="tel:+15551234567" className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                                        <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Call us anytime</p>
                                            <p className="font-semibold text-gray-900">+1 (555) 123-4567</p>
                                        </div>
                                    </a>
                                    <a href="mailto:support@medicare.com" className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                                        <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Email support</p>
                                            <p className="font-semibold text-gray-900">support@medicare.com</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="text-center lg:text-right">
                                <p className="text-6xl mb-4">👨‍⚕️</p>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Book Your Appointment?</h3>
                                <p className="text-gray-600 mb-6">Join thousands of patients who trust MediCare.</p>
                                <Link
                                    to="/doctors"
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg"
                                >
                                    Find a Doctor <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;