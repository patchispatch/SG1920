// SISTEMAS GRÁFICOS
// PRÁCTICA 2 - "PARRIBA"
// Autor: Juan Ocaña Valenzuela

// Element.js
// Clase abstracta para la representación de elementos del juego

/**
 * Elementos dinámicos del juego
 * @abstract
 * @class
 */
class Element extends THREE.Object3D {
    /**
     * Atributos necesarios
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Actualiza el objeto
     * @abstract
     */
    update() {
        throw new Error("To implement in subclass");
    }
}