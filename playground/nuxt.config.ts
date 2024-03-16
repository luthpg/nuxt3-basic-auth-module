export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  runtimeConfig: {
    basicAuth: {
      pairs: {
        admin: 'admin'
      },
      whiteList: ['/api/*.*']
    },
  },
})
