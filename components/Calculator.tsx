"use client"

import { useState } from 'react';
import { IndianRupee, Users, MapPin, Building2 } from 'lucide-react';
import { schemes } from '@/data/schemes';

type FilterCriteria = {
  gender: string;
  income: number;
  caste: string;
  location: string;
  state: string;
};

export function Calculator() {
  const [filteredSchemes, setFilteredSchemes] = useState(schemes);
  const [filters, setFilters] = useState<FilterCriteria>({
    gender: '',
    income: 0,
    caste: '',
    location: '',
    state: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filterSchemes = () => {
    const filtered = schemes.filter((scheme) => {
      return scheme.eligibility.some((criteria) => {
        const incomeInRange = filters.income >= criteria.income_range.min_income && 
                            filters.income <= criteria.income_range.max_income;
        const casteMatch = criteria.caste.includes(filters.caste);
        const locationMatch = criteria.location === filters.location;
        const genderMatch = criteria.gender === filters.gender;
        const stateMatch = scheme.state === filters.state;

        return incomeInRange && casteMatch && locationMatch && genderMatch && stateMatch;
      });
    });
    setFilteredSchemes(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-zinc-950 border border-white/10 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Filter Eligibility Criteria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="w-full bg-black border border-white/20 rounded-md px-3 py-2 focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Annual Income</label>
            <input
              type="number"
              name="income"
              value={filters.income}
              onChange={handleFilterChange}
              className="w-full bg-black border border-white/20 rounded-md px-3 py-2 focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors"
              placeholder="Enter annual income"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Caste</label>
            <select
              name="caste"
              value={filters.caste}
              onChange={handleFilterChange}
              className="w-full bg-black border border-white/20 rounded-md px-3 py-2 focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors"
            >
              <option value="">Select Caste</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
              <option value="General">General</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full bg-black border border-white/20 rounded-md px-3 py-2 focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors"
            >
              <option value="">Select Location</option>
              <option value="Rural">Rural</option>
              <option value="Urban">Urban</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">State</label>
            <select
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              className="w-full bg-black border border-white/20 rounded-md px-3 py-2 focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-colors"
            >
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Manipur">Manipur</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Punjab">Punjab</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Haryana">Haryana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Bihar">Bihar</option>
              <option value="Goa">goa</option>

            </select>
          </div>
        </div>
        <button
          onClick={filterSchemes}
          className="mt-6 bg-white hover:bg-white/90 text-black px-6 py-2 rounded-md transition-colors font-medium"
        >
          Filter Schemes
        </button>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme, index) => (
          <div key={index} className="bg-zinc-950 border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-colors">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-6 h-6 text-white" />
                <h3 className="text-lg font-semibold">{scheme.name}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-white/60" />
                  <span>{scheme.state}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <IndianRupee className="w-4 h-4 text-white/60" />
                  <span>₹{scheme.eligibility[0].income_range.min_income.toLocaleString()} - ₹{scheme.eligibility[0].income_range.max_income.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-white/60" />
                  <span>{scheme.eligibility[0].caste.join(', ')}</span>
                </div>
              </div>
              <a
                href="https://www.bankbazaar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-block text-center bg-white hover:bg-white/90 text-black px-4 py-2 rounded-md transition-colors font-medium"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}