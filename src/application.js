import * as THREE from "three";
import { Player, NPC, Waypoint } from "./objects";
import { randomVector3, debugTarget } from "./utils";
import { Grid } from "./grid";

const clickVector = new THREE.Vector3();
const clickPos = new THREE.Vector3();

class Application {
    constructor() {
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.mesh = null;
        this.clock = null;
        this.player = null;
        this.dots = [];
    }

    setup(width, height) {
        this.camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 100 );
        this.camera.position.z = 30;

        this.scene = new THREE.Scene();
        // this.player = new Player(new THREE.Vector3(0, 0, 0), { speed: 10 });
        this.dots = this.spawnDots(20);
        // this.dots = [
        //     new NPC(new THREE.Vector3(4, 0, 0)),
        //     new NPC(new THREE.Vector3(-4, 0, 0)),
        //     new NPC(new THREE.Vector3(4, 4, 0)),
        //     new NPC(new THREE.Vector3(-4, 4, 0)),
        //     // new NPC(new THREE.Vector3(0, 8, 0)),
        //     // new NPC(new THREE.Vector3(11, 5, 0)),
        //     // new NPC(new THREE.Vector3(-11, -15, 0)),
        // ];

        const grid = new Grid();
        this.scene.add(grid.getMesh());

        // this.player.addTo(this.scene);
        this.dots.forEach(d => d.addTo(this.scene));

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( width, height );
        this.renderer.setClearColor( new THREE.Color(1, 1, 1), 1 );

        this.clock = new THREE.Clock(true);
    }

    getRenderTarget() {
        return this.renderer.domElement;
    }

    animate() {
        const timeDelta = this.clock.getDelta();

        // this.player.update(timeDelta);
        this.dots.forEach(d => d.update(timeDelta, this.dots));

        requestAnimationFrame( this.animate.bind(this) );
        this.renderer.render( this.scene, this.camera );
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    // https://stackoverflow.com/a/13091694/733368
    onMouseDown(evt) {
        evt.preventDefault();
        return;
        let target = this.getRenderTarget();
        let pos = new THREE.Vector2();
        pos.x = (evt.clientX / target.clientWidth) * 2 - 1;
        pos.y =  - (evt.clientY / target.clientHeight) * 2 + 1;

        clickVector.set(
            pos.x,
            pos.y,
            0.5
        );

        clickVector.unproject(this.camera);
        clickVector.sub(this.camera.position).normalize();

        let distance = -this.camera.position.z / clickVector.z;
        clickPos.copy(this.camera.position).add(clickVector.multiplyScalar(distance));

        this.addWaypointAt(clickPos);
        debugTarget(clickPos);
    }

    addWaypointAt(pos) {
        const wp = new Waypoint(pos);
        this.scene.add(wp.getMesh());
        this.player.addWaypoint(wp);
    }

    spawnDots(numberOfDots = 10) {
        return Array.from(new Array(numberOfDots))
            .map(i => new NPC(randomVector3(20)));
    }
}

export default Application;