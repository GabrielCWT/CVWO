package main

import (
    "fmt"
    "cvwo_server/controller"
    "cvwo_server/database"
    "cvwo_server/model"
    "cvwo_server/middleware"
    "github.com/joho/godotenv"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
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

    config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:3000"}
    config.AllowCredentials = true
    router.Use(cors.New(config))

    routes := router.Group("/auth")
    routes.POST("/signup", controller.SignUp)
    routes.POST("/login", controller.Login)
    routes.GET("/verify", controller.Verify)

    authorisedRoutes := router.Group("/api")
    authorisedRoutes.Use(middleware.JWTAuthMiddleware())
    authorisedRoutes.GET("/test", controller.Test)
    authorisedRoutes.POST("/posts/add", controller.AddPost)
    // authorisedRoutes.GET("/posts/:category", controller.GetPostByCategory)
    authorisedRoutes.GET("/posts", controller.GetAllPosts)
    router.Run(":8000")
    fmt.Println("Server running on port 8000")
}