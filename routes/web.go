package routes

import (
	"github.com/goravel/framework/facades"
	"goravel/app/http/controllers"
	www "net/http"
)

func Web() {
	home := controllers.NewHomeController()
	facades.Route().Get("/", home.Index)
	facades.Route().StaticFS("build", www.Dir("./public/build"))
	facades.Route().StaticFile("favicon.ico", "./public/favicon.ico")
}
