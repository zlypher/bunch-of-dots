import * as THREE from "three";
import { GameObject } from "./gameobject";

export class Dot extends GameObject {
    constructor(pos) {
        super();
        this.speed = 10.5;
        this.waypoints = [];
        this.target = THREE.Vector3(0, 0, 0);

        this.geometry = new THREE.SphereGeometry( 1, 20, 20 );
        const material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh( this.geometry, material );

        console.log(pos);
        const posVec = pos || new THREE.Vector3(0, 0, 0);
        console.log(posVec);
        this.mesh.position.set(posVec.x, posVec.y, posVec.z);
    }

    update(timeDelta) {
        if (this.waypoints.length > 0) {
        // if (this.target) {
            const targetPos = this.waypoints[0].getPosition();
            if (this.isCloseToWaypoint(targetPos)) {
                this.removeWaypoint();
            }

            // const targetPos = this.target.clone();
            targetPos.setZ(0);

            const moveVec = targetPos
                .sub(this.mesh.position)
                .normalize();

            this.mesh.translateOnAxis(moveVec, timeDelta * this.speed);
        }
    }

    isCloseToWaypoint(pos) {
        const dist = this.mesh.position.distanceTo(pos);
        return dist < 0.1;
    }

    removeWaypoint() {
        const wp = this.waypoints.shift();
        this.scene.remove(wp.getMesh());
    }

    setTarget(targetPos) {
        this.target = targetPos;
    }

    addWaypoint(wp) {
        this.waypoints.push(wp);
    }

    addTo(scene) {
        this.scene = scene;
        this.scene.add(this.mesh);
    }

    getMesh() {
        return this.mesh;
    }
}