import * as THREE from "three";
import { Dot } from "./dot";

export class Player extends Dot {
    constructor(pos, conf = {}) {
        super(pos, conf);
    }
}