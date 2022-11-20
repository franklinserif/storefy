/**
 * Payment service related to payment crud operation
 * @module utils/payment
 */

import { AppDataSource } from "../data-source";
import { Payment } from "../db/entity/Payment";
import { IPayment } from "../index.type";
import boom from "@hapi/boom";
import UserService from "./user.service";

/**
 * User service for crud operations
 * @const
 */
const userService = new UserService();

export default class PaymentService {
  /**
   * Create a payment
   * @async
   * @param userId
   * @param data
   * @returns Promise
   */
  async create(userId: string, data: Omit<IPayment, "id">) {
    const user = await userService.findOne(userId);
    const payment = Payment.create(data as Payment);

    await payment.save();
    user.payment = payment;
    await user.save();

    return payment;
  }

  /**
   * Find all a payment
   * @async
   * @returns Promise
   */
  async findAll() {
    const payment = await Payment.find();

    return payment;
  }

  /**
   * Find payment by id
   * @async
   * @param id payment id
   * @throws error not found
   * @returns Promise
   */
  async findOne(id: string) {
    const payment = await Payment.findOneBy({ id });

    if (!payment) throw boom.notFound();

    return payment;
  }

  /**
   * Update payment data
   * @async
   * @param id payment id
   * @param data to update
   * @throws error not found
   * @returns Promise
   */
  async update(id: string, data: Partial<IPayment>) {
    const updatedPayment = await Payment.update(id, data);

    if (updatedPayment.affected === 0) throw boom.notFound();

    return { message: "payment updated" };
  }

  /**
   * Remove payment from db
   * @async
   * @param id payment id
   * @throws error not found
   * @returns Promise
   */
  async delete(id: string) {
    const rta = await AppDataSource.createQueryBuilder()
      .delete()
      .from(Payment)
      .where("id = :id", { id })
      .execute();

    if (rta.affected === 0) throw boom.notFound();

    return true;
  }
}
