export class UserRegDTO {
  mode: string;
  business_cd: string;
  business_cd_nm: string;
  reg_no: string;
  nm: string;
  birth: string;
  created_ip: string;
  created_id: string;
  updated_ip: string;
  updated_id: string;
  
  constructor(data: Partial<UserRegDTO> = {}) {
    this.mode = data.mode || '';
    this.business_cd = data.business_cd || '';
    this.business_cd_nm = data.business_cd_nm || '';
    this.reg_no = data.reg_no || '';
    this.nm = data.nm || '';
    this.birth = data.birth || '';
    this.created_ip = data.created_ip || '';
    this.created_id = data.created_id || '';
    this.updated_ip = data.updated_ip || '';
    this.updated_id = data.updated_id || '';
  }
}
