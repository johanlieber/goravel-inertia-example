package routes

import (
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/facades"
	inertia "github.com/romsar/gonertia"
	client "goravel/app/http"
	www "net/http"
)

func Web() {
	facades.Route().Get("/", func(ctx http.Context) http.Response {
		client.RenderInertia(ctx, "Index", inertia.Props{"user": "bob"})
		return nil
	})
	facades.Route().StaticFS("build", www.Dir("./public/build"))
}
