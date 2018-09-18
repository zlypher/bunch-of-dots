import * as THREE from "three";
import { GameObject } from "./gameobject";

export class Waypoint extends GameObject {
    constructor(pos) {
        super();
        this.speed = 0;

        this.geometry = new THREE.Geometry();
        this.geometry.vertices.push(new THREE.Vector3( -1, -1, 0) );
        this.geometry.vertices.push(new THREE.Vector3( 1, 1, 0) );
        this.geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
        this.geometry.vertices.push(new THREE.Vector3( 1, -1, 0) );
        this.geometry.vertices.push(new THREE.Vector3( -1, 1, 0) );

        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

        this.line = new THREE.Line( this.geometry, material );
        this.line.position.set(pos.x, pos.y, pos.z);
    }

    getMesh() {
        return this.line;
    }

    getPosition() {
        return this.line.position.clone();
    }
}