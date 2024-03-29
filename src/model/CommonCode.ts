// @ts-ignore
import apiCOMMON from '@/api/api/A_COMMON';

export class CommonCode {
  private static CODE_CACHE_KEY = '_COMMON_CODES';
  private static STOCK_START_DT = 'STOCK_START_DT';

  static async fetchCodeAll(): Promise<void> {
    try {
      const response = await apiCOMMON.getCodeALL();
      const codes = {};
      codes["data"] = response.data;
      codes["expire"] = Date.now() + 60000;
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
    const obj = JSON.parse(cachedCodes)
    if(!obj.hasOwnProperty("data") || !obj.hasOwnProperty("expire")){
      await this.fetchCodeAll();
      cachedCodes = localStorage.getItem(CommonCode.CODE_CACHE_KEY);
    }else {
      let cachedCodesData = obj.data;
      let expire = obj.expire;
      //cachedCodes = null;
      //console.log(cachedCodes)
      if (cachedCodesData && expire > Date.now()) {// && Date.now() <= cachedCodes.expire) {
      } else {
        // 로컬 스토리지에 코드가 없는 경우 서버에서 조회
        await this.fetchCodeAll();
        cachedCodes = localStorage.getItem(CommonCode.CODE_CACHE_KEY);
      }
    }
    const codes = JSON.parse(cachedCodes).data;
    return codes.filter((code: any) => code.grp_cd === groupCode);
  }
}
