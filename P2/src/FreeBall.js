// SISTEMAS GRÁFICOS
// PRÁCTICA 2 - "PARRIBA"
// Autor: Juan Ocaña Valenzuela

// FreeBall.js
/**
 * Con las bolas libres o FreeBalls se puede interactuar con el ratón.
 * Son los recursos de los que se dispone en el juego para superar los niveles.
 * @class
*/
class FreeBall extends Ball {
    /**
     * Crea una FreeBall en la posición indicada
     * @constructor
     * @param {number} x Posición x de la FreeBall
     * @param {number} y Posición y de la FreeBall
     */
    constructor(x, y) {
        super();

        // Propiedades de FreeBall
        this.status = FreeBall.IDLE;
        this.material = new THREE.MeshPhongMaterial({color: 0x333333});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        // Posición
        this.mesh.position.x = x;
        this.mesh.position.y = y;

        this.add(this.mesh);
    }

    update() {
        // ...
    }
}

// Estados de FreeBall
FreeBall.IDLE = 0;
FreeBall.SELECTED = 1;
FreeBall.DROPPED = 2;