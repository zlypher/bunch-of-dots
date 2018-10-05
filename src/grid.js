import * as THREE from "three";

export class Grid {
    constructor() {
        this.geometry = new THREE.Geometry();
        this.geometry.vertices.push(new THREE.Vector3( -50, 0, 0) );
        this.geometry.vertices.push(new THREE.Vector3( 50, 0, 0) );
        this.geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
        this.geometry.vertices.push(new THREE.Vector3( 0, 50, 0) );
        this.geometry.vertices.push(new THREE.Vector3( 0, -50, 0) );

        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

        this.line = new THREE.Line( this.geometry, material );
        this.line.add(this.addXSubline(-20));
        this.line.add(this.addXSubline(-10));
        this.line.add(this.addXSubline(10));
        this.line.add(this.addXSubline(20));
        this.line.add(this.addYSubline(-20));
        this.line.add(this.addYSubline(-10));
        this.line.add(this.addYSubline(10));
        this.line.add(this.addYSubline(20));
    }

    addXSubline(x) {
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( x, -50, 0) );
        geometry.vertices.push(new THREE.Vector3( x, 50, 0) );

        const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        return new THREE.Line( geometry, material );
    }

    addYSubline(y) {
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( -50, y, 0) );
        geometry.vertices.push(new THREE.Vector3( 50, y, 0) );

        const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        return new THREE.Line( geometry, material );
    }

    getMesh() {
        return this.line;
    }

    getPosition() {
        return this.line.position.clone();
    }
}