package model

type AuthenticationInput struct {
	Username string `form:"username" binding:"required"`
	Password string `form:"password" binding:"required"`
}