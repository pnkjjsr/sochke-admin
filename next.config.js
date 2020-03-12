const withOffline = require("next-offline");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const path = require("path");
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");
dotenvLoad();
const withNextEnv = nextEnv();

const nextConfig = {
  env: {
    domain: process.env.DOMAIN,
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
    secretKey: process.env.SECRET_KEY,
    xAccessKey: process.env.X_ACCESS_TOKEN,
    govKey: process.env.GOV_KEY,
    apiProtocol: process.env.API_PROTOCOL,
    requestTimeout: process.env.REQUEST_TIMEOUT,
    apiVersion: process.env.API_VERSION,
    requestBaseurl: process.env.REQUEST_BASEURL,
    requestBaseurlLocal: process.env.REQUEST_BASEURL_LOCAL
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
    secretKey: process.env.SECRET_KEY
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    secretKey: process.env.SECRET_KEY
  },
  dontAutoRegisterSw: true, // since we want runtime registration,
  webpack(config, { buildId, dev, isServer, defaultLoaders }) {
    // Alias
    config.resolve.alias["layout"] = path.join(__dirname, "layout");
    config.resolve.alias["common"] = path.join(__dirname, "common");
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["utils"] = path.join(__dirname, "utils");
    config.resolve.alias["functions"] = path.join(__dirname, "functions");
    config.resolve.alias["pages"] = path.join(__dirname, "pages");
    config.resolve.alias["images"] = path.join(__dirname, "static/images");
    config.resolve.alias["icons"] = path.join(__dirname, "static/icons");

    // console.log(dev, isServer)

    return config;
  }
};

module.exports = withPlugins(
  [withCSS, withSass, withOffline, withImages, withNextEnv],
  nextConfig
);
