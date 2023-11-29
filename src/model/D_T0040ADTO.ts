export class D_T0040ADTO {
  apply_no: number;
  user_cd: string;
  business_cd: string;
  email: string;
  tel: string;
  tel1: string;
  tel2: string;
  tel3: string;
  nm: string;
  apply_cd: string;
  apply_nm: string;
  apply_content: string;
  apply_posted_dt: string;
  apply_dt: string;
  proc_dt: string | null;
  proc_content: string | null;
  proc_cd: string | null;
  proc_nm: string | null;
  user_id: string;
  insurance_uuid: string;
  insurance_user_nm: string;
  insurance_year: string;
  insurance_no: string;

  user_uuid: string;
  created_at: string;
  created_ip: string | null;
  updated_at: string;
  updated_ip: string | null;

  constructor(data: Partial<D_T0040ADTO> = {}) {
    this.apply_no = data.apply_no || 0;
    this.user_cd = data.user_cd || '';
    this.business_cd = data.business_cd || '';
    this.email = data.email || '';
    this.tel = data.tel || '';
    this.tel1 = data.tel1 || '';
    this.tel2 = data.tel2 || '';
    this.tel3 = data.tel3 || '';
    this.nm = data.nm || '';
    this.apply_cd = data.apply_cd || '';
    this.apply_nm = data.apply_nm || '';
    this.apply_content = data.apply_content || '';
    this.apply_posted_dt = data.apply_posted_dt || '';
    this.apply_dt = data.apply_dt || '';
    this.proc_dt = data.proc_dt || null;
    this.proc_content = data.proc_content || null;
    this.proc_cd = data.proc_cd || null;
    this.proc_nm = data.proc_nm || null;
    this.user_id = data.user_id || '';
    this.insurance_uuid = data.insurance_uuid || '';
    this.insurance_user_nm = data.insurance_user_nm || '';
    this.insurance_year = data.insurance_year || '';
    this.insurance_no = data.insurance_no || '';
    this.user_uuid = data.user_uuid || '';
    this.created_at = data.created_at || '';
    this.created_ip = data.created_ip || null;
    this.updated_at = data.updated_at || '';
    this.updated_ip = data.updated_ip || null;
  }

  clear() {
    this.apply_no = 0;
    this.email = '';
    this.tel = '';
    this.nm = '';
    this.apply_cd = '';
    this.apply_nm = '';
    this.apply_content = '';
    this.apply_posted_dt = '';
    this.apply_dt = '';
    this.proc_dt = null;
    this.proc_content = null;
    this.proc_cd = null;
    this.user_id = '';
    this.insurance_uuid = '';
    this.insurance_user_nm = '';
    this.insurance_year = '';
    this.user_uuid = '';
    this.created_at = '';
    this.created_ip = null;
    this.updated_at = '';
    this.updated_ip = null;
  }
}
