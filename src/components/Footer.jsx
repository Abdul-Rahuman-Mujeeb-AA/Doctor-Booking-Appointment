import { Link } from 'react-router-dom';
import { Stethoscope, Mail, Phone, MapPin, Globe, Send, Camera, Share2 } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                                <Stethoscope className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                Medi<span className="text-blue-400">Care</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed mb-4">
                            Your trusted healthcare partner. Book appointments with top doctors and specialists quickly and easily.
                        </p>
                        <div className="flex gap-3">
                            {[Globe, Send, Camera, Share2].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/doctors', label: 'Find Doctors' },
                                { to: '/dashboard', label: 'Dashboard' },
                                { to: '/my-appointments', label: 'My Appointments' },
                                { to: '/profile', label: 'Profile' },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="hover:text-blue-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Services</h3>
                        <ul className="space-y-2 text-sm">
                            {['Emergency Care', 'Online Consultation', 'Diagnostic Services', 'Preventive Care', 'Mental Health'].map((service) => (
                                <li key={service}>
                                    <span className="hover:text-blue-400 transition-colors cursor-pointer">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                                <span>123 Healthcare Ave, Medical District, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-400" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span>support@medicare.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>&copy; {new Date().getFullYear()} MediCare. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-blue-400">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-400">Terms of Service</a>
                        <a href="#" className="hover:text-blue-400">Support</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;