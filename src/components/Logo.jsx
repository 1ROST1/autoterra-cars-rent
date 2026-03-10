import React from 'react';
import { useTranslation } from 'react-i18next';

const Logo = ({ className = "h-20 md:h-[120px] w-auto" }) => {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-center">
            <img
                src="/logo2.svg"
                alt={t('logo.alt')}
                className={`${className} relative z-10 transition-transform`}
            />
        </div>
    );
};

export default Logo;
