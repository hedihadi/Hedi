export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    title: 'Hedi - An Open Source SSR Personal Blog',
    htmlAttrs: {
      lang: 'en'
    },

    meta: [
      { name: "google-site-verification", content: "Nd146obIFrVxoP6GSj4zQwR_KKYK9Fthm6tz-iM0wxc" },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Posts, Notes and Tutorials, from Hedi.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/style.css' },
      { rel: 'stylesheet', href: '/rcr1opg.css' },
    ]
  },
  googleAnalytics: {
    id: 'hedi-bc317'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-cookies.client.js' },

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyB0BoFiJ2LeEVflDnSikVsr4le7i5i8K-k",
          authDomain: "hedi-bc317.firebaseapp.com",
          projectId: "hedi-bc317",
          storageBucket: "hedi-bc317.appspot.com",
          messagingSenderId: "313801605853",
          appId: "1:313801605853:web:eae7a9fee24a7b06535134",
          measurementId: "G-93L924PZWJ"
        },
        services: {
          auth: true,
          firestore: true,
          storage: true,

        }
      }
    ]
  ],


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
