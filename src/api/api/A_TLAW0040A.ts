import api from '../common/APIService';

/**
 * TLAW0040A / 법무사_보험변경관리
 */
export default {
  /**
   * 목록 조회
   *
   * @param params
   * @returns
   */
  async getDBSelList(params: any) {
    return await api.commonService.post('/LAW/LAW0040A', { params });
  },

  /**
   * 상세 조회
   *
   * @param params
   * @returns
   */
  async getDBSel(params: any) {
    return await api.commonService.get(`/LAW/LAW0040A/${params.apply_no}`);
  },

  /**
   * 입력
   *
   * @param params
   * @returns
   */
  async setDBIns(params: any) {
    return await api.commonService.post('/LAW/LAW0040A/set', { params });
  },

  /**
   * 수정
   *
   * @param apply_no
   * @param params
   * @returns
   */
  async setDBUpd(params: any) {
    return await api.commonService.post(
      `/LAW/LAW0040A/set/${params.apply_no}`,
      { params }
    );
  },

  /**
   * 수정
   *
   * @param params
   * @returns
   */
  async setDBDel(params: any) {
    return await api.commonService.get(`/LAW/LAW0040A/del/${params.apply_no}`);
  }
};
