import apiCOMMON from '@/api/api/A_COMMON';

export class CommonCode {
  private static CODE_CACHE_KEY = '_COMMON_CODES';

  static async fetchCodeAll(): Promise<void> {
    try {
      const response = await apiCOMMON.getCodeALL();
      const codes = response.data;
      // console.error("---------------------- 공통코드 재조회");
      // 로컬 스토리지에 코드를 저장
      localStorage.removeItem(CommonCode.CODE_CACHE_KEY);
      localStorage.setItem(CommonCode.CODE_CACHE_KEY, JSON.stringify(codes));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch common codes');
    }
  }

  static async getCodeList(groupCode: string): Promise<any[]> {
    // 로컬 스토리지에서 코드를 가져옴
    let cachedCodes = localStorage.getItem(CommonCode.CODE_CACHE_KEY);
    //cachedCodes = null;
    if (cachedCodes) {
    } else {
      // 로컬 스토리지에 코드가 없는 경우 서버에서 조회
      await this.fetchCodeAll();
      cachedCodes = localStorage.getItem(CommonCode.CODE_CACHE_KEY);
    }
    const codes = JSON.parse(cachedCodes);
    return codes.filter((code: any) => code.grp_cd === groupCode);
  }
}
