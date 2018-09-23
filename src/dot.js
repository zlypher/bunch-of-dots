import * as THREE from "three";
import { GameObject } from "./gameobject";

const FORWARD = new THREE.Vector3(0, 1, 0);
const UP = new THREE.Vector3(0, 0, 1);
const SPEED_MUL = 1;

export class Dot extends GameObject {
    constructor(pos) {
        super();
        this.speed = 10;
        this.rotationSpeed = 10;
        this.waypoints = [];
        this.target = THREE.Vector3(0, 0, 0);
        this.forward = new THREE.Vector3(0, 1, 0);

        const spriteMap = new THREE.TextureLoader().load("./assets/dot.png");
        const spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
        this.sprite = new THREE.Sprite(spriteMaterial);
        this.mesh = new THREE.Mesh();
        this.mesh.add(this.sprite);

        const posVec = pos || new THREE.Vector3(0, 0, 0);
        this.mesh.position.set(posVec.x, posVec.y, posVec.z);
    }

    update(timeDelta) {
        if (this.waypoints.length > 0) {
            const targetPos = this.waypoints[0].getPosition();
            if (this.isCloseToWaypoint(targetPos)) {
                this.removeWaypoint();
            }

            targetPos.setZ(0);

            const targetDirection = targetPos
                .sub(this.mesh.position)
                .normalize();

            const angle = this.forward.angleTo(targetDirection);
            let rotation = angle * timeDelta * this.rotationSpeed * SPEED_MUL;

            let fw = this.forward;
            let tg = targetDirection;
            let dot = fw.x * -tg.y + fw.y * tg.x;
            if (dot > 0) {
                rotation *= -1;
            }

            this.sprite.material.rotation += rotation;
            this.forward = this.forward
                .applyAxisAngle(UP, rotation)
                .normalize();

            this.mesh.translateOnAxis(this.forward, timeDelta * this.speed * SPEED_MUL);
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

    getObject() {
        return this.mesh;
    }
}