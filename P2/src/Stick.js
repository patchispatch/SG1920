// SISTEMAS GRÁFICOS
// PRÁCTICA 2 - "PARRIBA"
// Autor: Juan Ocaña Valenzuela

// Stick.js
/**
 * Palos que forman parte de la torre.
 * Relativos a la posición de dos TowerBall
 * @class
 */
class Stick extends Element {
    /**
     * Construye una TowerBall en una posición dada
     * @constructor
     * @param {THREE.Vector2} start Posición de la TowerBall 1
     * @param {THREE.Vector2} end Posición de la TowerBall 2
     */
    constructor(start, end) {
        super();

        // Propiedades de Stick
        this.material = new THREE.MeshPhongMaterial({color: 0xCCCCCC});

        let s3 = new THREE.Vector3(start.x, start.y, 0);
        let e3 = new THREE.Vector3(end.x, end.y, 0);
        let path = new THREE.LineCurve3(s3, e3);
        this.geometry = new THREE.TubeGeometry(path, 10, 10, 5, false);
        
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.userData = this;

        this.add(this.mesh);
    }

    /**
     * Actualiza el Stick cada frame
     */
    update() {
        // ...
    }
}