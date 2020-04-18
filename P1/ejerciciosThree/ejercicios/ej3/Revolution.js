 class Revolution extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    this.points = [];
    for(var i = 0; i < 10; ++i) {
      this.points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
    }
    var geometry = new THREE.LatheGeometry(this.points, 24, 0, Math.PI);
    // Como material se crea uno
    var material = new THREE.MeshNormalMaterial({
      flatShading: true,
      side: THREE.DoubleSide,
    });
    
    // Ya podemos construir el Mesh
    this.lathe = new THREE.Mesh (geometry, material);

    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.lathe);

    // Ejes:
    this.axis = new THREE.AxesHelper(5);
    this.add(this.axis);
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.scale = 1.0;
      this.segments = 12;
      this.phiStart = 0;
      this.phiLength = 2*Math.PI;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.scale = 1.0;
        this.segments = 12;
        this.phiStart = 0;
        this.phiLength = 2*Math.PI;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.guiControls, 'scale', 0.1, 5.0, 0.1).name('Tamaño : ').listen();
    folder.add(this.guiControls, 'segments', 2, 48, 1).name('Segmentos : ').listen();
    folder.add(this.guiControls, 'phiStart', 0, 6, 1).name('phiStart : ').listen();
    folder.add(this.guiControls, 'phiLength', 0, 2*Math.PI, 0.1).name('phiLength : ').listen(); 
    folder.add(this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    //this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.lathe.scale.set(this.guiControls.scale, this.guiControls.scale, this.guiControls.scale);
    this.lathe.geometry = new THREE.LatheGeometry(this.points, this.guiControls.segments, this.guiControls.phiStart, this.guiControls.phiLength);
    this.lathe.rotateY(0.01);
  }
}