import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { protect } from "../middleware/auth.js";
import { CartItemsType, ShippingFormInputs } from "@repo/types";

type PaymentDetails = {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
};

type ProcessPaymentBody = {
  paymentDetails: PaymentDetails;
  shippingDetails: ShippingFormInputs;
};

export const sessionRouter = (fastify: FastifyInstance) => {
  // Process payment endpoint
  fastify.post("/process", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const { paymentDetails, shippingDetails } =
        req.body as ProcessPaymentBody;

      // Validate payment details
      if (
        !paymentDetails ||
        !paymentDetails.cardNumber ||
        !paymentDetails.cardName ||
        !paymentDetails.expiryDate ||
        !paymentDetails.cvv
      ) {
        return reply.status(400).send({ error: "Invalid payment details" });
      }

      // Validate shipping details
      if (
        !shippingDetails ||
        !shippingDetails.name ||
        !shippingDetails.email ||
        !shippingDetails.address
      ) {
        return reply.status(400).send({ error: "Invalid shipping details" });
      }

      // Simulate payment processing
      // In a real application, you would integrate with a payment gateway here
      const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Log the payment (in production, save to database)
      console.log("Payment processed:", {
        paymentId,
        cardLast4: paymentDetails.cardNumber.slice(-4),
        cardName: paymentDetails.cardName,
        shippingTo: shippingDetails.name,
        email: shippingDetails.email,
        address: shippingDetails.address,
        city: shippingDetails.city,
      });

      return reply.send({
        success: true,
        paymentId,
        message: "Payment processed successfully",
      });
    } catch (error) {
      console.error("Payment processing error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to process payment";
      return reply.status(500).send({ error: errorMessage });
    }
  });

  // Get payment status endpoint
  fastify.get(
    "/:payment_id",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const { payment_id } = req.params as { payment_id: string };

        // In a real application, you would fetch from database
        return reply.send({
          paymentId: payment_id,
          status: "completed",
          message: "Payment completed successfully",
        });
      } catch (error) {
        console.error("Error fetching payment status:", error);
        return reply
          .status(500)
          .send({ error: "Failed to fetch payment status" });
      }
    }
  );
};
