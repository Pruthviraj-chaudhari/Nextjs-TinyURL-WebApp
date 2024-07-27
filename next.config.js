module.exports = {
    async rewrites() {
        return [
            {
                source: '/:tinyID',
                destination: '/api/:tinyID'
            },
        ]
    },
}