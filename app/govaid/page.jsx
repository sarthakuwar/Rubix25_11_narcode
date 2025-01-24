import { Home, IndianRupee, Users, MapPin, Building2 } from 'lucide-react';
import { schemes } from '@/data/schemes';
import { Calculator } from '@/components/Calculator';

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2">
            <Home className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold">Housing Subsidy Calculator</h1>
          </div>
        </div>
      </header>

      <Calculator />
    </div>
  );
}