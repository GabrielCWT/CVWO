package model

import (
	"cvwo_server/database"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"html"
	"strings"
)

type User struct {
	gorm.Model
	Username string `gorm:"not null;unique" json:"username"`
	Password string `gorm:"not null;" json:"-"`
}

func (user *User) Save() (*User, error) {
	err := database.Database.Create(&user).Error
	if err != nil {
		return &User{}, err
	}
	return user, nil
}

// Hook to hash password before saving
func (user *User) BeforeSave(*gorm.DB) error{
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(passwordHash)
	user.Username = html.EscapeString(strings.TrimSpace(user.Username))
	return nil
}

func (user *User) ValidatePassword(password string) error {
	return bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
}

func FindByUsername(username string) (User, error) {
	var user User
	err := database.Database.Where("username = ?", username).First(&user).Error
	if err != nil {
		return User{}, err
	}
	return user, nil
}

func FindByID(id uint) (User, error) {
	var user User
	err := database.Database.Where("id = ?", id).First(&user).Error
	if err != nil {
		return User{}, err
	}
	return user, nil
}