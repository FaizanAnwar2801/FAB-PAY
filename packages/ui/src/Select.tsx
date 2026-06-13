"use client"

export const Select = ({ options, onSelect }: {
    onSelect: (_value: string) => void;
    options: {
        key: string;
        value: string;
    }[];
}) => {
    return (
        <select
            aria-label="Choose an option"
            onChange={(e) => onSelect(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-5 py-2.5 outline-none transition-colors duration-150"
        >
            {options.map(option => (
                <option key={option.key} value={option.key}>{option.value}</option>
            ))}
        </select>
    );
}