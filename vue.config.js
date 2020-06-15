module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'Clicker Lister'
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/clicker-lister/'
        : '/'
};