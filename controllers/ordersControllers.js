const { ordersApi: api } = require('../services');
const { orderCheck, FRONT_PATHES, ROUTES } = require('../constants');
const { createError } = require('../helpers');
const { ctrlWrapper } = require('../decorators');
const { queryString } = require('../helpers');
const envConfigs = require('../envConfigs');

const getServerRedirectedLink = ({ query, path }) => {
  return envConfigs.BACK_URL + '/orders' + path + '?' + query;
};

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
    epolicyContractId: 17470615,
    vclContractId: 17470616,
    epolicyOrderId: CDAZLD5
    vclOrderId: WEMCUD3,
    epolicyAmount: 265.00,
    vclAmount: 265.00,
    shoperEmail: 'b@mail.com'
  }
  */
  const {
    epolicyAmount,
    vclAmount,
    epolicyOrderId,
    vclOrderId,
    epolicyContractId,
    vclContractId,
    shoperEmail,
  } = req.query;

  const query = queryString.stringify({
    epolicyOrderId,
    ...(vclOrderId && { vclOrderId }),
    epolicyContractId,
    ...(vclContractId && { vclContractId }),
    epolicyAmount,
    ...(vclAmount && { vclAmount }),
  });

  const successUrl = getServerRedirectedLink({
    query,
    path: ROUTES.ORDERS.PAYMENT_SUCCESS,
  });

  const epolicyLink = await api.createPaymentLinkApi({
    billAmount: epolicyAmount,
    orderId: epolicyOrderId,
    shoperEmail,
    successUrl,
    description: 'Оплата основної пропозиції',
  });

  let vclLink = '';

  if (vclContractId && vclOrderId) {
    const successUrl = getServerRedirectedLink({
      query: queryString.stringify({ paymentLink: epolicyLink }),
      path: ROUTES.ORDERS.VCL_REDIRECT,
    });
    vclLink = await api.createPaymentLinkApi({
      billAmount: vclAmount,
      orderId: vclOrderId,
      shoperEmail,
      successUrl,
      description: 'Оплата додаткової пропозиції',
    });

    await api.createContractPaymentApi({
      contractId: vclContractId,
      amount: vclAmount,
      orderId: vclOrderId,
      linkInvoice: vclLink,
    });
  }

  await api.createContractPaymentApi({
    contractId: epolicyContractId,
    amount: epolicyAmount,
    orderId: epolicyOrderId,
    linkInvoice: epolicyLink,
  });

  res.json({
    linkPayment: vclLink ? vclLink : epolicyLink,
  });
};

const redirectVcl = (req, res) => {
  const { paymentLink } = req.query;

  res.redirect(paymentLink);
};

const confirmContractPayment = async (req, res) => {
  const {
    epolicyOrderId,
    vclOrderId,
    epolicyContractId,
    vclContractId,
    epolicyAmount,
    vclAmount,
  } = req.query;

  /* 
    confirmContractPaymentApi props:
      contractId=17470615
      orderId=WEMCUD3
      amount=265.00
      payDate=2025-01-07T12:15:56
      commission=3.45
  */
  if (vclOrderId && vclAmount) {
    const { payDate: vclPayDate, commission: vclComission } =
      await api.checkPaymentApi({ orderId: vclOrderId });

    await api.confirmContractPaymentApi({
      contractId: vclContractId,
      orderId: vclOrderId,
      amount: vclAmount,
      commission: vclComission,
      payDate: vclPayDate,
    });
  }

  const { payDate: epolicyPayDate, commission: epolicyComission } =
    await api.checkPaymentApi({ orderId: epolicyOrderId });

  await api.confirmContractPaymentApi({
    contractId: epolicyContractId,
    orderId: epolicyOrderId,
    amount: epolicyAmount,
    commission: epolicyComission,
    payDate: epolicyPayDate,
  });

  const query = queryString.stringify({
    orderId: epolicyOrderId,
    contractId: epolicyContractId,
  });

  res.redirect(envConfigs.FRONT_URL + FRONT_PATHES.ORDER_EMMITED + '?' + query);
};

module.exports = {
  getOrderPassword: ctrlWrapper(getOrderPassword),
  checkOrderPassword: ctrlWrapper(checkOrderPassword),
  updateOrderToRequestStatus: ctrlWrapper(updateOrderToRequestStatus),
  createContractPayment: ctrlWrapper(createContractPayment),
  confirmContractPayment: ctrlWrapper(confirmContractPayment),
  redirectVcl: ctrlWrapper(redirectVcl),
};
