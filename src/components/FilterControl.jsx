import React from 'react';

export default function FilterControl({
    label,
    options,
    value,
    onChange,
    onReset,
    activeIndex,
    activeColor,
    resetTitle
}) {
    const isActive = value !== 'none'

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-0">
            <div className="text-center md:text-right md:pr-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {label}:
                </span>
            </div>

            <div className="flex justify-center">
                <div className={`grid w-full max-w-[288px] items-center gap-2 ${isActive ? 'grid-cols-[minmax(0,1fr)_auto]' : 'grid-cols-[minmax(0,1fr)]'} sm:w-auto sm:max-w-none ${isActive ? 'sm:grid-cols-[auto_auto]' : 'sm:grid-cols-[auto]'}`}>
                    <div className={`relative grid ${options.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} glass-filter-group w-full min-w-0 sm:w-auto`}>
                        <span
                            className="absolute left-1 top-1 bottom-1 rounded-lg shadow-sm transition-all duration-300"
                            style={{
                                width: `calc((100% - 0.5rem) / ${options.length})`,
                                transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
                                backgroundColor: activeColor,
                                opacity: isActive ? 1 : 0
                            }}
                        />

                        {options.map(({ key, label: optionLabel }) => (
                            <button
                                key={key}
                                onClick={() => onChange(key)}
                                className={`relative z-10 min-w-0 px-2.5 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs leading-tight font-medium transition-all ${value === key
                                    ? 'text-white'
                                    : 'text-slate-500 hover:text-slate-900'
                                    }`}
                            >
                                {optionLabel}
                            </button>
                        ))}
                    </div>

                    {isActive && (
                        <button
                            onClick={onReset}
                            className="glass-clear-button shrink-0"
                            title={resetTitle}
                            aria-label={resetTitle}
                        >
                            &times;
                        </button>
                    )}
                </div>
            </div>

            <div className="hidden md:block"></div>
        </div>
    )
}
