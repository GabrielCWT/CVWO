package controller

import (
	"time"
	"os"
	"cvwo_server/model"
	"cvwo_server/helper"
	"github.com/gin-gonic/gin"
	"net/http"
	"github.com/golang-jwt/jwt/v5"
)

func SignUp(ctx *gin.Context) {
	var input model.AuthenticationInput
	err := ctx.ShouldBind(&input)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error binding input"})
		return
	}
	user := model.User{Username: input.Username, Password: input.Password}
	savedUser, err := user.Save()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error saving user"})
		return
	}
	ctx.JSON(http.StatusOK, savedUser)
}


func Login(ctx *gin.Context) {
	var input model.AuthenticationInput
	err := ctx.ShouldBind(&input)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error binding input"})
		return
	}
	user, err := model.FindByUsername(input.Username)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error finding user"})
		return
	}
	err = user.ValidatePassword(input.Password)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error validating password"})
		return
	}

	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(), // 30 days login
	})

	jwtTokenString, err := jwtToken.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error signing token"})
		return
	}

	ctx.SetSameSite(http.SameSiteNoneMode)
	ctx.SetCookie("Authorisation", jwtTokenString, 60*60*24*30, "", "", true, true)
	ctx.JSON(http.StatusOK,  gin.H{"user": user, "token": jwtTokenString})
}

func Logout(ctx *gin.Context) {
	ctx.SetSameSite(http.SameSiteNoneMode)
	ctx.SetCookie("Authorisation", "", -1, "", "", true, true)
	ctx.JSON(http.StatusOK, gin.H{"message": "Logged out"})
}

func Verify(ctx *gin.Context) {
	user, err := helper.CurrentUser(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error verifying user"})
		return
	}
	ctx.JSON(http.StatusOK, user)
}