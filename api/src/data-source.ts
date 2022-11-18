import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./db/entity/User";
import { Category } from "./db/entity/Category";
import { Payment } from "./db/entity/Payment";
import { ProductRating } from "./db/entity/ProductRating";
import { Promotion } from "./db/entity/Promotion";
import { Review } from "./db/entity/Review";
import { ShoppingCart } from "./db/entity/ShoppingCart";
import { ShoppingCartItem } from "./db/entity/ShoppingCartItem";
import { Product } from "./db/entity/Product";
import { ProductModel } from "./db/entity/ProductModel";
import { WishList } from "./db/entity/WishList";
import { Variation } from "./db/entity/Variation";
import { VariationOption } from "./db/entity/VariationOption";
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
