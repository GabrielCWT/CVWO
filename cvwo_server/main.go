package main

import (
    "cvwo_server/database"
    "cvwo_server/model"
    "github.com/joho/godotenv"
    "log"
)

func main() {
    loadEnv()
    loadDatabase()
}

func loadDatabase() {
    database.Connect()
    database.Database.AutoMigrate(&model.User{})
    database.Database.AutoMigrate(&model.Post{})
}

func loadEnv() {
    err := godotenv.Load(".env.local")
    if err != nil {
        log.Fatal("Error loading .env file")
    }
}