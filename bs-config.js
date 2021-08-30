module.exports = {
  port: process.env.PORT,
  files: ["./**/*, {App.js, index.js}"],
  server: {
    baseDir: ['./client', './contracts'],
  },
}
