/**
 * Configuração Global - Calculadora de Carbono
 * Define fatores de emissão e constantes do sistema.
 */

const CONFIG = {
    EMISSION_FACTORS: {
        TRANSPORT: {
            car: 0.192,  // kg CO2/km
            motorcycle: 0.103, // kg CO2/km
            bus: 0.105,  // kg CO2/km
            plane: 0.255 // kg CO2/km
        },
        ENERGY: {
            kwh: 0.084   // kg CO2/kWh
        },
        WASTE: {
            general: 0.45 // kg CO2/kg
        },
        FOOD: {
            meat: 26.8,   // kg CO2/kg
            dairy: 3.1,   // kg CO2/kg
            veggies: 2.0  // kg CO2/kg
        }
    },
    UNITS: {
        emissions: 'kg CO₂e',
        distance: 'km',
        energy: 'kWh',
        weight: 'kg'
    },
    THRESHOLDS: {
        LOW: 100,
        MEDIUM: 300
    }
};

export default CONFIG;
