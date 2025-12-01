/**
 * Lógica de Cálculo - Calculadora de Carbono
 * Utiliza Private Fields (#) e métodos estáticos modernos.
 */

import CONFIG from './config.js';

export class Calculator {
    #factors;

    constructor() {
        this.#factors = CONFIG.EMISSION_FACTORS;
    }

    /**
     * Calcula o total de emissões com base nos dados de entrada.
     * @param {Object} data - Dados normalizados da UI.
     * @returns {Object} Resultado calculado e metadados.
     */
    calculate(data) {
        const results = {
            transporte: this.#calculateCategory('TRANSPORT', data.transport),
            energia: this.#calculateCategory('ENERGY', data.energy),
            residuos: this.#calculateCategory('WASTE', data.waste),
            alimentacao: this.#calculateCategory('FOOD', data.food)
        };

        const total = Object.values(results).reduce((acc, val) => acc + val, 0);

        return {
            total: Number(total.toFixed(2)),
            categories: results,
            ...this.#getFeedback(total)
        };
    }

    #calculateCategory(category, inputData) {
        const { type, value } = inputData;
        const factor = type ? this.#factors[category]?.[type] : this.#factors[category]?.general || this.#factors[category]?.kwh;

        return (value || 0) * (factor || 0);
    }

    #getFeedback(total) {
        const { LOW, MEDIUM } = CONFIG.THRESHOLDS;

        if (total <= LOW) return { level: 'low', message: '🌱 Excelente! Sua pegada é mínima.' };
        if (total <= MEDIUM) return { level: 'medium', message: '⚠️ Atenção. Você está na média, mas pode melhorar.' };
        return { level: 'high', message: '🚨 Crítico. Sua pegada está muito alta. Considere mudanças urgentes.' };
    }
}
