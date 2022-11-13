/**
 * main module for routes
 * @module routes/index
 */

import express, { Application, Express } from "express";

import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";
import paymentRoutes from "./payment.routes";
import productRoutes from "./product.routes";
import promotionRoutes from "./promotion.routes";
import reviewRoutes from "./review.routes";
import shoppingCartRoutes from "./shoppingCart.routes";
import shoppingCartItemRoutes from "./shoppingCartItems.routes";
import userRoutes from "./user.routes";
import wishListRoutes from "./wishList.routes";

/**
 * configure all app routes and mount them in the main app
 * @param app
 */
export default function routeInit(app: Application) {
  /**
   * express router
   * @const
   */
  const router = express.Router();

  router.use("/auth", authRoutes);
  router.use("/category", categoryRoutes);
  router.use("/payment", paymentRoutes);
  router.use("/product", productRoutes);
  router.use("/promotion", promotionRoutes);
  router.use("/review", reviewRoutes);
  router.use("/shoppingCart", shoppingCartRoutes);
  router.use("/shoppingCartItem", shoppingCartItemRoutes);
  router.use("/user", userRoutes);
  router.use("/wishList", wishListRoutes);

  app.use("/api/v1", router);
}
