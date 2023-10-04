import api from '../common/APIService';

export default {
  /**
   * 사용자 로그인 정보 조회
   *
   * @param userId
   * @param password
   * @returns Auth 데이터
   */
  async getLogin(params: any) {
    return await api.commonService.post('/auth/signin', params);
  },
  /**
   * 사용자 로그인 정보 조회
   *
   * @param userId
   * @param password
   * @returns Auth 데이터
   */
  async getAdminLogin(params: any) {
    return await api.authService.post('/auth/signin', params);
  },
  /**
   * 사용자 로그인 토큰
   *
   * @param userId
   * @param password
   * @returns Auth 데이터
   */
  async getRefreshLogin(params: any) {
    return await api.commonService.post('/auth/refresh', { params });
  },

  /**
   * 사용자 로그인 정보 조회
   *
   * @param userId
   * @param password
   * @returns Auth 데이터
   */
  async getUserInfo() {
    return await api.commonService.post('/user/select', {});
  },

  /**
   * 사용자 등록
   * @param params
   * @returns
   */
  async setUserRegistor(params: any) {
    return await api.commonService.post('/user/insert', { params });
  },

  /**
   * 사용자 정보 수정
   * @param params
   * @returns
   */
  async setUserInfo(params: any) {
    return await api.commonService.post('/user/update', { params });
  },

  /**
   * 사용자 비밀번호 수정
   * @param params
   * @returns
   */
  async setUserPassword(params: any) {
    return await api.commonService.post('/user/updatePassword', { params });
  },
  /**
   * 사용자 비밀번호 수정
   * @param params
   * @returns
   */
  async setUserPasswordNotLogin(params: any) {
    return await api.commonService.post('/user/updatePasswordNotLogin', { params });
  },

  /**
   * 사용자 탈퇴 신청
   * @param params
   * @returns
   */
  async setUserResignation(params: any) {
    return await api.commonService.post('/user/resignation', { params });
  },

  /**
   * 사용자 아이디 찾기
   * @param params.
   * @returns
   */
  async isVerifyUser(params: any) {
    return await api.commonService.post('/user/isVerifyUser', { params });
  },

  /**
   * 등록번호 유효성 확인
   * @param params.
   * @returns
   */
  async isVerifyUserRegNo(params: any) {
    return await api.commonService.post('/user/isVerifyUserRegNo', {
      params
    });
  },

  /**
   * 사용자 아이디 유효성 확인
   * @param params.
   * @returns
   */
  async isVerifyUserId(params: any) {
    return await api.commonService.post('/user/isVerifyUserId', { params });
  },

  /**
   * 이메일 유효성 확인
   * @param params.
   * @returns
   */
  async isVerifyUserEMail(params: any) {
    return await api.commonService.post(`/user/isVerifyUserEMail`, { params });
  },

  /**
   * 이메일 유효성 확인
   * @param params.
   * @returns
   */
  async isVerifyUserEMailAuth(params: any) {
    return await api.commonService.post(`/user/isVerifyUserEMailAuth`, { params });
  },

  /**
   * 비밀번호 유효성 확인
   * @param params.
   * @returns
   */
  async isVerifyPassword(params: any) {
    return await api.commonService.post('/user/isVerifyPassword', {
      params
    });
  },

  /**
   * 휴대폰 본인인증
   * @param params.
   * @returns
   */
  async isVerifyUserHp(imp_uid: string) {
    return await api.commonService.get(`/auth/import/${imp_uid}`);
  },
  /**
   * 휴대폰 본인인증
   * @param params.
   * @returns
   */
  async isVerifyUserHpWithUser(imp_uid: string) {
    return await api.commonService.get(`/auth/import/user/${imp_uid}`);
  },

  /**
   * 이메일 인증코드
   * @param params.
   * @returns
   */
  async isVerifyEMailAuthCode(params: any) {
    return await api.commonService.post(`/user/isVerifyEMailAuthCode`, { params });
  },
  /**
   * 이메일 인증코드
   * @param params.
   * @returns
   */
  async isVerifyUserUUID(params: any) {
    return await api.commonService.post(`/user/isVerifyUserUUID`, { params });
  },
  /**
   * 법인 이메일 인증
   * @param params.
   * @returns
   */
  async findCORUserNSendEMail(params: any) {
    return await api.commonService.post(`/user/findCORUserNSendEMail`, { params });
  }
};
