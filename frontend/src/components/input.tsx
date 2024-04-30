import React from 'react';

interface InputProps {
    type: string;
    id: string;
    label: string;
    value: string;
    error?: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ type, id, label, value, error, onChange }: InputProps) => {
    return (
        <div className="my-[1.5rem]">
            <label
                htmlFor={id}
                className="black text-sm font-medium text-black"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                className="mt-1 p-2 border rounded w-full"
                value={value}
                onChange={onChange}
            />
            <span className='text-pink-500 text-sm'>{error}</span>
        </div>
    );
};

export default Input;