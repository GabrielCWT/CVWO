package model
import (
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"cvwo_server/database"
)
type Comment struct {
	gorm.Model
	Content string `gorm:"not null;type:text" form:"content"`
	Username string
	UserID uint
	PostID uint
}

func (comment *Comment) Save() (*Comment, error) {
	err := database.Database.Create(&comment).Error
	if err != nil {
		return nil, err
	}
	return comment, nil
}

func GetComments(limit int, offset int, postID string) ([]Comment, error) {
	var comments []Comment
	err := database.Database.Select("id", "created_at", "content", "username", "user_id", "post_id").Where("post_id = ?", postID).Limit(limit).Offset(offset).Find(&comments).Error
	if err != nil {
		return nil, err
	}
	return comments, nil
}

func GetCommentByID(id string) (*Comment, error) {
	var comment Comment
	err := database.Database.Where("id = ?", id).First(&comment).Error
	if err != nil {
		return nil, err
	}
	return &comment, nil
}

func UpdateComment(id string, comment Comment) (*Comment, error) {
	var updatedComments []Comment
	err := database.Database.Model(&updatedComments).Clauses(clause.Returning{}).Where("id = ?", id).Updates(comment).Error
	if err != nil {
		return nil, err
	}
	updatedComment := &updatedComments[0]
	return updatedComment, nil
}

func DeleteComment(id string) (error) {
	err := database.Database.Delete(&Comment{}, id).Error
	return err
}