import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, } from 'lucide-react';
import doctors from '../data/doctors';
import specializations from '../data/specializations';
import DoctorCard from '../components/DoctorCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import EmptyState from '../components/EmptyState';

const Doctors = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [selectedSpecialization, setSelectedSpecialization] = useState(searchParams.get('spec') || '');
    const [filters, setFilters] = useState({ maxFee: 250, minRating: 0, minExperience: 0 });
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('rating');

    useEffect(() => {
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (selectedSpecialization) params.spec = selectedSpecialization;
        setSearchParams(params, { replace: true });
    }, [searchTerm, selectedSpecialization, setSearchParams]);

    const filteredDoctors = useMemo(() => {
        let result = doctors.filter((doc) => {
            const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSpec = !selectedSpecialization || doc.specialization === selectedSpecialization;
            const matchesFee = doc.fee <= filters.maxFee;
            const matchesRating = doc.rating >= filters.minRating;
            const matchesExp = doc.experience >= filters.minExperience;
            return matchesSearch && matchesSpec && matchesFee && matchesRating && matchesExp;
        });

        if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
        else if (sortBy === 'fee-low') result.sort((a, b) => a.fee - b.fee);
        else if (sortBy === 'fee-high') result.sort((a, b) => b.fee - a.fee);
        else if (sortBy === 'experience') result.sort((a, b) => b.experience - a.experience);

        return result;
    }, [searchTerm, selectedSpecialization, filters, sortBy]);

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Find Your Doctor</h1>
                    <p className="text-gray-500 mt-1">Browse {doctors.length} verified doctors across {specializations.length} specialties</p>
                </div>

                <div className="mb-6">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedSpecialization={selectedSpecialization}
                        setSelectedSpecialization={setSelectedSpecialization}
                        specializations={specializations}
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <FilterSidebar filters={filters} setFilters={setFilters} specializations={specializations} />
                    </aside>

                    <div className="flex-1">
                        <div className="bg-white rounded-xl p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Filters
                                </button>
                                <p className="text-sm text-gray-600">
                                    <span className="font-bold text-gray-900">{filteredDoctors.length}</span> doctors found
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600">Sort by:</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                >
                                    <option value="rating">Top Rated</option>
                                    <option value="fee-low">Fee: Low to High</option>
                                    <option value="fee-high">Fee: High to Low</option>
                                    <option value="experience">Most Experienced</option>
                                </select>
                            </div>
                        </div>

                        {filteredDoctors.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm">
                                <EmptyState
                                    title="No doctors found"
                                    message="Try adjusting your search or filters to find more results."
                                    actionLabel="Clear Filters"
                                    actionLink="/doctors"
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                {filteredDoctors.map((doctor) => (
                                    <DoctorCard key={doctor.id} doctor={doctor} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doctors;