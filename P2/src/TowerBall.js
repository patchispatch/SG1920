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
     */
    constructor(x, y) {
        super();

        // Propiedades de TowerBall
        this.material = new THREE.MeshPhongMaterial({color: 0xCCCCCC});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.userData = this;

        // Posición
        this.mesh.position.x = x;
        this.mesh.position.y = y;

        this.add(this.mesh);
    }

    /**
     * Actualiza la TowerBall cada frame
     */
    update() {
        // ...
    }
}