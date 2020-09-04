export default {
	router: {
        linkActiveClass: 'active',
		extendRoutes(routes, resolve) {
            // routes.splice(0)
            routes.push({
                path: '/register',
                component: 'pages/login/index.vue',
                name: 'register'
            })
		},
    },

    server: {
        host: '0.0.0.0',
        port: 3000
    },
    
    // 注册插件
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ]
};
