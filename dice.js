/*dice.js*/
const { trace } = require('@opentelemetry/api');

const tracer = trace.getTracer('agent-servicio-dice.js');

function rollOnce(i, min, max) {
    return tracer.startActiveSpan(
        `metodo-rollOnce-iteracion: ${i}`,
        { attributes: { 'parametros ingresados (i, min, max)': `${i}, ${min}, ${max}`,
                        'parametros i': ` ${i}`,
                        'parametros min': ` ${min}`,
                        'parametros max': ` ${max}`
                    } 
        },
        (span) => {
            const result = Math.floor(Math.random() * (max - min) + min);

            // Add an attribute to the span
            span.setAttribute('numero generado', result.toString());

            span.end();
            return result;
        });
}

function rollTheDice(rolls, min, max) {
    return tracer.startActiveSpan(
        'metodo-rollTheDice',
        { attributes: { 'parametros ingresados (rolls, min, max)': `${rolls}, ${min}, ${max}`,
                        'parametros rolls': ` ${rolls}`,
                        'parametros min': ` ${min}`,
                        'parametros max': ` ${max}`
                     }
        },
        (span) => {
            const result = [];
            for (let i = 0; i < rolls; i++) {
                result.push(rollOnce(i, min, max));
            }
            // Be sure to end the span!
            span.end();
            return result;
        });
}

module.exports = { rollTheDice };