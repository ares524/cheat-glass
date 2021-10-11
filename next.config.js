const withImages = require('next-images')
const withNextCircularDeps = require('next-circular-dependency')
module.exports = withImages({
    // webpack: (config, { isServer }) => {
    //     config.externals = ["webpack", "readable-stream", "d3-interpolate", "next"]
    //     return config
    // }
})

