package main

import (
    "fmt"
    "cvwo_server/controller"
    "cvwo_server/database"
    "cvwo_server/model"
    "cvwo_server/middleware"
    "github.com/joho/godotenv"
    "github.com/gin-gonic/gin"
    "log"
)

func main() {
    loadEnv()
    loadDatabase()
    startServer()
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

func startServer() {
    router := gin.Default()
    routes := router.Group("/auth")
    routes.POST("/signup", controller.SignUp)
    routes.POST("/login", controller.Login)

    authorisedRoutes := router.Group("/api")
    authorisedRoutes.Use(middleware.JWTAuthMiddleware())
    authorisedRoutes.GET("/test", controller.Test)
    router.Run(":8000")
    fmt.Println("Server running on port 8000")
}