// SISTEMAS GRÁFICOS
// PRÁCTICA 2 - "PARRIBA"
// Autor: Juan Ocaña Valenzuela

// Ball.js
// Clase abstracta para la representación de bolas

/**
 * Representa una bola del juego
 * @class
 * @abstract
 */
class Ball extends Element {

    /**
     * Propiedades de todas las bolas del juego
     * @constructor
     */
    constructor() {
        super();

        // Propiedades
        this.geometry = new THREE.SphereGeometry(50, 32, 32);
    }
}