class Dice extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // Geometrías del dado:
      var boxGeom = new THREE.BoxGeometry (1,1,1);
      var sphereGeom = new THREE.SphereGeometry(0.65, 32, 32);

      var boxBSP = new ThreeBSP(boxGeom);
      var sphereBSP = new ThreeBSP(sphereGeom);
      var diceGeom = sphereBSP.intersect(boxBSP);
      
      var diceMat = new THREE.MeshNormalMaterial({
        flatShading: true,
      });
      this.dice = diceGeom.toMesh(diceMat);
      this.dice.geometry.computeVertexNormals();
      this.add(this.dice);

      // Ejes:
      this.axis = new THREE.AxesHelper(5);
      this.add(this.axis);
    }
    
    createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
        this.animate = false;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
          this.animate = false;
        }
      } 
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add(this.guiControls, 'animate').name("Animaciones");
    }
    
    animate() {
        this.square.rotateX(0.01);
        this.square.rotateY(0.01);
        this.square.rotateZ(0.01);
    }

    update () {
        // Animaciones
        if(this.guiControls.animations) {
            this.animate();
        }
    }
  }