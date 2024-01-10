package model
import (
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
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
	err := database.Database.Select("id", "created_at", "title", "category", "username").Order("created_at desc").Find(&posts).Error
	if err != nil {
		return nil, err
	}
	return posts, nil
}

func GetPostByCategory(category string) ([]Post, error) {
	var posts []Post
	err := database.Database.Select("id", "created_at", "title", "category", "username").Where("category = ?", category).Order("created_at desc").Find(&posts).Error
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

func UpdatePost(id string, post Post) (*Post, error) {
	var updatedPosts []Post
	err := database.Database.Model(&updatedPosts).Clauses(clause.Returning{}).Where("id = ?", id).Updates(post).Error
	if err != nil {
		return nil, err
	}
	updatedPost := &updatedPosts[0]
	return updatedPost, nil
}

func DeletePost(id string) (error) {
	err := database.Database.Delete(&Post{}, id).Error
	return err
}