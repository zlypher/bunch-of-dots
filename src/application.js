import * as THREE from "three";

class Application {
    constructor() {
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.mesh = null;
    }

    setup(width, height) {
        this.camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 100 );
        this.camera.position.z = 50;

        this.scene = new THREE.Scene();

        this.geometry = new THREE.SphereGeometry( 1, 20, 20 );
        const material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh( this.geometry, material );
        this.scene.add( this.mesh );

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( width, height );
        this.renderer.setClearColor( new THREE.Color(1, 1, 1), 1 );
    }

    getRenderTarget() {
        return this.renderer.domElement;
    }

    animate() {
        requestAnimationFrame( this.animate.bind(this) );
    
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.02;
    
        this.renderer.render( this.scene, this.camera );
    }

    onMouseDown(evt) {
        evt.preventDefault();
        let target = this.getRenderTarget();
        let pos = new THREE.Vector2();
        pos.x = (evt.clientX / target.clientWidth) * 2 - 1;
        pos.y =  - (evt.clientY / target.clientHeight) * 2 + 1;

        console.log("click", pos);
    }
}

export default Application;