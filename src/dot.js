import * as THREE from "three";
import { GameObject } from "./gameobject";

export class Dot extends GameObject {
    constructor() {
        super();
        this.speed = 10.5;
        this.target = THREE.Vector3(0, 0, 0);

        this.geometry = new THREE.SphereGeometry( 1, 20, 20 );
        const material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh( this.geometry, material );
    }

    update(timeDelta) {
        if (this.target) {
            const targetPos = this.target.clone();
            targetPos.setZ(0);

            const moveVec = targetPos
                .sub(this.mesh.position)
                .normalize();
                // .multiplyScalar(timeDelta * this.speed);

                console.log(moveVec);

            // this.mesh.position.x += moveVec.x;
            // this.mesh.position.y += moveVec.y;
            // this.mesh.position.setY(this.mesh.position.y += moveVec.y);
            this.mesh.translateOnAxis(moveVec, timeDelta * this.speed);
        }
    }

    setTarget(targetPos) {
        this.target = targetPos;
    }

    getMesh() {
        return this.mesh;
    }
}