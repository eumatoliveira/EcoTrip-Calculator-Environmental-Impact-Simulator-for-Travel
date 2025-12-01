/**
 * App Entry Point - Calculadora de Carbono
 * Inicializa a aplicação.
 */

import { Calculator } from './calculator.js';
import { UI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
    const ui = new UI(calculator);

    console.log('Calculadora de Carbono iniciada com sucesso!');
});
