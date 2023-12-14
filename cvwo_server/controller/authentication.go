package controller

import (
	"cvwo_server/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

func SignUp(ctx *gin.Context) {
	var input model.AuthenticationInput
	err := ctx.ShouldBind(&input)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user := model.User{Username: input.Username, Password: input.Password}
	savedUser, err := user.Save()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": savedUser})
}


func Login(ctx *gin.Context) {
	var input model.AuthenticationInput
	err := ctx.ShouldBind(&input)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user, err := model.FindByUsername(input.Username)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err = user.ValidatePassword(input.Password)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": user})
}