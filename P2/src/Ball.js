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
        this.geometry = new THREE.SphereGeometry(50, 32, 32);
    }

    /**
     * Devuelve el centro de la bola
     * @returns {THREE.Vector2} Posición de la esfera
     */
    getPosition() {
        return new THREE.Vector2(this.mesh.position.x, this.mesh.position.y);
    }
}