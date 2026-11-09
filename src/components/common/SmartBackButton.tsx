import React from 'react';
import { ArrowLeft } from 'lucide-react';

export interface SmartBackButtonProps {
  onClick: () => void;
  label?: string;
  contextHint?: string;
  disabled?: boolean;
  className?: string;
  variant?: 'light' | 'tech-dark' | 'ghost' | 'floating';
  theme?: 'light' | 'tech-dark' | 'ghost' | 'floating';
  size?: 'sm' | 'md' | 'lg';
}

export const SmartBackButton: React.FC<SmartBackButtonProps> = ({
  onClick,
  label = 'Quay lại',
  contextHint,
  disabled = false,
  className = '',
  variant,
  theme,
  size = 'md'
}) => {
  const activeVariant = variant || theme || 'light';
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-xl',
    md: 'px-4 py-2 text-xs sm:text-sm gap-2 rounded-2xl',
    lg: 'px-5 py-2.5 text-sm sm:text-base gap-2.5 rounded-2xl'
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size];

  // Variant classes matching  technology branding
  const variantClasses = {
    light:
      'bg-white/95 hover:bg-blue-50/80 text-slate-700 hover:text-blue-700 border border-slate-200/90 hover:border-blue-300 shadow-2xs hover:shadow-md backdrop-blur-md',
    'tech-dark':
      'bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-blue-500/50 shadow-md backdrop-blur-md',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent',
    floating:
      'bg-white text-slate-800 hover:text-blue-700 border border-slate-200 shadow-lg hover:shadow-xl backdrop-blur-md'
  }[activeVariant];

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className={`inline-flex items-center font-bold opacity-45 cursor-not-allowed select-none transition-all ${sizeClasses} ${variantClasses} ${className}`}
        aria-disabled="true"
      >
        <ArrowLeft className={`${iconSizes} shrink-0 text-slate-400`} />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center font-extrabold cursor-pointer select-none transition-all duration-200 active:scale-[0.97] ${sizeClasses} ${variantClasses} ${className}`}
      title={contextHint ? `Quay lại: ${contextHint}` : 'Quay lại màn hình trước'}
      aria-label={contextHint ? `Quay lại: ${contextHint}` : label}
    >
      <div className="w-5 h-5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
        <ArrowLeft className={`${iconSizes} group-hover:-translate-x-0.5 transition-transform`} />
      </div>
      
      <span className="tracking-tight">{label}</span>

      {contextHint && (
        <span className="hidden md:inline-block text-[11px] font-semibold text-slate-400 group-hover:text-blue-500 pl-1 border-l border-slate-200 transition-colors truncate max-w-[150px]">
          {contextHint}
        </span>
      )}
    </button>
  );
};
