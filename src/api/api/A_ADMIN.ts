import api from '../common/APIService';

export default {
  /** ============================================================================
   *  [보험변경DB]
   *  ============================================================================
   */
  async setApplyInsurance(params: any) {
    return await api.authService.post('/ADM/TAX/APPLY/set', { params });
  },
  async getApplyInsurance(params: any) {
    return await api.authService.post('/ADM/TAX/APPLY/get', { params });
  },

  async setApplyADVInsurance(params: any) {
    return await api.authService.post('/ADM/ADV/APPLY/set', { params });
  },
  async getApplyADVInsurance(params: any) {
    return await api.authService.post('/ADM/ADV/APPLY/get', { params });
  },
  /** ============================================================================
   *  [전문인명단DB]
   *  ============================================================================
   */
  async setUserRegNo(params: any) {
    return await api.authService.post('/ADM/USER_REG_NO/set', { params });
  },
  async getUserRegList(params: any) {
    return await api.authService.post('/ADM/USER_REG_NO/gets', { params });
  },

  /** ============================================================================
   *  [게시판DB]
   *  ============================================================================
   */
  async getBoardInfo(params: any) {
    return await api.authService.post('/ADM/BOARD/get', { params });
  },
  async getBoardList(params: any) {
    return await api.authService.post('/ADM/BOARD/gets', { params });
  },
  async setInsertBoard(params: any) {
    return await api.authService.post('/ADM/BOARD/ins', { params });
  },
  async setUpdateBoard(params: any) {
    return await api.authService.post('/ADM/BOARD/udt', { params });
  },
  async setDeleteBoard(params: any) {
    return await api.authService.post('/ADM/BOARD/del', { params });
  },

  async setBoardInfo(params: any) {
    return await api.authService.post('/ADM/BOARD/set', { params });
  },

  /** ============================================================================
   *  [회원DB]
   *  ============================================================================
   */
  async setUserLoginBlockReset(params: any) {
    return await api.authService.post('/ADM/USER/setUserLoginBlockReset', { params });
  },
  async getUserInfo(params: any) {
    return await api.authService.post('/ADM/USER/get', { params });
  },
  async getUserList(params: any) {
    return await api.authService.post('/ADM/USER/gets', { params });
  },

  async setUserInfo(params: any) {
    return await api.authService.post('/ADM/USER/set', { params });
  },

  //회원 엑셀 업로드
  async setUsersTemp(params: any) {
    return await api.authService.post('/ADM/COM/setUsersTemp', { params });
  },

  /** ============================================================================
   *  [보험DB]
   *  ============================================================================
   */
  async getTAXRate(params: any) {
    return await api.authService.post('/ADM/TAX/rate', { params });
  },
  async setTAX(params: any) {
    return await api.authService.post('/ADM/TAX/set', { params });
  },

  async setACCSUser(params: any) {
    return await api.authService.post('/ADM/ACC/renewal/sets', { params });
  },

  async getTAX(params: any) {
    return await api.authService.post('/ADM/TAX/get', { params });
  },

  async getTAXS(params: any) {
    return await api.authService.post('/ADM/TAX/gets', { params });
  },
  async setTAX_TRX(params: any) {
    return await api.authService.post('/ADM/TAX/TRX/set', { params });
  },

  async getTAX_TRX(params: any) {
    return await api.authService.post('/ADM/TAX/TRX/get', { params });
  },
  async getTAXExcel(params: any) {
    return await api.authService.post('/ADM/TAX/EXCEL/get', { params });
  },

  /**  ADV  */
  async setADV(params: any) {
    return await api.authService.post('/ADM/ADV/set', { params });
  },
  async getADV(params: any) {
    return await api.authService.post('/ADM/ADV/get', { params });
  },
  async getADVS(params: any) {
    return await api.authService.post('/ADM/ADV/gets', { params });
  },
  async getADVRate(params: any) {
    return await api.authService.post('/ADM/ADV/rate', { params });
  },

  async setADV_TRX(params: any) {
    return await api.authService.post('/ADM/ADV/TRX/set', { params });
  },

  async getADV_TRX(params: any) {
    return await api.authService.post('/ADM/ADV/TRX/get', { params });
  },
  async getADVExcel(params: any) {
    return await api.authService.post('/ADM/ADV/EXCEL/get', { params });
  },

  /**  CAA  */
  async setCAA(params: any) {
    return await api.authService.post('/ADM/CAA/set', { params });
  },
  async getCAA(params: any) {
    return await api.authService.post('/ADM/CAA/get', { params });
  },
  async getCAAS(params: any) {
    return await api.authService.post('/ADM/CAA/gets', { params });
  },
  async getCAARate(params: any) {
    return await api.authService.post('/ADM/CAA/rate', { params });
  },

  async setCAA_TRX(params: any) {
    return await api.authService.post('/ADM/CAA/TRX/set', { params });
  },

  async getCAA_TRX(params: any) {
    return await api.authService.post('/ADM/CAA/TRX/get', { params });
  },
  async getCAAExcel(params: any) {
    return await api.authService.post('/ADM/CAA/EXCEL/get', { params });
  },


  /** ============================================================================
   *  [갱신DB]
   *  ============================================================================
   */
  async setTAXRenewal(params: any) {
    return await api.authService.post('/ADM/TAX/RENEWAL/set', { params });
  },
  async getRenewal(params: any) {
    return await api.authService.post('/ADM/TAX/RENEWAL/get', { params });
  },

  async getRenewals(params: any) {
    return await api.authService.post('/ADM/TAX/RENEWAL/gets', { params });
  },
  /**  ADV  */
  async setADVRenewal(params: any) {
    return await api.authService.post('/ADM/ADV/RENEWAL/set', { params });
  },
  async getADVRenewal(params: any) {
    return await api.authService.post('/ADM/ADV/RENEWAL/get', { params });
  },

  async getADVRenewals(params: any) {
    return await api.authService.post('/ADM/ADV/RENEWAL/gets', { params });
  },

  /**  CAA  */
  async setCAARenewal(params: any) {
    return await api.authService.post('/ADM/CAA/RENEWAL/set', { params });
  },
  async getCAARenewal(params: any) {
    return await api.authService.post('/ADM/CAA/RENEWAL/get', { params });
  },

  async getCAARenewals(params: any) {
    return await api.authService.post('/ADM/CAA/RENEWAL/gets', { params });
  },

  /** ============================================================================
   *  [증권시작일조회]
   *  ============================================================================
   */
  async getStockStartDtALL() {
    return await api.authService.post('/ADM/COM/getStockStartDtInfo');
  },
  /** ============================================================================
   *  [비밀번호 초기화]
   *  ============================================================================
   */
  async setUserPassword(params: any) {
    return await api.authService.post('/ADM/USER/setUserPassword', {params});
  }
};
