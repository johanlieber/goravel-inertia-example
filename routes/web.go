package routes

import (
	"fmt"

	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/facades"
	www "net/http"
	// "github.com/goravel/framework/support"
	inertia "github.com/romsar/gonertia"
)

func Web() {
	facades.Route().Get("/", func(ctx http.Context) http.Response {
		// return ctx.Response().View().Make("welcome.tmpl", map[string]any{
		// 	"version": support.Version,
		// })
		i, _ := facades.App().Make("inertia")
		tmp := i.(*inertia.Inertia)
		err := tmp.Render(ctx.Response().Writer(), ctx.Request().Origin(), "Index")
		if err != nil {
			fmt.Println("it failed!")
		}
		return nil
	})
	facades.Route().StaticFS("build", www.Dir("./public/build"))
}
