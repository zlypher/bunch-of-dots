export const debugTarget = (vec) => {
    const dbgNode = document.querySelector(".js-target");
    dbgNode.innerHTML = `${Math.round(vec.x)}, ${Math.round(vec.y)}, ${Math.round(vec.z)}`;
};
