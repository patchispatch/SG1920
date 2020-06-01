// SISTEMAS GRÁFICOS
// PRÁCTICA 2 - "PARRIBA"
// Autor: Juan Ocaña Valenzuela

// Game.js
// Escena principal del juego, en la que se gestiona su estado y elementos

/**
 * Clase principal del juego
 * @class Game
 */
class Game extends THREE.Scene {
    /**
     * Constructor
     * @param myCanvas Canvas HTML
     */
    constructor(myCanvas) {
        super();

        // Atributos del juego
        this.renderer = this.createRenderer(myCanvas);
        this.gameState = Game.IDLE;
        
        this.octree = null;
        this.gui = null;
        this.camera = null;
        this.ambientLight = null;
        this.spotLight = null;

        // Creación de cámara
        this.createCamera();

        // Creación de GUI
        // this.createGUI();

        // Creación de Octree
        // createOctree();

        // Elementos básicos de la escena
        this.createBasicElements();
        
        // Luces
        this.createLights();
    }

    /**
     * Crea el renderizador de la escena en un Canvas HTML
     * @param {HTMLCanvasElement} canvas Canvas HTML
     */
    createRenderer(canvas) {
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        $(canvas).append(renderer.domElement);    
        return renderer;
    }

    /**
     * Crea y posiciona una cámara y la añade al grafo
     */
    createCamera() {
        let viewport = 16;
        this.camera = new THREE.OrthographicCamera(
            window.innerWidth / - viewport, 
            window.innerWidth / viewport, 
            window.innerHeight / viewport, 
            window.innerHeight / - viewport, 
            1, 
            500
        );
        this.camera.position.set(0,0,-200);
        let look = new THREE.Vector3 (0,0,0);
        this.camera.lookAt(look);
    }

    /**
     * Crea la GUI
     */
    createGUI() {
        throw new Error("TO DO");
    }

    /**
     * Crea y establece la configuración del Octree
     */
    createOctree() {
        throw new Error("TO DO");
    }

    /**
     * Crea los elementos básicos del juego (paredes, decoración, etc.)
     */
    createBasicElements() {
        // Un cubo de prueba
        let cGeom = new THREE.SphereGeometry(5, 32, 32);
        let cMat = new THREE.MeshPhongMaterial({color: 0x333333});
        this.cube = new THREE.Mesh(cGeom, cMat);
        this.add(this.cube);
    }

    /**
     * Crea las luces necesarias y las añade al grafo
     */
    createLights() {
        // Luz ambiente
        this.ambientLight = new THREE.AmbientLight(0xCCDDEE, 0.8);
        this.add(this.ambientLight);

        // Luz focal tras la cámara
        this.spotLight = new THREE.SpotLight( 0xFFFFFF, 0.45);
        this.spotLight.position.set(0, 0, -50);
        this.spotLight.castShadow = true;

        // Resolución de las sombras
        this.spotLight.shadow.mapSize.width=2048
        this.spotLight.shadow.mapSize.height=2048;
        this.add(this.spotLight);
    }

    /**
     * Carga el nivel indicado
     * @param {String} level El nivel a cargar
     */
    loadLevel() {
        throw new Error("TO DO");
    }

    /**
     * Devuelve la cámara activa
     * @returns {THREE.OrthographicCamera} Cámara activa
     */
    getCamera() {
        return this.camera;
    }

    /**
     * Actualiza el estado del juego cada frame
     */
    update() {
        requestAnimationFrame(() => this.update());

        // Renderizar la escena
        this.renderer.render(this, this.getCamera());

        // Actualización de luces
        this.helper.update();

        // Actualización de objetos de la escena
        // ...
    }


}

// Estados del juego
Game.IDLE = 0;
Game.BALL_SELECTED = 1;
Game.POSSIBLE_UNION = 2;
Game.UNION = 3;

/**
 * Función principal
 */
$(function() {
    // Instancia de la escena
    let game = new Game("#WebGL-output");

    // Listeners
    // ...

    // Primera visualización
    game.update();
});