package middleware

import (
    "cvwo_server/helper"
    "github.com/gin-gonic/gin"
    "net/http"
)

func JWTAuthMiddleware() gin.HandlerFunc {
    return func(ctx *gin.Context) {
        err := helper.ValidateJWT(ctx)
        if err != nil {
            ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorised access"})
            ctx.Abort()
            return
        }
        ctx.Next()
    }
}