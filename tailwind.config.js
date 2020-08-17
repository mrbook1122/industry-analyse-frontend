const enable = process.env.NODE_ENV === 'development'

module.exports = {
    purge: {
        enabled: enable,
        content: [
            './src/**/*.js'
        ]
    },
    theme: {},
    variants: {},
    plugins: [],
}