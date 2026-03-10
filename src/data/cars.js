import skodaSide1 from '../assets/cars/skoda_side1.webp';
import skodaBack from '../assets/cars/skoda_back.webp';
import skodaSalonSeat from '../assets/cars/skoda_salon_seat.webp';
import skodaSalonWheel from '../assets/cars/skoda_salon_wheel.webp';
import skodaSalonWheelSide from '../assets/cars/skoda_salon_wheel_side.webp';

// New generated images (converted to WebP for performance)
import bmwX5_2018 from '../assets/cars/bmw_x5_2018.webp';
import bmw530i_2018 from '../assets/cars/bmw_530i_2018.webp';
import vwJetta2020 from '../assets/cars/vw_jetta_2020_red.webp';
import vwPassat2014 from '../assets/cars/vw_passat_2014.webp';

import benzSFront from '../assets/cars/benz_S_front.webp';
import benzSBack from '../assets/cars/benz_S_back.webp';
import benzSSide from '../assets/cars/benz_S_side.webp';
import benzSSalonFull from '../assets/cars/benz_S_salon_full.webp';
import benzSSalonWheel from '../assets/cars/benz_S_salon_wheel.webp';

import cabriFront from '../assets/cars/cabri_front.webp';
import cabriBack from '../assets/cars/cabri_back.webp';
import cabriSide from '../assets/cars/cabri_side.webp';
import cabriSalonFull from '../assets/cars/cabri_salon_full.webp';
import cabriSalonWheel from '../assets/cars/cabri_salon_wheel.webp';

import cooperDFront from '../assets/cars/cooper_front.webp';
import cooperDBack from '../assets/cars/cooper_back.webp';
import cooperDSide from '../assets/cars/cooper_side.webp';
import cooperDSalonFull from '../assets/cars/cooper_salon_full.webp';
import cooperDSalonWheel from '../assets/cars/cooper_salon_wheel.webp';

import bmwGGFront from '../assets/cars/bmw_GG_front.webp';
import bmwGGBack from '../assets/cars/bmw_GG_back.webp';
import bmwGGSide from '../assets/cars/bmw_GG_side.webp';
import bmwGGSalonFull from '../assets/cars/bmw_GG_salon_full.webp';
import bmwGGSalonWheel from '../assets/cars/bmw_GG_salon_wheel.webp';

import bmwXFront from '../assets/cars/bmw_X_front.webp';
import bmwXBack from '../assets/cars/bmw_X_back.webp';
import bmwXSide from '../assets/cars/bmw_X_side.webp';
import bmwXSalonFull from '../assets/cars/bmw_X_salon_full.webp';
import bmwXSalonWheel from '../assets/cars/bmw_X_salon_wheel.webp';

import vwJettaFront from '../assets/cars/vw_JETTA_front.webp';
import vwJettaBack from '../assets/cars/vw_JETTA_back.webp';
import vwJettaSide from '../assets/cars/vw_JETTA_side.webp';
import vwJettaSalonFull from '../assets/cars/vw_JETTA_salon_full.webp';
import vwJettaSalonWheel from '../assets/cars/vw_JETTA_salon_wheel.webp';

const generateSlug = (name, year) => {
    return `${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${year}`;
};

export const cars = [
    {
        id: 100,
        slug: generateSlug('Skoda Kodiaq vRS', 2024),
        make: 'Škoda',
        model: 'Kodiaq vRS',
        year: 2024,
        type: 'petrol',
        class: 'premium',
        image: skodaSide1,
        images: [skodaSide1, skodaBack, skodaSalonSeat, skodaSalonWheel, skodaSalonWheelSide],
        price: 85,
        rates: { days_1: 85, days_2_3: 75, days_4_7: 65, days_8_15: 55, days_16_plus: 45 },
        description: {
            ro: "Crossover sportiv cu un puternic motor 2.0 TSI și setări vRS specifice. Habitaclul spațios cu 5 locuri și garda la sol înaltă îl fac confortabil atât pentru oraș, cât și pentru călătorii lungi.",
            ru: "Спортивный кроссовер с мощным 2.0 TSI и фирменной настройкой vRS. Вместительный 5‑местный салон и высокий клиренс делают его удобным как для города, так и для дальних путешествий.",
            en: "Sporty crossover with a powerful 2.0 TSI and signature vRS tuning. The spacious 5-seater cabin and high ground clearance make it comfortable for both the city and long trips."
        },
        specs: {
            engine: { en: '2.0 Petrol Turbo', ru: '2.0 Бензин Турбо', ro: '2.0 Benzină Turbo' },
            power: '265 HP',
            transmission: { en: 'Automatic', ru: 'Автомат', ro: 'Automată' },
            seats: 5
        }
    },
    {
        id: 101,
        slug: generateSlug('MINI Cooper D', 2023),
        make: 'MINI',
        model: 'Cooper D',
        year: 2023,
        type: 'diesel',
        class: 'standard',
        image: cooperDSide,
        images: [cooperDSide, cooperDFront, cooperDBack, cooperDSalonFull, cooperDSalonWheel],
        price: 90,
        rates: { days_1: 90, days_2_3: 60, days_4_7: 50, days_8_15: 45, days_16_plus: 40 },
        description: {
            ro: "Hatchback/crossover premium compact cu un motor diesel economic. Agil și stilat, perfect pentru o viață urbană activă și scurte ieșiri din oraș.",
            ru: "Компактный премиальный хэтчбек/кроссовер с экономичным дизельным мотором. Манёвренный и стильный, идеально подходит для активной городской жизни и коротких выездов за город.",
            en: "Compact premium hatchback/crossover with an economical diesel engine. Agile and stylish, perfectly suited for an active city life and short trips out of town."
        },
        specs: {
            engine: { en: '2.0 Diesel', ru: '2.0 Дизель', ro: '2.0 Diesel' },
            power: '150 HP',
            transmission: { en: 'Automatic', ru: 'Автомат', ro: 'Automată' },
            seats: 5
        }
    },
    {
        id: 102,
        slug: generateSlug('BMW 330e G20 LCI', 2024),
        make: 'BMW',
        model: '330e G20 LCI',
        year: 2024,
        type: 'hybrid',
        class: 'premium',
        image: bmwGGSide,
        images: [bmwGGSide, bmwGGFront, bmwGGBack, bmwGGSalonFull, bmwGGSalonWheel],
        price: 90,
        rates: { days_1: 90, days_2_3: 70, days_4_7: 60, days_8_15: 55, days_16_plus: 50 },
        description: {
            ro: "Sedan hibrid modern care combină dinamica BMW cu posibilitatea de a conduce silențios pe electricitate. O alegere excelentă pentru cei care doresc o mașină premium cu 5 locuri, cu un consum redus și o accelerație rapidă.",
            ru: "Современный гибридный седан, сочетающий динамику BMW и возможность тихой езды на электротяге. Отличный выбор для тех, кто хочет премиальный 5‑местный автомобиль с низким расходом и бодрым разгоном.",
            en: "Modern hybrid sedan combining BMW dynamics with the ability to drive quietly on electric power. An excellent choice for those who want a premium 5-seater with low consumption and brisk acceleration."
        },
        specs: {
            engine: { en: '2.0 Plug‑in Hybrid', ru: '2.0 Гибрид', ro: '2.0 Hibrid' },
            power: '292 HP',
            transmission: { en: 'Automatic', ru: 'Автомат', ro: 'Automată' },
            seats: 5
        }
    },
    {
        id: 103,
        slug: generateSlug('Mercedes S550e', 2017),
        make: 'Mercedes-Benz',
        model: 'S 550e',
        year: 2017,
        type: 'hybrid',
        class: 'premium',
        image: benzSSide,
        images: [benzSSide, benzSFront, benzSBack, benzSSalonFull, benzSSalonWheel],
        price: 150,
        rates: { days_1: 150, days_2_3: 100, days_4_7: 90, days_8_15: 80, days_16_plus: 70 },
        description: {
            ro: "Sedan executiv cu propulsie hibridă, creat pentru confort maxim. Mersul silențios, suspensia moale și spațiul generos îl fac opțiunea ideală pentru călătorii de afaceri și transferuri de nivel înalt.",
            ru: "Представительский седан с гибридной установкой, созданный для максимального комфорта. Тихий ход, мягкая подвеска и огромный запас места делают его идеальным вариантом для деловых поездок и трансферов высокого уровня.",
            en: "Executive hybrid sedan designed for maximum comfort. Quiet ride, soft suspension, and huge reserves of space make it the ideal option for business trips and high-level transfers."
        },
        specs: {
            engine: { en: '3.0 V6 Plug‑in Hybrid', ru: '3.0 V6 Гибрид', ro: '3.0 V6 Hibrid' },
            power: '436 HP',
            transmission: { en: 'Automatic', ru: 'Автомат', ro: 'Automată' },
            seats: 5
        }
    },
    {
        id: 104,
        slug: generateSlug('BMW X5 xDrive25d', 2018),
        make: 'BMW',
        model: 'X5 F15 xDrive25d',
        year: 2018,
        type: 'diesel',
        class: 'premium',
        image: bmwX5_2018,
        images: [bmwX5_2018],
        price: 100,
        rates: { days_1: 100, days_2_3: 80, days_4_7: 70, days_8_15: 60, days_16_plus: 50 },
        description: {
            ro: "Crossover premium mare, cu tracțiune integrală xDrive și un motor diesel eficient. Habitaclul spațios cu 5 locuri și nivelul ridicat de confort îl fac o opțiune excelentă pentru familie și trasee lungi.",
            ru: "Крупный премиальный кроссовер с полным приводом xDrive и экономичным, но мощным дизельным мотором. Просторный 5‑местный салон и высокий уровень комфорта делают его отличным вариантом для семьи и дальних маршрутов.",
            en: "Large premium crossover with xDrive all-wheel drive and an efficient diesel engine. The spacious 5-seater cabin and high level of comfort make it an excellent option for the family and long routes."
        },
        specs: {
            engine: { en: '2.0 Diesel Turbo', ru: '2.0 Дизель Турбо', ro: '2.0 Diesel Turbo' },
            power: '231 HP',
            transmission: { en: 'Automatic', ru: 'Автомат', ro: 'Automată' },
            seats: 5
        }
    },
    {
        id: 105,
        slug: generateSlug('BMW 530i xDrive G30', 2018),
        make: 'BMW',
        model: '530i xDrive G30',
        year: 2018,
        type: 'petrol',
        class: 'premium',
        image: bmw530i_2018,
        images: [bmw530i_2018],
        price: 130,
        rates: { days_1: 130, days_2_3: 90, days_4_7: 80, days_8_15: 70, days_16_plus: 60 },
        description: {
            ro: "Sedan de afaceri elegant, echipat cu pachetul original M, inclusiv un body kit agresiv și un interior premium în două culori. Combină confortul suprem, tracțiunea integrală xDrive și o dinamică încrezătoare a motorului pe benzină.",
            ru: "Стильный бизнес‑седан в оригинальном М‑пакете с эффектным обвесом и премиальным двухцветным салоном. Сочетает максимальный комфорт, полный привод xDrive и уверенную динамику бензинового мотора.",
            en: "A stylish business sedan equipped with the original M Sport package, featuring an aggressive body kit and a premium two-tone interior. It combines maximum comfort, xDrive all-wheel drive, and the confident dynamics of a petrol engine."
        },
        specs: {
            engine: { en: '2.0 Petrol Turbo', ru: '2.0 Бензин Турбо', ro: '2.0 Benzină Turbo' },
            power: '252 HP',
            transmission: { en: 'Automatic', ru: 'Автомат', ro: 'Automată' },
            seats: 5
        }
    },
    {
        id: 106,
        slug: generateSlug('VW Jetta 1.4 TSI', 2017),
        make: 'Volkswagen',
        model: 'Jetta 1.4 TSI',
        year: 2017,
        type: 'petrol',
        class: 'economy',
        image: vwJettaSide,
        images: [vwJettaSide, vwJettaFront, vwJettaBack, vwJettaSalonFull, vwJettaSalonWheel],
        price: 50,
        rates: { days_1: 50, days_2_3: 35, days_4_7: 30, days_8_15: 27, days_16_plus: 25 },
        description: {
            ro: "Sedan practic cu un motor turbo economic, convenabil în utilizarea zilnică. Habitaclul confortabil cu 5 locuri și portbagajul spațios îl fac o alegere bună pentru oraș și călătorii de weekend.",
            ru: "Практичный седан с экономичным турбомотором, удобный в повседневной эксплуатации. Комфортный 5‑местный салон и вместительный багажник делают его хорошим выбором для города и поездок на выходные.",
            en: "Practical sedan with an economical turbo engine, convenient for daily use. The comfortable 5-seater cabin and spacious trunk make it a good choice for the city and weekend trips."
        },
        specs: {
            engine: { en: '1.4 Petrol Turbo', ru: '1.4 Бензин Турбо', ro: '1.4 Benzină Turbo' },
            power: '150 HP',
            transmission: { en: 'Automatic', ru: 'Автомат', ro: 'Automată' },
            seats: 5
        }
    },
    {
        id: 107,
        slug: generateSlug('VW Jetta 1.4 TSI', 2020),
        make: 'Volkswagen',
        model: 'Jetta 1.4 TSI',
        year: 2020,
        type: 'petrol',
        class: 'standard',
        image: vwJetta2020,
        images: [vwJetta2020],
        price: 60,
        rates: { days_1: 60, days_2_3: 45, days_4_7: 40, days_8_15: 35, days_16_plus: 30 },
        description: {
            ro: "Sedan actualizat, cu un design modern și o ergonomie îmbunătățită. Motorul economic, suspensia confortabilă și interiorul intuitiv se potrivesc celor care caută o mașină fiabilă cu 5 locuri pentru fiecare zi.",
            ru: "Обновлённый седан с современным дизайном и улучшенной эргономикой. Экономичный двигатель, комфортная подвеска и понятный интерьер подойдут тем, кто ищет надёжный 5‑местный автомобиль на каждый день.",
            en: "Updated sedan with a modern design and improved ergonomics. An economical engine, comfortable suspension, and intuitive interior will suit those looking for a reliable 5-seater car for every day."
        },
        specs: {
            engine: { en: '1.4 Petrol Turbo', ru: '1.4 Бензин Турбо', ro: '1.4 Benzină Turbo' },
            power: '150 HP',
            transmission: { en: 'Automatic', ru: 'Автомат', ro: 'Automată' },
            seats: 5
        }
    },
    {
        id: 108,
        slug: generateSlug('VW Passat 2.0 TDI', 2014),
        make: 'Volkswagen',
        model: 'Passat 2.0 TDI',
        year: 2014,
        type: 'diesel',
        class: 'standard',
        image: vwPassat2014,
        images: [vwPassat2014],
        price: 60,
        rates: { days_1: 60, days_2_3: 40, days_4_7: 35, days_8_15: 33, days_16_plus: 30 },
        description: {
            ro: "Automobil de familie clasic, cu un motor diesel economic. Habitaclul spațios, portbagajul mare și suspensia confortabilă îl fac o opțiune excelentă pentru călătorii lungi și muncă.",
            ru: "Классический семейный автомобиль с экономичным дизельным мотором. Просторный салон, большой багажник и комфортная подвеска делают его отличным вариантом для дальних поездок и работы.",
            en: "Classic family car with an economical diesel engine. A spacious cabin, large trunk, and comfortable suspension make it an excellent option for long trips and work."
        },
        specs: {
            engine: { en: '2.0 Diesel TDI', ru: '2.0 Дизель TDI', ro: '2.0 Diesel TDI' },
            power: '150 HP',
            transmission: { en: 'Automatic', ru: 'Автомат', ro: 'Automată' },
            seats: 5
        }
    },
    {
        id: 109,
        slug: generateSlug('Mercedes E220 Cabrio', 2013),
        make: 'Mercedes-Benz',
        model: 'E 220 Cabrio',
        year: 2013,
        type: 'diesel',
        class: 'standard',
        image: cabriSide,
        images: [cabriSide, cabriFront, cabriBack, cabriSalonFull, cabriSalonWheel],
        price: 120,
        rates: { days_1: 120, days_2_3: 70, days_4_7: 55, days_8_15: 50, days_16_plus: null },
        description: {
            ro: "Decapotabilă elegantă pentru cei cărora le place să conducă cu acoperișul deschis și apreciază confortul Mercedes. Potrivită pentru călătorii relaxate prin oraș și pe trasee pitorești în sezonul cald.",
            ru: "Элегантный кабриолет для тех, кто любит ездить с открытой крышей и ценит комфорт Mercedes. Подходит для расслабленных поездок по городу и красивых маршрутов в тёплое время года.",
            en: "Elegant convertible for those who love driving with the roof down and value Mercedes comfort. Built for relaxed city trips and beautiful routes in the warm season."
        },
        specs: {
            engine: { en: '2.2 Diesel CDI', ru: '2.2 Дизель CDI', ro: '2.2 Diesel CDI' },
            power: '170 HP',
            transmission: { en: 'Automatic', ru: 'Автомат', ro: 'Automată' },
            seats: 4
        }
    },
    {
        id: 110,
        slug: generateSlug('BMW X6 xDrive30d', 2018),
        make: 'BMW',
        model: 'X6 xDrive30d',
        year: 2018,
        type: 'diesel',
        class: 'premium',
        image: bmwXSide,
        images: [bmwXSide, bmwXFront, bmwXBack, bmwXSalonFull, bmwXSalonWheel],
        price: 100,
        rates: { days_1: 100, days_2_3: 90, days_4_7: 80, days_8_15: 70, days_16_plus: 60 },
        description: {
            ro: "Coupé-crossover spectaculos, cu un motor diesel puternic și tracțiune integrală. Atrage atenția prin designul său, rămânând în același timp un automobil confortabil cu 5 locuri pentru deplasări zilnice și călătorii.",
            ru: "Эффектный купе‑кроссовер с мощным дизельным мотором и полным приводом. Привлекает внимание дизайном и при этом остаётся комфортным 5‑местным автомобилем для ежедневных поездок и путешествий.",
            en: "Striking coupe-crossover with a powerful diesel engine and all-wheel drive. Attracts attention with its design while remaining a comfortable 5-seater car for daily drives and travel."
        },
        specs: {
            engine: { en: '3.0 Diesel', ru: '3.0 Дизель', ro: '3.0 Diesel' },
            power: '258 HP',
            transmission: { en: 'Automatic', ru: 'Автомат', ro: 'Automată' },
            seats: 5
        }
    }
];

export const getCarStartingRate = (car) => {
    const availableRates = Object.entries(car.rates || {}).filter(([, value]) => typeof value === 'number');

    if (availableRates.length > 0) {
        const [key, price] = availableRates[availableRates.length - 1];
        return { key, price };
    }

    return { key: null, price: car.price };
};

export const getCarStartingPrice = (car) => getCarStartingRate(car).price;

// Helper to find car by slug
export const getCarBySlug = (slug) => cars.find(car => car.slug === slug);
