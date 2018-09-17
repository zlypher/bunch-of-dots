import Application from "./application";
import "index.scss";

const app = new Application();
app.setup(window.innerWidth, window.innerHeight);
document.body.appendChild( app.getRenderTarget() );

app.animate();

document.addEventListener("mousedown", app.onMouseDown.bind(app), false);