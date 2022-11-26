import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./db/entity/User.entity";
import { Category } from "./db/entity/Category.entity";
import { Payment } from "./db/entity/Payment.entity";
import { ProductRating } from "./db/entity/ProductRating.entity";
import { Promotion } from "./db/entity/Promotion.entity";
import { Review } from "./db/entity/Review.entity";
import { ShoppingCart } from "./db/entity/ShoppingCart.entity";
import { ShoppingCartItem } from "./db/entity/ShoppingCartItem.entity";
import { Product } from "./db/entity/Product.entity";
import { ProductModel } from "./db/entity/ProductModel.entity";
import { WishList } from "./db/entity/WishList.entity";
import { Variation } from "./db/entity/Variation.entity";
import { VariationOption } from "./db/entity/VariationOption.entity";
import CONFIG from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "storefy-postgres-1",
  port: 5432,
  username: CONFIG.DB_USER,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Category,
    Payment,
    ProductRating,
    Promotion,
    Review,
    ShoppingCart,
    ShoppingCartItem,
    Product,
    ProductModel,
    WishList,
    Variation,
    VariationOption,
  ],
  migrations: [],
  subscribers: [],
});
