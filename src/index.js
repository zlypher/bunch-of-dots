import Application from "./application";
import style from "./index.scss";

const app = new Application();
app.setup(window.innerWidth, window.innerHeight);
document.body.appendChild( app.getRenderTarget() );

app.animate();

window.addEventListener("resize", app.onResize.bind(app), false);
document.addEventListener("mousedown", app.onMouseDown.bind(app), false);
