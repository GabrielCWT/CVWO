package model
import (
	"gorm.io/gorm"
	"cvwo_server/database"
)
type Post struct {
	gorm.Model
	Title string `gorm:"not null;type:text" form:"title"`
	Content string `gorm:"not null;type:text" form:"content"`
	Username string
	UserID uint
}

func (post *Post) Save() (*Post, error) {
	err := database.Database.Create(&post).Error
	if err != nil {
		return nil, err
	}
	return post, nil
}

func GetAllPosts() ([]Post, error) {
	var posts []Post
	err := database.Database.Select("Username", "CreatedAt", "Title", "Content").Find(&posts).Error
	if err != nil {
		return nil, err
	}
	return posts, nil
}