const apiPath = '/api'
module.exports = {
  server: {
    host: 'localhost',
    port: '3030',
  },
  apiPath: apiPath,
  auth: {
    service: `${apiPath}/users`,
    secret: "ccb303ca9dc5226cba9535db303dec32f054da324dba594acf492dd63aebe38a69cd05fbff3d19933ee05003bf1be5bf8b272f7abdfaded3cd4b41d0309572d78bec43f7fe4c4ce93c38fa21d460baae3383119ba73ed1a0be29bba4f8878490541bc6ca92fdaf87750f1db1cb78af58f0038459b7a440fb151dfb33f40dfba162c6cb807442f10d54667f60d7fe7c64d437dfb4a25fc53572567e7f43531064ddd9e224f283b5ea0a2b57de6b9a5452c2749d7ade02ee75fcbfe68f9b679aac14a189f98ff0874b897beb72f8f510a1ee0c21d2af2b548613253800f09095b2ea0c1ada4b8dcea90bcf78e6b8b51f36d2fc343e473260a027938061189e7fd3",
    strategies: [
      "jwt",
      "local"
    ],
    path: `${apiPath}/auth/local`,
    local: {
      entity: "user",
      service: `${apiPath}/users`,
      usernameField: "email",
      passwordField: "password"
    },
    jwt:{
      header: { typ: '' }
    }
  },
  authEmails: {
    providers: {
      postmark: {
        fromEmail: '...@....com', // must be verified with postmarkapp.com
        postmarkApiToken: '00917934-dbe7-4883-bedc-12b93fc4c7c59', // our account token
      },
    },
  },
};
