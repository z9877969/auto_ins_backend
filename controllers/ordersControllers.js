const { ordersApi: api } = require('../services');
const { orderCheck } = require('../constants');
const { createError } = require('../helpers');
const { EMMITED_ORDER_REDIRECT_URL } = require('../envConfigs');

const getOrderPassword = async (req, res, next) => {
  const { contractId } = req.params;
  try {
    const data = await api.getOrderPasswordApi(contractId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const checkOrderPassword = async (req, res, next) => {
  const { contractId } = req.params;
  const { password } = req.query;

  try {
    const data = await api.checkOrderPasswordApi({
      contractId,
      customer: password,
    });
    if (data !== orderCheck.status.OK) {
      throw createError(400, 'Epolicy order check status is failed');
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const updateOrderToRequestStatus = async (req, res, next) => {
  const { contractId } = req.params;
  const { epolicy: epolicyId, vcl: vclId } = req.query;

  try {
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
  } catch (error) {
    next(error);
  }
};

const updateOrderToEmmitAndRedirect = async (req, res, next) => {
  const { contractId } = req.params;
  const { epolicy: epoliceId, vcl: vclId } = req.query;

  console.log('updateOrderToEmmitAndRedirect -Start');

  try {
    if (vclId) {
      console.log('update to SIGNED VCL order -Start');
      const data = await api.updateOrderStatusApi({
        contractId: vclId,
        state: orderCheck.state.SIGNED,
      });
      console.log('vcl response data :>> ', data);
      if (data.id.toString() !== vclId.toString()) {
        throw createError(400, 'Поліс ДЦВ не укладено');
      }
      console.log('update to SIGNED VCL order -Start');
    }

    const data = await api.updateOrderStatusApi({
      contractId: contractId || epoliceId,
      state: orderCheck.state.EMITTED,
    });
    console.log('epolicy response data :>> ', data);

    if (
      data.id.toString() !== contractId.toString() &&
      data.id.toString() !== epoliceId.toString()
    ) {
      throw createError(400, 'Поліс еОСЦПВ не укладено');
    }
    console.log('epolicy response data -End ');
    console.log('updateOrderToEmmitAndRedirect -End');
    res.redirect(EMMITED_ORDER_REDIRECT_URL);
  } catch (error) {
    console.log('error :>> ', error.message);
    next(error);
  }
};

module.exports = {
  getOrderPassword,
  checkOrderPassword,
  updateOrderToRequestStatus,
  updateOrderToEmmitAndRedirect,
};
