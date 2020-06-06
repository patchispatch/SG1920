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

        this.geometry = null;
        this.material = null;
        this.mesh = null;
    }

    /**
     * Devuelve el Mesh del elemento
     * @returns Mesh del objeto
     */
    getMesh() {
        return this.mesh;
    }

    /**
     * Actualiza el objeto
     * @abstract
     */
    update() {
        throw new Error("To implement in subclass");
    }

    /**
     * Devuelve la posición del elemento
     * @returns {THREE.Vector2} Posición del elemento
     */
    getPosition() {
        return new THREE.Vector2(this.mesh.position.x, this.mesh.position.y);
    }
}