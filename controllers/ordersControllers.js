const { ordersApi: api } = require('../services');
const { orderCheck, FRONT_PATHES } = require('../constants');
const { createError } = require('../helpers');
const { ctrlWrapper } = require('../decorators');
const { default: queryString } = require('query-string');
const envConfigs = require('../envConfigs');

const getOrderPassword = async (req, res) => {
  const { contractId } = req.params;
  const data = await api.getOrderPasswordApi(contractId);
  res.json(data);
};

const checkOrderPassword = async (req, res) => {
  const { contractId } = req.params;
  const { password } = req.query;

  const data = await api.checkOrderPasswordApi({
    contractId,
    customer: password,
  });
  if (data !== orderCheck.status.OK) {
    throw createError(400, 'Epolicy order check status is failed');
  }
  res.json(data);
};

const updateOrderToRequestStatus = async (req, res) => {
  const { contractId } = req.params;
  const { epolicy: epolicyId, vcl: vclId } = req.query;

  await api.updateOrderStatusApi({
    contractId: epolicyId,
    state: orderCheck.state.REQUEST,
  });
  if (vclId) {
    await api.updateOrderStatusApi({
      contractId: vclId,
      state: orderCheck.state.REQUEST,
    });
  }
  res.json({ contractId });
};

const createContractPayment = async (req, res) => {
  /* 
  req.query -> {
    contractId: 17470615,
    orderId: WEMCUD3,
    amount: 265.00,
    shoperEmail: 'b@mail.com'
  }
  */
  const { amount, orderId, shoperEmail, contractId } = req.query;
  const linkPayment = await api.createPaymentLinkApi({
    billAmount: amount,
    shoperEmail,
    orderId,
    contractId,
  });
  await api.createContractPaymentApi({
    ...req.query,
    linkInvoice: linkPayment,
  });

  res.json({
    linkPayment,
    amount,
    orderId,
  });
};

const confirmContractPayment = async (req, res) => {
  // req.query -> { contractId, amount, orderId }
  const { orderId, contractId } = req.query;

  const { payDate, commission } = await api.checkPaymentApi({ orderId });

  /* 
    confirmContractPaymentApi props:
      contractId=17470615
      orderId=WEMCUD3
      amount=265.00
      payDate=2025-01-07T12:15:56
      commission=3.45
  */
  await api.confirmContractPaymentApi({
    ...req.query,
    commission,
    payDate,
  });

  const query = queryString.stringify({ orderId, contractId });

  res.redirect(envConfigs.FRONT_URL + FRONT_PATHES.ORDER_EMMITED + '?' + query);
};

module.exports = {
  getOrderPassword: ctrlWrapper(getOrderPassword),
  checkOrderPassword: ctrlWrapper(checkOrderPassword),
  updateOrderToRequestStatus: ctrlWrapper(updateOrderToRequestStatus),
  createContractPayment: ctrlWrapper(createContractPayment),
  confirmContractPayment: ctrlWrapper(confirmContractPayment),
};

// const updateOrderToEmmitAndRedirect = async (req, res) => {
//   const { contractId } = req.params;
//   const {
//     epolicy: epoliceId,
//     vcl: vclId,
//     userId,
//     salePointId,
//     orderId,
//     payDate,
//     amount,
//   } = req.query;

//   await api.confirmContractPaymentApi({
//     contractId,
//     amount,
//     orderId,
//     payDate,
//   });
//   if (vclId) {
//     const data = await api.updateOrderStatusApi({
//       contractId: vclId,
//       state: orderCheck.state.SIGNED,
//     });

//     if (data.id.toString() !== vclId.toString()) {
//       throw createError(400, 'Поліс ДЦВ не укладено');
//     }
//   }

//   const data = await api.updateOrderStatusApi({
//     contractId: contractId || epoliceId,
//     state: orderCheck.state.EMITTED,
//   });

//   if (
//     data.id.toString() !== contractId.toString() &&
//     data.id.toString() !== epoliceId.toString()
//   ) {
//     throw createError(400, 'Поліс еОСЦПВ не укладено');
//   }
//   res.redirect(EMMITED_ORDER_REDIRECT_URL + `?${userId}&${salePointId}`);
// };
