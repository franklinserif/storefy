/**
 * Payment service related to payment crud operation
 * @module utils/payment
 */

import { Payment } from "../db/entity/Payment";
import { IPayment } from "../index.type";
import boom from "@hapi/boom";

export default class PaymentService {
  /**
   * Create a payment
   * @async
   * @param {Omit<IPayment, "id">}
   * @returns {Promise<IPayment>}
   */
  async create(data: Omit<IPayment, "id">) {
    const payment = await Payment.create(data);

    return payment;
  }

  /**
   * Find all a payment
   * @async
   * @returns {Promise<IPayment>}
   */
  async findAll() {
    const payment = await Payment.find();

    return payment;
  }

  /**
   * Find payment by id
   * @async
   * @param {string} id payment id
   * @returns {Promise<IPayment>}
   */
  async findOne(id: string) {
    const payment = await Payment.findOneBy({ id });

    if (!payment) throw boom.notFound();

    return payment;
  }

  /**
   * Update payment data
   * @async
   * @param {string} id payment id
   * @param {Partial<IPayment>} data to update
   * @returns {Promise<IPayment>}
   */
  async update(id: string, data: Partial<IPayment>) {
    const updatedPayment = await Payment.update(id, data);

    if (!updatedPayment) throw boom.notFound();

    return updatedPayment;
  }

  /**
   * Remove payment from db
   * @async
   * @param {string} id payment id
   * @returns {Promise<boolean>}
   */
  async delete(id: string) {
    const payment = await this.findOne(id);

    payment.remove();

    return true;
  }
}
