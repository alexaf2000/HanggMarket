const { join } = require('path')
const { copySync, removeSync } = require('fs-extra')
require('dotenv').load('../');
export default {
    mode: 'spa',
    srcDir: __dirname,
    /*
     ** Headers of the page
     */
    env: {
        apiUrl: process.env.API_URL || process.env.APP_URL + '/api',
        appName: process.env.APP_NAME || 'Laravel Nuxt',
        appLocale: process.env.APP_LOCALE || 'en'
    },
    head: {
        title: process.env.APP_NAME,
        titleTemplate: '%s - ' + process.env.APP_NAME,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: 'rgb(255, 123, 0)',
        height: '3px',
        throttle: 0
    },
    /*
     ** Global CSS
     */
    css: [
        'vuesax/dist/vuesax.css'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/vuesax',
        '~/plugins/material-icons'
    ],
    router: {
        // Defines the base URL for vue router in case there was some directory prefix
        base: new URL(process.env.APP_URL).pathname
    },
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // Doc: https://github.com/nuxt-community/dotenv-module
        '@nuxtjs/dotenv',
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** Build configuration
     */
    build: {
        //Defines where assets will be in index.html
        publicPath: process.env.APP_URL + "/_nuxt",
        postcss: {
            preset: {
                features: {
                    customProperties: false
                }
            }
        },
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    },
    hooks: {
        generate: {
            done(generator) {
                // Copy dist files to public/_nuxt
                if (generator.nuxt.options.dev === false && generator.nuxt.options.mode === 'spa') {
                    const publicDir = join(generator.nuxt.options.rootDir, 'public', '_nuxt')
                    removeSync(publicDir)
                    copySync(generator.nuxt.options.generate.dir, publicDir)
                    copySync(join(generator.nuxt.options.generate.dir, '200.html'), join(publicDir, 'index.html'))
                    removeSync(generator.nuxt.options.generate.dir)
                }
            }
        }
    }

}