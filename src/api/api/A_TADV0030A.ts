import api from '../common/APIService';

export default {
  /**
   * 보험료 테이블 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getDBSelInsuranceRate(params: any) {
    return await api.commonService.post('/ADV/ADV0030A/rate', { params });
  },

  /**
   * 보험료 테이블 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getDBSelStatus() {
    return await api.commonService.post('/ADV/ADV0030A/status');
  },

  /**
   * 보험 할인할증 정보 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getSaleRtNDupInfo(params: any) {
    return await api.commonService.post('/ADV/ADV0030A/getSaleRtNDupInfo', {
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
      return await api.authService.post('/ADV/ADV0030A/get', { params });
    } else {
      return await api.commonService.post('/ADV/ADV0030A/get', { params });
    }
  },

  /**
   * 보험 상세 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getDBSelHistory(params: any, isAdmin: boolean = false) {
    if (isAdmin) {
      return await api.authService.post('/ADV/ADV0030A/get/history', {
        params
      });
    } else {
      return await api.commonService.post('/ADV/ADV0030A/get/history', {
        params
      });
    }
  },
  /**
   * 보험료 테이블 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getDBSelList(params: any) {
    return await api.commonService.post('/ADV/ADV0030A', { params });
  },
  /**
   * 보험료 테이블 입력
   *
   * @param params.insurance_type
   * @returns
   */
  async setDBIns(params: any) {
    return await api.commonService.post('/ADV/ADV0030A/set', { params });
  },
  /**
   * 보험 수정
   *
   * @param params.insurance_type
   * @returns
   */
  async setDBUpd(params: any) {
    return await api.commonService.post(
      `/ADV/ADV0030A/set/:${params.insurance_uuid}`,
      {
        params
      }
    );
  }
};
