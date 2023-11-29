import api from '../common/APIService';

export default {
  /**
   * 게시판 목록 조회
   *
   * @param params
   * @returns
   */
  async getItems(params: any) {
    return await api.commonService.post(`/board/${params.board_id}`, params);
  },
  async getPopup(params: any) {
    return await api.commonService.post(`/board/popup`, params);
  },
  async getItemCount(params: any) {
    return await api.commonService.post(
      `/board/${params.board_id}/count`,
      params
    );
  },

  /**
   * 게시판 목록 조회
   *
   * @param params
   * @returns
   */
  async getItemsWithContent(params: any) {
    return await api.commonService.post(
      `/board/faq/${params.board_id}`,
      params
    );
  },

  /**
   * 게시판 상세 조회
   *
   * @param params
   * @returns
   */
  async getItem(params: any) {
    return await api.commonService.post(
      `/board/${params.board_id}/${params.board_no}`,
      params
    );
  },

  /**
   * 게시판 입력
   *
   * @param params
   * @returns
   */
  async insert(params: any) {
    return await api.commonService.post(
      `/board/${params.board_id}/insert`,
      params
    );
  },

  /**
   * 게시판 수정 조회
   *
   * @param params
   * @returns
   */
  async update(params: any) {
    return await api.commonService.post(
      `/board/${params.board_id}/update`,
      params
    );
  },

  /**
   * 게시판 삭제 조회
   *
   * @param params
   * @returns
   */
  async delete(params: any) {
    return await api.commonService.post(
      `/board/${params.board_id}/delete`,
      params
    );
  }
};
