module.exports = {
  client: {
    includes: ['./**/*.js'],
    tagName: 'gql',
    service: {
      name: 'prisma-client-js',
      url: 'http://localhost:4000/graphql',
    },
  },
};
