/**
 * order item service related to crud operation
 * @module services/orderItem
 */

import { OrderItem } from "../db/entity/OrderItem.entity";
import { IOrderItem } from "../index.type";
import OrderService from "./order.service";
import boom from "@hapi/boom";

/**
 * order service
 */
const orderService = new OrderService();

export default class OrderItemService {
  /**
   * find a order item by id
   * @param id
   * @returns Promise
   */
  async findOne(id: string) {
    const orderItem = await OrderItem.findOne({ where: { id } });

    if (!orderItem) throw boom.notFound();

    return orderItem;
  }

  /**
   *  create a new order item
   * @param orderId
   * @param data
   * @returns Promise
   */
  async create(orderId: string, data: Omit<IOrderItem, "id">) {
    const order = await orderService.findOne(orderId);
    const orderItem = OrderItem.create(data);
    const newOrderItem = await orderItem.save();

    order.orderItems.push(newOrderItem);
    await order.save();

    return newOrderItem;
  }

  /**
   * update order item
   * @param id
   * @param data
   * @returns
   */
  async update(id: string, data: Partial<IOrderItem>) {
    const orderItemUpdated = await OrderItem.update(id, data);

    if (orderItemUpdated?.affected) throw boom.notFound();

    return orderItemUpdated;
  }

  /**
   * delete a order item
   * @param id
   * @returns Promise
   */
  async delete(id: string) {
    const orderItem = await this.findOne(id);

    await orderItem.remove();

    return true;
  }
}
