module.exports = {
   type: "postgres",
   url: process.env.DATABASE_URL,
   synchronize: false,
   logging: false,
   entities: [
      "build/typeorm/entity/**/*.js"
   ],
   migrations: [
      "build/typeorm/migration/**/*.js"
   ],
   subscribers: [
      "build/typeorm/subscriber/**/*.js"
   ],
   cli: {
      entitiesDir: "src/typeorm/entity",
      migrationsDir: "src/typeorm/migration",
      subscribersDir: "src/typeorm/subscriber"
   }
};
