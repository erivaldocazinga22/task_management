module.exports = {
  development: {
    host: "127.0.0.1",
    dialect: "sqlite",
    storage: "./src/http/core/db/database.db"
  },
  test: {
    host: "127.0.0.1",
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    host: "127.0.0.1",
    dialect: "sqlite",
    storage: "./src/http/core/db/database.db"
  }
}

