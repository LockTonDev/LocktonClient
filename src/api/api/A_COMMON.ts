import api from '../common/APIService';

export default {
  /**
   * 코드조회
   *
   * @param userId
   * @param password
   * @returns Auth 데이터
   */
  async getCode(grpCd: string) {
    const params = { grp_cd: grpCd };
    return await api.commonService.post('/COMMON/code/get', { params });
  },

    /**
   * 코드조회
   *
   * @param userId
   * @param password
   * @returns Auth 데이터
   */
  async getCodeALL() {
    return await api.commonService.post('/COMMON/code/all');
  }
};
