const routes = {
    '/demo1': ()=>import('./demo/DemoHomePage.svelte'),
    '/demo2': ()=>import('./demo/Demo2HomePage.svelte')
}

export default routes;