package helper

import (
	"os"
	"errors"
	"fmt"
	"time"
	"cvwo_server/model"
	"github.com/golang-jwt/jwt/v5"
	"github.com/gin-gonic/gin"
)

func ValidateJWT(ctx *gin.Context) error {
	jwtToken, err := getToken(ctx)
	if err != nil {
		return err
	}
	if claims, ok := jwtToken.Claims.(jwt.MapClaims); ok && jwtToken.Valid {
		if float64(claims["exp"].(float64)) < float64(time.Now().Unix()) {
			return nil
		} else {
			return errors.New("Error token expired")
		}
	} else {
		return errors.New("Error invalid token")
	}
}



func getToken(ctx *gin.Context) (*jwt.Token, error) {
	jwtTokenString, err := ctx.Cookie("Authorisation")

	if err != nil {
		return nil, errors.New("Error retrieving token")
	}

	jwtToken, err := jwt.Parse(jwtTokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("JWT_SECRET")), nil
})
return jwtToken, err
}