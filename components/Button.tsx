import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
}) => {
  const buttonClasses = `
    ${
      fullWidth
        ? 'w-full'
        : 'px-4 py-2 rounded-md font-medium'
    }
    ${
      variant === 'primary'
        ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        : variant === 'secondary'
        ? 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
        : 'bg-transparent text-gray-700 hover:underline focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
    }
    ${
      size === 'sm'
        ? 'text-sm'
        : size === 'lg'
        ? 'text-lg'
        : 'text-base'
    }
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;