/**
 * order services related to crud operation
 * @module services/order
 */

import { Order } from "../db/entity/Order.entity";
import { IOrder } from "../index.type";
import boom from "@hapi/boom";

export default class OrderService {
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
  async create(data: Omit<IOrder, "id">) {
    const order = Order.create(data);

    const newOrder = await order.save();

    return newOrder;
  }

  /**
   * update order
   * @param id
   * @param data
   * @returns Promise
   */
  async update(id: string, data: Omit<IOrder, "id">) {
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
