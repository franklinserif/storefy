/**
 * order services related to crud operation
 * @module services/order
 */

import { Order } from "../db/entity/Order.entity";
import { IOrder } from "../index.type";
import UserService from "./user.service";
import boom from "@hapi/boom";

/**
 * user service
 */
const userService = new UserService();

export default class OrderService {
  async findAll(userId: string) {
    const user = await userService.findOne(userId);

    return user.orders;
  }

  /**
   * find an order by id
   * @param id
   * @returns Promise
   */
  async findOne(id: string) {
    const order = await Order.findOne({ where: { id } });

    if (!order) throw boom.notFound();

    return order;
  }

  /**
   * create a new order
   * @param data
   * @returns Promise
   */
  async create(userId: string, data: Omit<IOrder, "id">) {
    const user = await userService.findOne(userId);
    const order = Order.create(data);

    const newOrder = await order.save();
    user.orders.push(newOrder);
    await user.save();

    return newOrder;
  }

  /**
   * update order
   * @param id
   * @param data
   * @returns Promise
   */
  async update(id: string, data: Partial<IOrder>) {
    const order = await Order.update(id, data);

    if (!order.affected) throw boom.notFound();

    return order;
  }

  /**
   * delete a order
   * @param id
   * @returns Promise
   */
  async delete(id: string) {
    const order = await this.findOne(id);

    await order.remove();

    return true;
  }
}
