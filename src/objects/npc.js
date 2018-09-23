import * as THREE from "three";
import { Dot } from "./dot";
import { randomVector3 } from "../utils";
import { Waypoint } from "./waypoint";

export class NPC extends Dot {
    constructor(pos, conf = {}) {
        super(pos, conf);
    }

    update(timeDelta) {
        super.update(timeDelta);

        if (this.waypoints.length == 0) {
            let wp = new Waypoint(randomVector3());
            this.addWaypoint(wp);
        }
    }
}