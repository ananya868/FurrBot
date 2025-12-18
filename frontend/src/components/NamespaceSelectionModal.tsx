import React, { useState } from 'react';
import { NAMESPACE_OPTIONS, NamespaceKey } from '../constants/namespaces';
import { PawPrint } from 'lucide-react';

interface NamespaceSelectionModalProps {
    onSelect: (namespace: NamespaceKey) => void;
}

const NamespaceSelectionModal: React.FC<NamespaceSelectionModalProps> = ({ onSelect }) => {
    const [selected, setSelected] = useState<NamespaceKey | ''>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selected) {
            onSelect(selected);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-200">
                <div className="bg-gray-900 px-6 py-6 flex flex-col items-center justify-center text-center">
                    <div className="bg-white/10 p-3 rounded-full mb-4">
                        <PawPrint className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome to FurrBot!</h2>
                    <p className="text-gray-300">Let's get started knowing your pet.</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="pet-select" className="block text-sm font-medium text-gray-700">
                                You have a...
                            </label>
                            <div className="relative">
                                <select
                                    id="pet-select"
                                    value={selected}
                                    onChange={(e) => setSelected(e.target.value as NamespaceKey)}
                                    className="block w-full rounded-xl border-gray-300 bg-gray-50 py-3 px-4 text-gray-900 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm transition-all duration-200"
                                    required
                                >
                                    <option value="" disabled>Select your pet type...</option>
                                    {NAMESPACE_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!selected}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white transition-all duration-200
                ${selected
                                    ? 'bg-gray-900 hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-0.5'
                                    : 'bg-gray-300 cursor-not-allowed'}`}
                        >
                            Start Chatting
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NamespaceSelectionModal;
