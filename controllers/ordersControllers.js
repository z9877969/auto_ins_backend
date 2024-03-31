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
  const { password, vcl } = req.query;

  try {
    const data = await api.checkOrderPasswordApi({
      contractId,
      customer: password,
    });
    if (data !== orderCheck.status.OK) {
      throw createError(400, error.message);
    }
    if (vcl) {
      const data = await api.checkCustomOrderPasswordApi(vcl);
      if (data !== orderCheck.status.OK) {
        throw createError(400, error.message);
      }
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

  try {
    const data = await api.updateOrderStatusApi({
      contractId: contractId || epoliceId,
      state: orderCheck.state.EMITTED,
    });

    if (
      data.id.toString() !== contractId.toString() &&
      data.id.toString() !== epoliceId.toString()
    ) {
      throw createError(400, 'Поліс еОСЦПВ не укладено');
    }

    if (vclId) {
      const data = await api.updateOrderStatusApi({
        contractId: vclId,
        state: orderCheck.state.EMITTED,
      });
      if (data.id.toString() !== vclId.toString()) {
        throw createError(400, 'Поліс ДЦВ не укладено');
      }
    }

    res.redirect(EMMITED_ORDER_REDIRECT_URL);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrderPassword,
  checkOrderPassword,
  updateOrderToRequestStatus,
  updateOrderToEmmitAndRedirect,
};
