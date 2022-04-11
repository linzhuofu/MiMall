module.exports = {
    devServer: {
        proxy: 'http://localhost:3000'
    },
    outputDir: "dest",
    // publicPath:'/app',
    // outputDir:'dist',
    // indexPath:'index2.html',
    // lintOnSave:false,
    productionSourceMap: true,
    lintOnSave: true,
    chainWebpack: (config) => {
        config.plugins.delete('prefetch');
    }
}