import api from '../common/APIService';

export default {
  /**
   * 보험료 테이블 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getDBSelInsuranceRate(params: any) {
    return await api.commonService.post('/PAT/PAT0030A/rate', { params });
  },

  /**
   * 보험료 테이블 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getDBSelStatus() {
    return await api.commonService.post('/PAT/PAT0030A/status');
  },

  /**
   * 보험 할인할증 정보 조회
   *
   * @param params.insurance_type
   * @returns
   */
  async getSaleRtNDupInfo(params: any) {
    return await api.commonService.post('/PAT/PAT0030A/getSaleRtNDupInfo', {
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
      return await api.authService.post('/PAT/PAT0030A/get', { params });
    } else {
      return await api.commonService.post('/PAT/PAT0030A/get', { params });
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
      return await api.authService.post('/PAT/PAT0030A/get/history', {
        params
      });
    } else {
      return await api.commonService.post('/PAT/PAT0030A/get/history', {
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
    return await api.commonService.post('/PAT/PAT0030A', { params });
  },
  /**
   * 보험료 테이블 입력
   *
   * @param params.insurance_type
   * @returns
   */
  async setDBIns(params: any, file: any, user: any) {
    if(user === 'COR') {
      const reader = new FileReader();
      const promise = new Promise((resolve, reject) => {
        reader.onload = () => {
          const base64Data = reader.result.split(',')[1];

          params.fileName = file.name;
          params.fileType = file.type;
          params.fileData = base64Data;
          resolve();
        };

        reader.onerror = reject;
      });
      reader.readAsDataURL(file);

      await promise;

      return await api.commonService.post('/PAT/PAT0030A/set', {params});
    }else {
      return await api.commonService.post('/PAT/PAT0030A/set', {params});
    }
  },
  /**
   * 보험 수정
   *
   * @param params.insurance_type
   * @returns
   */
  async setDBUpd(params: any, file: any) {
    if(file) {
      const reader = new FileReader();
      const promise = new Promise((resolve, reject) => {
        reader.onload = () => {
          const base64Data = reader.result.split(',')[1];

          params.fileName = file.name;
          params.fileType = file.type;
          params.fileData = base64Data;
          resolve();
        };

        reader.onerror = reject;
      });
      reader.readAsDataURL(file);

      await promise;

      return await api.commonService.post(`/PAT/PAT0030A/set/:${params.insurance_uuid}`, {params});
    }else {
      return await api.commonService.post(`/PAT/PAT0030A/set/:${params.insurance_uuid}`, {params});
    }
  }
};
