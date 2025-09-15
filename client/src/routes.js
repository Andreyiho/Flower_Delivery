import { SHOP_ROUTE, ORDER_ROUTE } from "./untils/consts";
import Shop from "./pages/shop";
import Order from "./pages/order";

export  const publicRoutes = [
{
     path: SHOP_ROUTE, 
     component: Shop
},
{
    path: ORDER_ROUTE + '/:id', 
    component: Order
}

]