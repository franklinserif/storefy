/**
 * Payment service related to payment crud operation
 * @module services/payment
 */

import { AppDataSource } from "../data-source";
import { Payment } from "../db/entity/Payment.entity";
import { IPayment } from "../index.type";
import boom from "@hapi/boom";

export default class PaymentService {
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
