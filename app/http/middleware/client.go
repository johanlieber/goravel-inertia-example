package middleware

import (
	// "fmt"

	"github.com/goravel/framework/contracts/http"
	// "github.com/goravel/framework/facades"
	// inertia "github.com/romsar/gonertia"
)

func InertiaMiddleware() http.Middleware {
	return func(ctx http.Context) {
		// i, err := facades.App().Make("inertia")
		// if err != nil {
		// 	fmt.Println("error! wooo")
		// }
		// tmp := i.(*inertia.Inertia)
		// tmp.Middleware(facades.Route())
		ctx.Request().Next()
	}
}
