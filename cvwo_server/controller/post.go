package controller

import (
	"cvwo_server/helper"
	"cvwo_server/model"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Test(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "Successfully authenticated"})
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
	ctx.JSON(http.StatusOK, post)
}

func GetAllPosts(ctx *gin.Context) {
	posts, err := model.GetAllPosts()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting all posts"})
		return
	}
	ctx.JSON(http.StatusOK, posts)
}

func GetPostByCategory(ctx *gin.Context) {
	category := ctx.Param("category")
	posts, err := model.GetPostByCategory(category)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting posts by category"})
		return
	}
	ctx.JSON(http.StatusOK, posts)
}

func GetPostByID(ctx *gin.Context) {
	id := ctx.Param("id")
	post, err := model.GetPostByID(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting post by id"})
		return
	}
	ctx.JSON(http.StatusOK, post)
}

func UpdatePost(ctx *gin.Context) {
	id := ctx.Param("id")
	post, err := model.GetPostByID(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting post by id"})
		return
	}
	
	user, err := helper.CurrentUser(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting current user"})
		return
	}
	if post.UserID != user.ID {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error: No permission to edit post"})
		return
	}

	var updatedPost model.Post
	if err := ctx.ShouldBind(&updatedPost); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error binding input"})
		return
	}
	post, err = model.UpdatePost(id, updatedPost)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error saving post"})
		return
	}
	ctx.JSON(http.StatusOK, post)
}

func DeletePost(ctx *gin.Context) {
	id := ctx.Param("id")
	post, err := model.GetPostByID(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting post by id"})
		return
	}
	
	user, err := helper.CurrentUser(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting current user"})
		return
	}
	if post.UserID != user.ID {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error: No permission to delete post"})
		return
	}
	err = model.DeletePost(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error deleting post"})
		return
	}
	ctx.JSON(http.StatusOK, post)
}