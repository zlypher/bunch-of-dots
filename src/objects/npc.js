import * as THREE from "three";
import { randomVector3 } from "../utils";

const FACTORS = {
    alignment: 0.75,
    cohesion: 1,
    separation: 0.7,
};

const DIMENSION = 20;

const FORWARD = new THREE.Vector3(0, 1, 0);

export class NPC {
    constructor(pos, mul = 1) {
        const spriteMap = new THREE.TextureLoader().load("./assets/dot.png");
        const spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
        this.sprite = new THREE.Sprite(spriteMaterial);
        this.mesh = new THREE.Mesh();
        this.mesh.add(this.sprite);

        this.speed = 0.1 * mul;
        this.dummy = true;
        // setTimeout(() => this.dummy = true, 3000);
        this.position = pos || new THREE.Vector3(0, 0, 0);
        this.velocity = randomVector3(1).normalize();
        this.acceleration = new THREE.Vector3(0, 0, 0);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }

    update(timeDelta, neighbors) {
        if (this.speed === 0) {
            return;
        }

        if (this.dummy) {
            this.calculateFlockingBehaviour(neighbors);
        }

        this.velocity.add(this.acceleration);
        this.velocity.normalize().multiplyScalar(this.speed);
        this.position.add(this.velocity);
        this.position = this.wrapAround();

        this.mesh.position.set(this.position.x, this.position.y, this.position.z);

        this.lookTo(this.velocity);

        // Reset acceleration
        this.acceleration.multiplyScalar(0);
    }

    wrapAround() {
        const pos = this.getPosition();
        if (pos.x < -DIMENSION) pos.x = DIMENSION;
        if (pos.y < -DIMENSION) pos.y = DIMENSION;
        if (pos.x > DIMENSION) pos.x = -DIMENSION;
        if (pos.y > DIMENSION) pos.y = -DIMENSION;

        return pos;
    }

    lookTo(direction) {
        if (direction.length() === 0) {
            return;
        }

        const targetDirection = direction.clone().normalize();

        let angle = FORWARD.angleTo(targetDirection);
        let fw = FORWARD;
        let tg = targetDirection;
        let dot = fw.x * -tg.y + fw.y * tg.x;
        if (dot > 0) {
            angle *= -1;
        }
        this.sprite.material.rotation = angle;
    }

    calculateFlockingBehaviour(dots) {
        const neighbors = this.determineNeighbors(dots);
        const alignment = this.calculateAlignment(neighbors);
        this.applyForce(alignment, FACTORS.alignment);

        const cohesion = this.calculateCohesion(neighbors);
        this.applyForce(cohesion, FACTORS.cohesion);

        const separation = this.calculateSeparation(neighbors);
        this.applyForce(separation, FACTORS.separation);
    }

    determineNeighbors(dots) {
        const maxDistance = 20;
        const pos = this.getPosition();

        return dots.map(d => {
            return {
                dot: d,
                distance: pos.distanceTo(d.getPosition())
            };
        }).filter(d => d.distance > 0 && d.distance < maxDistance);
    }

    calculateAlignment(neighbors) {
        if (neighbors.length === 0) {
            return new THREE.Vector3(0, 0, 0);
        }

        const sum = neighbors.reduce(
            (acc, curr) => acc.add(curr.dot.getVelocity()),
            new THREE.Vector3(0, 0, 0));

        return sum
            .divideScalar(neighbors.length)
            .normalize();
    }

    calculateCohesion(neighbors) {
        if (neighbors.length === 0) {
            return new THREE.Vector3(0, 0, 0);
        }

        const sum = neighbors.reduce(
            (acc, curr) => acc.add(curr.dot.getPosition()),
            new THREE.Vector3(0, 0, 0));

        return sum
            .divideScalar(neighbors.length)
            .sub(this.position)
            .normalize();
    }

    calculateSeparation(neighbors) {
        if (neighbors.length === 0) {
            return new THREE.Vector3(0, 0, 0);
        }

        const sum = neighbors
            // .filter(curr => curr.distance < 10)
            .reduce(
                (acc, curr) => acc.add(curr.dot.getPosition().sub(this.position)),
                new THREE.Vector3(0, 0, 0));

        return sum
            .divideScalar(neighbors.length)
            .negate()
            .normalize();
    }

    applyForce(force, factor) {
        this.acceleration.add(force.multiplyScalar(factor));
    }

    addTo(scene) {
        this.scene = scene;
        this.scene.add(this.mesh);
    }

    getPosition() {
        return this.position.clone();
    }

    getVelocity() {
        return this.velocity.clone();
    }
}