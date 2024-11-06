package http

import (
	"fmt"
	"github.com/goravel/framework/contracts/http"
	"github.com/goravel/framework/facades"
	inertia "github.com/romsar/gonertia"
)

func RenderInertia(ctx http.Context, page string, props inertia.Props) {
	i, _ := facades.App().Make("inertia")
	tmp := i.(*inertia.Inertia)
	err := tmp.Render(ctx.Response().Writer(), ctx.Request().Origin(), page, props)
	if err != nil {
		fmt.Println("it failed!")
	}
}
