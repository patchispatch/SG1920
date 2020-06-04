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

        // Propiedades de líneas
        this.lineMaterial = new THREE.LineBasicMaterial({color: 0xFF4D4D});
        this.lines = [];
        
        // Posición
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.originalX = x;
        this.originalY = y;

        this.add(this.mesh);
    }

    move(x, y) {
        this.mesh.position.x = x;
        this.mesh.position.y = y;
    }

    /**
     * Devuelve el estado de la FreeBall
     * @returns {FreeBall.STATUS} this.status
     */
    getStatus() {
        return this.status;
    }

    /**
     * Comportamiento de la FreeBall al pasar el ratón por encima
     */
    onHover() {
        // Cambiar el estado
        this.status = FreeBall.HOVER;
    }

    onLeave() {
        // Cambiar el estado
        this.status = FreeBall.DROPPED;
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
     * Comportamiento de la FreeBall al detectar TowerBalls en su rango
     */
    onDetection() {
        this.status = FreeBall.POSSIBLE_UNION;
    }

    /**
     * Actualiza la FreeBall cada frame
     */
    update() {
        if(this.status == FreeBall.IDLE) {
            // Hacer cosas
        }
        else if(this.status == FreeBall.HOVER) {
            // Cambiar material
            this.mesh.material = new THREE.MeshPhongMaterial({color: 0x737373});
        }
        else if(this.status == FreeBall.SELECTED) {
            // Cambiar material
            this.mesh.material = new THREE.MeshPhongMaterial({color: 0xFF33CC});
        }
        else if (this.status == FreeBall.POSSIBLE_UNION) {
            // Cambiar material
            this.mesh.material = new THREE.MeshPhongMaterial({color: 0x22DDCC});
        }
        else if(this.status == FreeBall.DROPPED) {
            // Reestablecer material
            this.mesh.material = this.material;

            // Reestablecer posición
            this.mesh.position.x = this.originalX;
            this.mesh.position.y = this.originalY;

            // Borrar líneas
            // this.lines = [];

            // Volver a estado IDLE
            this.status = FreeBall.IDLE;
        }
    }
}

// Estados de FreeBall
FreeBall.IDLE = 0;
FreeBall.HOVER = 1
FreeBall.SELECTED = 2;
FreeBall.POSSIBLE_UNION = 3;
FreeBall.DROPPED = 4;