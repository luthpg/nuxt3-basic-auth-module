export default defineNuxtConfig({
  modules: ["../src/module"],
  devtools: { enabled: true },
  runtimeConfig: {
    basicAuth: {
      pairs: {
        admin: "admin",
        user1: "user",
        user2: "user",
      },
      whiteList: ["/api/*"],
      realm: "test",
      productionDomains: ["test-site.com"],
    },
  },
});
