/**
 * Interface do Usuário - Modern Vanilla JS
 * Usa Intl.NumberFormat, Optional Chaining e DOM moderno.
 */

import { transportOptions, foodOptions } from './routes-data.js';

export class UI {
    #calculator;
    #elements = {};

    constructor(calculator) {
        this.#calculator = calculator;
        this.#cacheDOM();
        this.#init();
    }

    #cacheDOM() {
        const get = (id) => document.getElementById(id);

        this.#elements = {
            form: {
                transportType: get('transport-type'),
                transportDist: get('transport-dist'),
                energyKwh: get('energy-kwh'),
                wasteKg: get('waste-kg'),
                foodType: get('food-type'),
                foodKg: get('food-kg'),
                btn: get('calculate-btn')
            },
            result: {
                section: get('result-section'),
                total: get('total-emission'),
                message: get('result-message'),
                details: get('result-details'),
                circle: document.querySelector('.score-display')
            }
        };
    }

    #init() {
        this.#populateSelects();
        this.#bindEvents();
    }

    #populateSelects() {
        const createOptions = (opts, parent) => {
            if (!parent) return;
            const fragment = document.createDocumentFragment();
            opts.forEach(({ value, label }) => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = label;
                fragment.appendChild(option);
            });
            parent.appendChild(fragment);
        };

        createOptions(transportOptions, this.#elements.form.transportType);
        createOptions(foodOptions, this.#elements.form.foodType);
    }

    #bindEvents() {
        this.#elements.form.btn?.addEventListener('click', this.#handleCalculate.bind(this));
    }

    #handleCalculate() {
        const inputs = this.#getInputs();
        const result = this.#calculator.calculate(inputs);
        this.#renderResult(result);
    }

    #getInputs() {
        const val = (el) => parseFloat(el?.value) || 0;
        const str = (el) => el?.value;

        return {
            transport: { type: str(this.#elements.form.transportType), value: val(this.#elements.form.transportDist) },
            energy: { value: val(this.#elements.form.energyKwh) },
            waste: { value: val(this.#elements.form.wasteKg) },
            food: { type: str(this.#elements.form.foodType), value: val(this.#elements.form.foodKg) }
        };
    }

    #renderResult({ total, categories, message, level }) {
        const { section, total: totalEl, message: msgEl, details, circle } = this.#elements.result;
        const formatter = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });

        // Update Text
        totalEl.textContent = formatter.format(total);
        msgEl.textContent = message;

        // Update Details with Template Literal
        details.innerHTML = Object.entries(categories)
            .map(([key, value]) => `
                <div class="detail-item">
                    <span class="label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <strong class="value">${formatter.format(value)} kg</strong>
                </div>
            `).join('');

        // Visual Updates
        section.hidden = false;
        section.classList.add('animate-in');

        // Conic Gradient Progress
        const maxVal = 500; // Arbitrary max for 100% circle
        const percentage = Math.min((total / maxVal) * 100, 100);
        circle.style.setProperty('--progress', `${percentage}%`);

        // Scroll
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
