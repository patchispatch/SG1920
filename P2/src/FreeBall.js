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
        this.mesh.userData = this;
        
        // Posición
        this.mesh.position.x = x;
        this.mesh.position.y = y;

        this.add(this.mesh);
    }

    /**
     * Comportamiento de la FreeBall al ser seleccionada
     */
    onPick() {
        // Cambiar el estado
        this.status = FreeBall.SELECTED;
    }

    /**
     * Comportamiento de la FreeBall al ser deseleccionada
     */
    onDrop() {
        this.status = FreeBall.DROPPED;
    }

    /**
     * Actualiza la FreeBall cada frame
     */
    update() {
        if(this.status == FreeBall.IDLE) {
            // Hacer cosas
        }
        else if(this.status == FreeBall.SELECTED) {
            // Cambiar material
            this.mesh.material = new THREE.MeshPhongMaterial({color: 0xFF33CC});
        }
        else if(this.status == FreeBall.DROPPED) {
            // Reestablecer material
            this.mesh.material = this.material;

            // Volver a estado IDLE
            this.status = FreeBall.IDLE;
        }
    }
}

// Estados de FreeBall
FreeBall.IDLE = 0;
FreeBall.SELECTED = 1;
FreeBall.DROPPED = 2;