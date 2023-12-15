package controller

import (
	"cvwo_server/helper"
	"cvwo_server/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Test(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"data": "Successfully authenticated"})
}

func AddPost(ctx *gin.Context) {
	var input model.Post
	if err := ctx.ShouldBind(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error binding input"})
		return
	}
	user, err := helper.CurrentUser(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting current user"})
		return
	}

	input.UserID = user.ID
	input.Username = user.Username
	post, err := input.Save()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error saving post"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": post})
}

func GetAllPosts(ctx *gin.Context) {
	posts, err := model.GetAllPosts()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting all posts"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": posts})
}

func GetPostByCategory(ctx *gin.Context) {
	category := ctx.Param("category")
	posts, err := model.GetPostByCategory(category)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting posts by category"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": posts})
}

