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
    "os"
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
    database.Database.AutoMigrate(&model.Comment{})
}

func loadEnv() {
    err := godotenv.Load(".env")
    if err != nil {
        log.Fatal("Error loading .env file")
    }
}

func startServer() {
    router := gin.Default()

    config := cors.DefaultConfig()
    config.AllowOrigins = []string{os.Getenv("FRONTEND_URL")}
    config.AllowCredentials = true
    router.Use(cors.New(config))

    routes := router.Group("/auth")
    routes.POST("/signup", controller.SignUp)
    routes.POST("/login", controller.Login)
    routes.GET("/verify", controller.Verify)
    routes.POST("/logout", controller.Logout)

    noAuthRoutes := router.Group("/api")
    noAuthRoutes.GET("/posts", controller.GetAllPosts)
    noAuthRoutes.GET("/posts/:category", controller.GetPostByCategory)
    noAuthRoutes.GET("/posts/post/:id", controller.GetPostByID)
    noAuthRoutes.GET("/posts/categories", controller.GetCategories)
    noAuthRoutes.GET("/posts/post/:id/comment/comments", controller.GetComments)

    authorisedRoutes := router.Group("/api")
    authorisedRoutes.Use(middleware.JWTAuthMiddleware())
    authorisedRoutes.GET("/test", controller.Test)
    authorisedRoutes.POST("/posts/add", controller.AddPost)
    authorisedRoutes.PUT("/posts/post/:id", controller.UpdatePost)
    authorisedRoutes.DELETE("/posts/post/:id", controller.DeletePost)
    authorisedRoutes.POST("/posts/post/:id/comment/comments/add", controller.AddComment)
    authorisedRoutes.PUT("/posts/post/:id/comment/comments/:commentID", controller.UpdateComment)
    authorisedRoutes.DELETE("/posts/post/:id/comment/comments/:commentID", controller.DeleteComment)
    router.Run(":8000")
    fmt.Println("Server running on port 8000")
}