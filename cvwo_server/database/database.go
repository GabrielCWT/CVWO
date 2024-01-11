package database

import (
	"database/sql"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

var Database *gorm.DB

func Connect() {
	var err error
	if os.Getenv("DB_DSN") != "" {
		var sqlDB *sql.DB
		sqlDB, err = sql.Open("pgx", os.Getenv("DB_DSN"))
		Database, err = gorm.Open(postgres.New(postgres.Config{Conn: sqlDB,}), &gorm.Config{})
	} else {
		host := os.Getenv("DB_HOST")
		user := os.Getenv("DB_USER")
		password := os.Getenv("DB_PASSWORD")
		databaseName := os.Getenv("DB_NAME")
		port := os.Getenv("DB_PORT")
		dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, password, databaseName, port)
		Database, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	}

	if err != nil {
		panic("Failed to connect to database!")
	} else {
		fmt.Println("Connected to database")
	}
}