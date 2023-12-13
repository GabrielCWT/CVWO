package model
import "gorm.io/gorm"

type Post struct {
	gorm.Model
	Title string `gorm:"not null;type:text" json:"title"`
	Content string `gorm:"not null;type:text" json:"content"`
	UserID uint
}