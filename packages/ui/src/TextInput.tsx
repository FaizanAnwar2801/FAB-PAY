"use client"

export const TextInput = ({
    placeholder,
    onChange,
    label
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
}) => {
    return (
        <div className="pt-2">
            <label className="block mb-2 text-sm font-medium text-gray-700 py-2">
                {label}
            </label>
            <input
                onChange={(e) => onChange(e.target.value)}
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-5 py-2.5 outline-none transition-colors duration-150"
                placeholder={placeholder}
            />
        </div>
    );
}