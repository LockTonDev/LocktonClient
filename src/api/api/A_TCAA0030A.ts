import api from '../common/APIService';

export default {
  /**
   * 보험료 테이블 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getDBSelInsuranceRate(params: any) {
    return await api.commonService.post('/CAA/CAA0030A/rate', { params });
  },

  /**
   * 보험료 테이블 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getDBSelStatus() {
    return await api.commonService.post('/CAA/CAA0030A/status');
  },

  /**
   * 보험 할인할증 정보 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getSaleRtNDupInfo(params: any) {
    return await api.commonService.post('/CAA/CAA0030A/getSaleRtNDupInfo', {
      params
    });
  },
  /**
   * 보험 상세 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getDBSel(params: any, isAdmin: boolean = false) {
    if (isAdmin) {
      return await api.authService.post('/CAA/CAA0030A/get', { params });
    } else {
      return await api.commonService.post('/CAA/CAA0030A/get', { params });
    }
  },
  /**
   * 보험료 테이블 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getDBSelList(params: any) {
    return await api.commonService.post('/CAA/CAA0030A', { params });
  },
  /**
   * 보험료 테이블 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async setDBIns(params: any) {
    return await api.commonService.post('/CAA/CAA0030A/set', { params });
  },
  /**
   * 보험료 테이블 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async setDBUpd(params: any) {
    return await api.commonService.post(
      `/CAA/CAA0030A/set/${params.insurance_uuid}`,
      {
        params
      }
    );
  },
  /**
   * 보험 상세 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getDBSelHistory(params: any, isAdmin: boolean = false) {
    if (isAdmin) {
      return await api.authService.post('/CAA/CAA0030A/get/history', {
        params
      });
    } else {
      return await api.commonService.post('/CAA/CAA0030A/get/history', {
        params
      });
    }
  },
};
