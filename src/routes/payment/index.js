const { Router } = require('express');
const paymentRouter = Router();

const {
  handlePlaceOrder,
  handleSuccessfulPayment,
  handleFailurePayment,
  handlePendingPayment,
  handleSubscriptionLink,
  handleGiftSubscriptionLink,
  handleSuccessfulGiftSubscription,
} = require('../../handlers');
const verifySession = require('../../middlewares/verifySession');
const handleSuccessfulSubscription = require('../../handlers/payment/handleSuccessfulSubscription');

paymentRouter.post('/placeOrder', verifySession, handlePlaceOrder);
paymentRouter.post('/subscriptionOrder', verifySession, handleSubscriptionLink);
paymentRouter.get('/successfulSubscription', handleSuccessfulSubscription);
paymentRouter.get('/success', handleSuccessfulPayment);
paymentRouter.get('/successful', handlePendingPayment);
paymentRouter.get('/failure', handleFailurePayment);
paymentRouter.get('/pending', handlePendingPayment);
paymentRouter.post('/giftSubscriptionLink', handleGiftSubscriptionLink);
paymentRouter.get('/successfulGift', handleSuccessfulGiftSubscription);

module.exports = paymentRouter;
