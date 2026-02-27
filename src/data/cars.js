import bmwX5 from '../assets/cars/bmw_x5_1.webp';
import bmwX5_2 from '../assets/cars/bmw_x5_2.png';
import bmwX5_3 from '../assets/cars/bmw_x5_3.png';
import mercedesCClass from '../assets/cars/mercedes_c_class.png';
import toyotaCamry from '../assets/cars/toyota_camry.png';
import rangeRoverSport from '../assets/cars/range_rover_sport.png';
import audiQ8 from '../assets/cars/audi_q8.png';
import toyotaPrius from '../assets/cars/toyota_prius.png';
import lexusRX from '../assets/cars/lexus_rx.png';
import hondaCRV from '../assets/cars/honda_cr_v.png';
import volvoXC90 from '../assets/cars/volvo_xc90_recharge.png';
import bmw330e from '../assets/cars/bmw_330e.png';
import teslaModel3 from '../assets/cars/tesla_model_3.png';
import porscheTaycan from '../assets/cars/porsche_taycan.png';
import audiEtron from '../assets/cars/audi_e_tron.png';
import hyundaiIoniq5 from '../assets/cars/hyundai_ioniq_5.png';
import mercedesEQS from '../assets/cars/mercedes_eqs.png';
import skodaSide1 from '../assets/cars/skoda_side1.webp';
import skodaBack from '../assets/cars/skoda_back.webp';
import skodaSalonSeat from '../assets/cars/skoda_salon_seat.webp';
import skodaSalonWheel from '../assets/cars/skoda_salon_wheel.webp';
import skodaSalonWheelSide from '../assets/cars/skoda_salon_wheel_side.webp';
import mercedesSide from '../assets/cars/mercedes_side.webp';
import mercedesBack from '../assets/cars/mercedes_back.webp';
import mercedesSalonWheel from '../assets/cars/mercedes_salon_wheel.webp';
import mercedesSalonSide from '../assets/cars/mercedes_salon_side.webp';
import cooperSide from '../assets/cars/cooper_side.webp';
import cooperBack from '../assets/cars/cooper_back.webp';
import cooperSalonWheel from '../assets/cars/cooper_salon_wheel.webp';
import cooperSalonSide from '../assets/cars/cooper_salon_side.webp';
import bmwSide from '../assets/cars/bmw_side.webp';
import bmwBack from '../assets/cars/bmw_back.webp';
import bmwSalonWheel from '../assets/cars/bmw_salon_wheel.webp';
import bmwSalonSide from '../assets/cars/bmw_salon_side.webp';

// Helper to generate URL-friendly slug
const generateSlug = (name, year) => {
    return `${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${year}`;
};

const generatedCars = Array.from({ length: 15 }, (_, i) => {
    const types = ['petrol', 'diesel', 'hybrid', 'electric'];
    const type = types[i % 4];

    // Map models to their image imports
    const models = {
        petrol: [
            { name: 'Mercedes C-Class', image: mercedesCClass },
            { name: 'Toyota Camry', image: toyotaCamry },
            { name: 'BMW 330e', image: bmw330e } // Reusing some images for demo
        ],
        diesel: [
            { name: 'BMW X5', image: bmwX5 },
            { name: 'Range Rover Sport', image: rangeRoverSport },
            { name: 'Audi Q8', image: audiQ8 },
            { name: 'Volvo XC90 Recharge', image: volvoXC90 } // Reusing some images for demo
        ],
        hybrid: [
            { name: 'Toyota Prius', image: toyotaPrius },
            { name: 'Lexus RX', image: lexusRX },
            { name: 'Honda CR-V', image: hondaCRV }
        ],
        electric: [
            { name: 'Tesla Model 3', image: teslaModel3 },
            { name: 'Porsche Taycan', image: porscheTaycan },
            { name: 'Audi e-tron', image: audiEtron },
            { name: 'Hyundai Ioniq 5', image: hyundaiIoniq5 },
            { name: 'Mercedes EQS', image: mercedesEQS }
        ]
    };

    // Ensure we don't go out of bounds if arrays have different lengths
    const modelList = models[type];
    const modelData = modelList[i % modelList.length];
    const name = modelData.name;
    const year = 2023 + (i % 2);
    const price = 50 + (i * 5);
    const carClass = price >= 95 ? 'premium' : price >= 70 ? 'standard' : 'economy';

    return {
        id: i + 1,
        slug: generateSlug(name, year),
        make: name.split(' ')[0],
        model: name.split(' ').slice(1).join(' '),
        year: year,
        type: type, // 'petrol', 'diesel', 'hybrid', 'electric'
        class: carClass, // 'economy', 'standard', 'premium'
        image: modelData.image,
        images: name === 'BMW X5' ? [bmwX5, bmwX5_2, bmwX5_3] : [modelData.image],
        price: price,
        description: {
            ro: "O mașină excelentă pentru călătoriile tale. Confort și performanță garantate.",
            ru: "Отличный автомобиль для ваших поездок. Комфорт и производительность гарантированы.",
            en: "An excellent car for your trips. Comfort and performance guaranteed."
        },
        specs: {
            engine: type === 'electric' ? 'Dual Motor' : '2.0L Turbo',
            power: `${200 + i * 10} HP`,
            transmission: {
                en: 'Automatic',
                ru: 'Автомат',
                ro: 'Automată'
            },
            seats: 5
        }
    };
});

export const cars = [
    {
        id: 100,
        slug: generateSlug('Skoda Kodiaq vRS', 2024),
        make: 'Škoda',
        model: 'Kodiaq vRS',
        year: 2024,
        type: 'petrol',
        class: 'premium',
        image: skodaSide1, // Main Photo
        images: [skodaSide1, skodaBack, skodaSalonSeat, skodaSalonWheel, skodaSalonWheelSide], // Gallery Photos
        price: 85,
        description: {
            ro: "A doua generație Kodiaq vRS cu 2.0 TSI (265 CP). Un SUV excelent, spațios, cu 7 locuri, ideal pentru oraș și călătorii.",
            ru: "Второе поколение Kodiaq vRS с 2.0 TSI (265 л.с.). Отличный вместительный 7-местный кроссовер, идеален для города и путешествий.",
            en: "Second generation Kodiaq vRS with 2.0 TSI (265 HP). An excellent, spacious 7-seater SUV, ideal for city and travel."
        },
        specs: {
            engine: '2.0 TSI',
            power: '265 HP',
            transmission: {
                en: '7-speed DSG',
                ru: '7-ст. DSG',
                ro: 'DSG 7 trepte'
            },
            seats: 7
        }
    },
    {
        id: 101,
        slug: generateSlug('Mercedes S550e W222', 2017),
        make: 'Mercedes-Benz',
        model: 'S 550e W222',
        year: 2017,
        type: 'hybrid',
        class: 'premium',
        image: mercedesSide,
        images: [mercedesSide, mercedesBack, mercedesSalonWheel, mercedesSalonSide],
        price: 150,
        description: {
            ro: "Plug-in hybrid (PHEV) cu 3.0L V6 Biturbo și motor electric (436 CP). Un sedan de lux cu un confort spectaculos și dinamică excepțională.",
            ru: "Плагин-гибрид (PHEV) с 3.0L V6 Biturbo + электромотор (436 л.с.). Роскошный седан с исключительным комфортом и отличной динамикой.",
            en: "Plug-in hybrid (PHEV) with a 3.0L V6 Biturbo and electric motor (436 HP). A luxury sedan with spectacular comfort and exceptional dynamics."
        },
        specs: {
            engine: '3.0 V6 PHEV',
            power: '436 HP',
            transmission: {
                en: '7G-TRONIC',
                ru: '7G-TRONIC',
                ro: '7G-TRONIC'
            },
            seats: 5
        }
    },
    {
        id: 102,
        slug: generateSlug('MINI Countryman U25', 2024),
        make: 'MINI',
        model: 'Countryman U25 2.0D',
        year: 2024,
        type: 'diesel',
        class: 'premium',
        image: cooperSide,
        images: [cooperSide, cooperBack, cooperSalonWheel, cooperSalonSide],
        price: 80,
        description: {
            ro: "Cel mai nou MINI Countryman D cu turbodiesel de 2.0 litri și sistem mild-hybrid (163 CP). Practic, eficient și economic.",
            ru: "Новейший MINI Countryman D с 2.0-литровым турбодизелем и системой mild-hybrid (163 л.с.). Практичный, современный и экономичный.",
            en: "The newest MINI Countryman D with a 2.0-liter turbodiesel and a mild-hybrid system (163 HP). Practical, modern, and economical."
        },
        specs: {
            engine: '2.0 Diesel MHEV',
            power: '163 HP',
            transmission: {
                en: '7-speed DKG',
                ru: '7-ст. DKG',
                ro: 'DKG 7 trepte'
            },
            seats: 5
        }
    },
    {
        id: 103,
        slug: generateSlug('BMW 330e G20', 2022),
        make: 'BMW',
        model: '330e G20 M Sport',
        year: 2022,
        type: 'hybrid',
        class: 'premium',
        image: bmwSide,
        images: [bmwSide, bmwBack, bmwSalonWheel, bmwSalonSide],
        price: 110,
        description: {
            ro: "Sedan sportiv plug-in hybrid (PHEV) pe platforma G20. Putere combinată de 292 CP și dinamică excelentă de condus.",
            ru: "Спортивный седан, подключаемый гибрид (PHEV) на платформе G20. Суммарная мощность 292 л.с. и отличная динамика.",
            en: "A sporty plug-in hybrid (PHEV) sedan based on the G20 platform. Combined output of 292 HP and excellent driving dynamics."
        },
        specs: {
            engine: '2.0 Turbo PHEV',
            power: '292 HP',
            transmission: {
                en: '8-speed Steptronic',
                ru: '8-ст. Steptronic',
                ro: 'Steptronic 8 trepte'
            },
            seats: 5
        }
    },
    {
        id: 104,
        slug: generateSlug('BMW X5', 2023),
        make: 'BMW',
        model: 'X5',
        year: 2023,
        type: 'diesel',
        class: 'premium',
        image: bmwX5,
        images: [bmwX5, bmwX5_2, bmwX5_3],
        price: 130,
        description: {
            ro: "Un SUV robust, premium, gata de orice provocare.",
            ru: "Премиальный и мощный внедорожник на каждый день.",
            en: "A robust, premium SUV ready for any challenge."
        },
        specs: {
            engine: '3.0 Diesel',
            power: '286 HP',
            transmission: {
                en: 'Automatic',
                ru: 'Автомат',
                ro: 'Automată'
            },
            seats: 5
        }
    },
    ...generatedCars
];

// Helper to find car by slug
export const getCarBySlug = (slug) => cars.find(car => car.slug === slug);
