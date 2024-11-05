import { createInertiaApp } from 'inertia-adapter-solid'
import createServer from 'inertia-adapter-solid-server'
import { hydrate } from 'solid-js/web';

createInertiaApp({
    //@ts-ignore
    resolve(name) {
        const allPages = import.meta.glob('./pages/**/*.tsx', { eager: true });
        const page = allPages[`./pages/${name}.tsx`];
        return page;
    },

    //@ts-ignore
    setup({ el, App, props }) {
        hydrate(() => App({ ...props }), el)
    },

})

