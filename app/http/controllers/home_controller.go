package controllers

import (
	"github.com/goravel/framework/contracts/http"
	inertia "github.com/romsar/gonertia"
	client "goravel/app/http"
)

type HomeController struct {
	//Dependent services
}

func NewHomeController() *HomeController {
	return &HomeController{
		//Inject services
	}
}

func (r *HomeController) Index(ctx http.Context) http.Response {
	client.RenderInertia(ctx, "Index", inertia.Props{"user": "bob"})
	return nil
}
