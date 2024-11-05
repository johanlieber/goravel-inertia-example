//@ts-ignore
import { createInertiaApp } from "inertia-adapter-solid";
import { render } from 'solid-js/web'
import "../css/app.css";

createInertiaApp({
  //@ts-ignore
  resolve(name) {
    const allPages = import.meta.glob('./pages/**/*.tsx', { eager: true });
    const page = allPages[`./pages/${name}.tsx`];
    return page;
  },

  //@ts-ignore
  setup({ el, App, props }) {
    render(() => App({ ...props }), el)
  },
});
