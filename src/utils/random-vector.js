import * as THREE from "three";

export const randomVector3 = () => {
    const max = 60;
    return new THREE.Vector3(
        (Math.random() * max) - (max / 2),
        (Math.random() * max) - (max / 2),
        0
    );
};