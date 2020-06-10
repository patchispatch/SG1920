// SISTEMAS GRÁFICOS
// PRÁCTICA 2 - "PARRIBA"
// Autor: Juan Ocaña Valenzuela

// Ball.js
/**
 * Clase abstracta para la representación de bolas
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
        this.radius = 25;
        this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);
    }

    /**
     * Devuelve la posición original de la bola
     * @returns {THREE.Vector2} Posición original
     */
    getOriginalPosition() {
        return new THREE.Vector2(this.originalX, this.originalY);
    }
}