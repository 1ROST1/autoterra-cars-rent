import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(0);

    const faqItems = [
        {
            question: t('faq.q1', { defaultValue: 'Какие документы нужны для аренды?' }),
            answer: t('faq.a1', { defaultValue: 'Паспорт и водительское удостоверение. Минимальный возраст — 21 год, стаж вождения — от 2 лет.' })
        },
        {
            question: t('faq.q2', { defaultValue: 'Можно ли арендовать авто без залога?' }),
            answer: t('faq.a2', { defaultValue: 'Залог зависит от класса автомобиля. Для эконом класса залог минимален. Подробности уточняйте по телефону.' })
        },
        {
            question: t('faq.q3', { defaultValue: 'Доступна ли доставка авто в аэропорт?' }),
            answer: t('faq.a3', { defaultValue: 'Да, мы доставляем автомобиль в аэропорт Кишинёва и в любую точку города бесплатно.' })
        },
        {
            question: t('faq.q4', { defaultValue: 'Какие цены на аренду авто?' }),
            answer: t('faq.a4', { defaultValue: 'Цены начинаются от 25€/день для эконом класса. Чем дольше срок аренды — тем ниже цена за день. Премиум авто от 45€/день.' })
        }
    ];

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {t('faq.title', { defaultValue: 'Часто задаваемые вопросы' })}
                    </h2>
                </div>
                <div className="space-y-4">
                    {faqItems.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="bg-white border text-left border-gray-200 rounded-xl overflow-hidden transition-all duration-200 shadow-sm"
                            >
                                <button
                                    onClick={() => toggleOpen(index)}
                                    className="w-full px-6 py-5 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                                >
                                    <span className="font-semibold text-lg text-slate-900 text-left">
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'transform rotate-180 text-blue-600' : ''}`}
                                    />
                                </button>

                                <div
                                    className="grid transition-all duration-300 ease-in-out px-6"
                                    style={{
                                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                                        paddingBottom: isOpen ? '1.25rem' : '0',
                                        opacity: isOpen ? 1 : 0
                                    }}
                                >
                                    <div className="overflow-hidden">
                                        <p className="text-slate-600 text-base leading-relaxed pt-2 border-t border-slate-100">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
