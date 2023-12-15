package model
import (
	"gorm.io/gorm"
	"cvwo_server/database"
)
type Post struct {
	gorm.Model
	Title string `gorm:"not null;type:text" form:"title"`
	Content string `gorm:"not null;type:text" form:"content"`
	Category string `gorm:"not null;type:text" form:"category"`
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
	err := database.Database.Find(&posts).Error
	if err != nil {
		return nil, err
	}
	return posts, nil
}

func GetPostByCategory(category string) ([]Post, error) {
	var posts []Post
	err := database.Database.Where("category = ?", category).Find(&posts).Error
	if err != nil {
		return nil, err
	}
	return posts, nil
}

func GetPostByID(id string) (*Post, error) {
	var post Post
	err := database.Database.Where("id = ?", id).Find(&post).Error
	if err != nil {
		return nil, err
	}
	return &post, nil
}