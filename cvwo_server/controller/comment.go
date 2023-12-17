package controller

import (
	"cvwo_server/helper"
	"cvwo_server/model"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)
func AddComment(ctx *gin.Context) {
	var input model.Comment
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
	i, _ := strconv.ParseUint(ctx.Param("id"), 10, 64)
	input.PostID = uint(i)
	comment, err := input.Save()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error saving comment"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": comment})
}

func GetComments(ctx *gin.Context) {
	postID := ctx.Param("id")
	limit, _ := strconv.ParseInt(ctx.Query("limit"), 10, 64)
	offset, _ := strconv.ParseInt(ctx.Query("offset"), 10, 64)
	comments, err := model.GetComments(int(limit), int(offset), postID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting comments"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": comments})
}

func UpdateComment(ctx *gin.Context) {
	id := ctx.Param("commentID")
	comment, err := model.GetCommentByID(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting comment by id"})
		return
	}
	
	user, err := helper.CurrentUser(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting current user"})
		return
	}
	if comment.UserID != user.ID {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error: No permission to edit comment"})
		return
	}

	var updatedComment model.Comment
	if err := ctx.ShouldBind(&updatedComment); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error binding input"})
		return
	}
	comment, err = model.UpdateComment(id, updatedComment)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error saving comment"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": comment})
}

func DeleteComment(ctx *gin.Context) {
	id := ctx.Param("commentID")
	comment, err := model.GetCommentByID(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting comment by id"})
		return
	}
	
	user, err := helper.CurrentUser(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error getting current user"})
		return
	}
	if comment.UserID != user.ID {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error: No permission to delete comment"})
		return
	}
	err = model.DeleteComment(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Error deleting comment"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"data": comment})
}