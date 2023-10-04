class TaxIndDto {
  insurance_uuid: string;
  business_cd: string;
  user_cd: string;
  user_nm: string;
  user_birth: string;
  user_regno: string;
  insr_pblc_brdn_rt: string;
  insr_clm_lt_amt: string;
  insr_psnl_brdn_amt: string;
  insr_retr_dt: string;
  insr_sale_rt: number;

  constructor() {
    this.insurance_uuid = '';
    this.business_cd = '';
    this.user_cd = '';
    this.user_nm = '';
    this.user_birth = '';
    this.user_regno = '';
    this.insr_pblc_brdn_rt = '';
    this.insr_clm_lt_amt = '';
    this.insr_psnl_brdn_amt = '';
    this.insr_retr_dt = '';
    this.insr_sale_rt = 0;
  }
}

class TaxCorDto {
  insurance_uuid: string;
  business_cd: string;
  user_cd: string;
  corp_nm: string;
  corp_bnno: string;
  corp_cnno: string;
  user_nm: string;
  user_birth: string;
  user_regno: string;
  insr_pblc_brdn_rt: string;
  insr_clm_lt_amt: string;
  insr_psnl_brdn_amt: string;
  insr_retr_dt: string;
  insr_pcnt_sale_rt: number;
  insr_sale_rt: number;
  cbr_data: CBRDataDTO[];

  constructor() {
    this.insurance_uuid = '';
    this.business_cd = '';
    this.user_cd = '';
    this.corp_nm = '';
    this.corp_bnno = '';
    this.corp_cnno = '';
    this.user_nm = '';
    this.user_birth = '';
    this.user_regno = '';
    this.insr_pblc_brdn_rt = '';
    this.insr_clm_lt_amt = '';
    this.insr_psnl_brdn_amt = '';
    this.insr_retr_dt = '';
    this.insr_pcnt_sale_rt = 0;
    this.insr_sale_rt = 0;
    this.cbr_data = [];
  }
}

class CBRDataDTO {
  cbr_type: string;
  cbr_nm: string;
  cbr_brdt: string;
  cbr_regno: string;
  cbr_reg_dt: string;
  insr_st_dt: string;
  insr_cncls_dt: string;
  insr_retr_yn: string;
  insr_retr_dt: string;
  insr_sale_rt: number;
  insr_amt: number;
  insr_base_amt: number;
  constructor(data: Partial<CBRDataDTO> = {}) {
    this.cbr_type = data.cbr_type || '';
    this.cbr_nm = data.cbr_nm || '';
    this.cbr_brdt = data.cbr_brdt || '';
    this.cbr_regno = data.cbr_regno || '';
    this.cbr_reg_dt = data.cbr_reg_dt || '';
    this.insr_retr_yn = data.insr_retr_yn || '';
    this.insr_retr_dt = data.insr_retr_dt || '';
    this.insr_st_dt = data.insr_st_dt || '';
    this.insr_cncls_dt = data.insr_cncls_dt || '';
    this.insr_sale_rt = data.insr_sale_rt || 0;
    this.insr_amt = data.insr_amt || 0;
    this.insr_base_amt = data.insr_base_amt || 0;
  }
}

export { TaxIndDto, TaxCorDto };
