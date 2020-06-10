// SISTEMAS GRÁFICOS
// PRÁCTICA 2 - "PARRIBA"
// Autor: Juan Ocaña Valenzuela

// TowerBall.js
/**
 * Bolas que forman parte de la torre.
 * Son inmóviles, pero realizan diferentes procesos
 * @class
 */
class TowerBall extends Ball {
    /**
     * Construye una TowerBall en una posición dada
     * @constructor
     * @param {number} x Coordenada X de la TowerBall
     * @param {number} y Coordenada Y de la TowerBall
     * @param {THREE.Vector2} originalPos posición original, si la hubiera
     */
    constructor(x, y, originalPos = undefined) {
        super();

        // Propiedades de TowerBall
        this.material = new THREE.MeshToonMaterial({color: 0xF2E863});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.userData = this;

        // Posición
        this.mesh.position.x = x;
        this.mesh.position.y = y;

        // Posición original de la antigua FreeBall
        if(originalPos !== undefined) {
            this.originalX = originalPos.x;
            this.originalY = originalPos.y;
        }

        this.add(this.mesh);
    }

    /**
     * Actualiza la TowerBall cada frame
     */
    update() {
        // ...
    }
}