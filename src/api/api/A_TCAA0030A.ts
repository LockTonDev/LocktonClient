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
     * 
  /**
   * 보험료 테이블 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getDBSel(params: any) {
    return await api.commonService.get(
      `/CAA/CAA0030A/${params.insurance_uuid}`
    );
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
      `/CAA/CAA0030A/set/:${params.insurance_uuid}`,
      {
        params
      }
    );
  }
};
