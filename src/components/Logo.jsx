import React from 'react';
import { useTranslation } from 'react-i18next';
import logoSvg from '../assets/brand/logo.svg?raw';

const logoSrc = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(logoSvg)}`;

const Logo = ({ className = "h-20 md:h-[120px] w-auto" }) => {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-center">
            <img
                src={logoSrc}
                alt={t('logo.alt')}
                className={`${className} relative z-10 transition-transform`}
            />
        </div>
    );
};

export default Logo;
