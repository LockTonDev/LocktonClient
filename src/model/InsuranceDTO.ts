class InsuranceRateDTO {
  business_cd: string;
  user_cd: string;
  base_year: string;
  insr_st_dt: string;
  insr_cncls_dt: string;
  days: number;
  ver: number;
  insurance_no: string;
  insurance_nm: string;
  contents: string;
  rmk: string;
  use_yn: string;

  constructor(data: Partial<InsuranceRateDTO> = {}) {
    this.business_cd = data.business_cd || '';
    this.user_cd = data.user_cd || '';
    this.base_year = data.base_year || '';
    this.insr_st_dt = data.insr_st_dt || '';
    this.insr_cncls_dt = data.insr_cncls_dt || '';
    this.ver = data.ver || 0;
    this.insurance_no = data.insurance_no || '';
    this.insurance_nm = data.insurance_nm || '';
    this.contents = data.contents || '';
    this.contents = data.contents || '';
    this.days = data.days || 0;
    this.rmk = data.rmk || '';
    this.use_yn = data.use_yn || '';
  }
}


class TRXDataDTO {
  trx_cd: string;
  trx_nm: string;
  trx_dt: string;
  trx_amt: number;
  acct_nm: string;
  rmk: string;
  constructor(data: Partial<TRXDataDTO> = {}) {
    this.trx_cd = data.trx_cd || '';
    this.trx_nm = data.trx_nm || '';
    this.trx_dt = data.trx_dt || '';
    this.trx_amt = data.trx_amt || 0;
    this.acct_nm = data.acct_nm || '';
    this.rmk = data.rmk || '';
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
  insr_sale_year: number;
  insr_sale_rt: number;
  insr_amt: number;
  insr_base_amt: number;
  status_cd: string;
  isCheck: boolean;
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
    this.insr_sale_year = data.insr_sale_year || 0;
    this.insr_sale_rt = data.insr_sale_rt || 0;
    this.insr_amt = data.insr_amt || 0;
    this.insr_base_amt = data.insr_base_amt || 0;
    this.isCheck = false;
    this.status_cd = data.status_cd || '';
    this.isCheck = false;
  }
}

class InsuranceDTO {
  mode: string;
  index: number;
  renewal: string;
  table_name: string;
  insurance_uuid: string;
  insurance_seq: number;
  insurance_no: string;
  user_uuid: string;
  user_id: string;

  user_cd: string;
  user_nm: string;
  user_birth: number;
  user_regno: number;
  user_hpno: string;
  user_email: string;

  corp_type: string;
  corp_region_cd: string;
  corp_region_nm: string;
  corp_nm: string;
  corp_ceo_nm: string;
  corp_bnno: string;
  corp_bnno1: string;
  corp_bnno2: string;
  corp_bnno3: string;
  corp_cnno: string;
  corp_cnno1: string;
  corp_cnno2: string;
  corp_cnno3: string;
  corp_telno: string;
  corp_telno1: string;
  corp_telno2: string;
  corp_telno3: string;
  corp_faxno: string;
  corp_faxno1: string;
  corp_faxno2: string;
  corp_faxno3: string;

  corp_cust_nm: string;
  corp_cust_hpno: string; // 미시용
  corp_cust_hpno1: string; // 미시용
  corp_cust_hpno2: string; // 미시용
  corp_cust_hpno3: string; // 미시용
  corp_cust_email: string; // 미사용
  corp_post: string;
  corp_addr: string;
  corp_addr_dtl: string;

  base_insr_st_dt: string;
  base_insr_cncls_dt: string;
  insr_year: string;
  insr_reg_dt: string;
  insr_st_dt: string;
  insr_cncls_dt: string;
  insr_retr_yn: string;
  insr_retr_dt: string;
  insr_pblc_brdn_rt: string;
  insr_take_amt: number;
  insr_take_sec: string;
  insr_clm_lt_amt: string;
  insr_year_clm_lt_amt: string;
  insr_psnl_brdn_amt: string;
  insr_program_yn: string;
  insr_program: string;
  insr_service: string;
  insr_sale_year: number;
  insr_sale_rt: number;
  insr_pcnt_sale_rt: number;
  insr_base_amt: number;
  insr_amt: number;
  insr_premium_amt: number;
  insr_tot_amt: number;
  insr_tot_unpaid_amt: number;
  insr_tot_paid_amt: number;
  limited_collateral: string;

  cbr_cnt: number;
  cbr_data: CBRDataDTO[];
  cons_join_yn: string;
  cons_data: {
    insr_st_dt: string;
    insr_cncls_dt: string;
    insr_pblc_brdn_rt: string;
    insr_clm_lt_amt: string;
    insr_year_clm_lt_amt: string;
    insr_psnl_brdn_amt: string;
    insr_retr_yn: string;
    insr_retr_dt: string;
    insr_sale_rt: number;
    insr_base_amt: number;
    insr_amt: number;
    cbr_cnt: number;
    cbr_data: CBRDataDTO[];
  };
  spct_join_yn: string;
  spct_data: {
    insr_st_dt: string;
    insr_cncls_dt: string;
    insr_year_clm_lt_amt: string;
    insr_clm_lt_amt: string;
    insr_psnl_brdn_amt: string;
    insr_retr_yn: string;
    insr_retr_dt: string;
    insr_sale_rt: number;
    insr_base_amt: number;
    insr_amt: number;
    cbr_cnt: number;
    cbr_data: CBRDataDTO[];
  };
  active_yn: string;
  agr10_yn: string;
  agr20_yn: string;
  agr30_yn: string;
  agr31_yn: string;
  agr32_yn: string;
  agr33_yn: string;
  agr34_yn: string;
  agr40_yn: string;
  agr41_yn: string;
  agr50_yn: string;
  trx_data: TRXDataDTO[];
  complete_dt: string;
  status_cd: string;
  status_nm: string;
  rmk: string;
  change_dt: string;
  change_rmk: string;
  erp_st_dt: string;
  erp_cncls_dt: string;
  erp_amt: number;
  erp_dt: string;
  created_id: string;
  created_ip: string;
  updated_id: string;
  updated_ip: string;

  constructor(data: Partial<InsuranceDTO> = {}) {
    this.mode = data.mode || '';
    this.index = data.index || 0;
    this.insurance_uuid = data.insurance_uuid || '';
    this.insurance_seq = data.insurance_seq || 0;
    this.insurance_no = data.insurance_no || '';
    this.user_id = data.user_id || '';
    this.user_uuid = data.user_uuid || '';
    this.user_cd = data.user_cd || '';
    this.user_nm = data.user_nm || '';
    this.user_birth = data.user_birth || 0;
    this.user_regno = data.user_regno || 0;
    this.user_hpno = data.user_hpno || '';
    this.user_email = data.user_email || '';
    this.corp_type = data.corp_type || '';
    this.corp_region_cd = data.corp_region_cd || '';
    this.corp_region_nm = data.corp_region_nm || '';
    this.corp_nm = data.corp_nm || '';
    this.corp_ceo_nm = data.corp_ceo_nm || '';
    this.corp_bnno = data.corp_bnno || '';
    this.corp_bnno1 = data.corp_bnno1 || '';
    this.corp_bnno2 = data.corp_bnno2 || '';
    this.corp_bnno3 = data.corp_bnno3 || '';
    this.corp_cnno = data.corp_cnno || '';
    this.corp_cnno1 = data.corp_cnno1 || '';
    this.corp_cnno2 = data.corp_cnno2 || '';
    this.corp_cnno3 = data.corp_cnno3 || '';
    this.corp_telno = data.corp_telno || '';
    this.corp_telno1 = data.corp_telno1 || '';
    this.corp_telno2 = data.corp_telno2 || '';
    this.corp_telno3 = data.corp_telno3 || '';
    this.corp_faxno = data.corp_faxno || '';
    this.corp_faxno1 = data.corp_faxno1 || '';
    this.corp_faxno2 = data.corp_faxno2 || '';
    this.corp_faxno3 = data.corp_faxno3 || '';
    this.corp_cust_nm = data.corp_cust_nm || '';
    this.corp_cust_hpno = data.corp_cust_hpno || '';
    this.corp_cust_hpno1 = data.corp_cust_hpno1 || '';
    this.corp_cust_hpno2 = data.corp_cust_hpno2 || '';
    this.corp_cust_hpno3 = data.corp_cust_hpno3 || '';
    this.corp_cust_email = data.corp_cust_email || '';
    this.corp_post = data.corp_post || '';
    this.corp_addr = data.corp_addr || '';
    this.corp_addr_dtl = data.corp_addr_dtl || '';

    this.base_insr_st_dt = data.base_insr_st_dt || '';
    this.base_insr_cncls_dt = data.base_insr_cncls_dt || '';
    this.insr_year = data.insr_year || '';
    this.insr_reg_dt = data.insr_reg_dt || '';
    this.insr_st_dt = data.insr_st_dt || '';
    this.insr_cncls_dt = data.insr_cncls_dt || '';
    this.insr_retr_yn = data.insr_retr_yn || '';
    this.insr_retr_dt = data.insr_retr_dt || '';
    this.insr_pblc_brdn_rt = data.insr_pblc_brdn_rt || '';
    this.insr_take_amt = data.insr_take_amt || 0;
    this.insr_take_sec = data.insr_take_sec || '';
    this.insr_year_clm_lt_amt = data.insr_year_clm_lt_amt || '';
    this.insr_clm_lt_amt = data.insr_clm_lt_amt || '';
    this.insr_psnl_brdn_amt = data.insr_psnl_brdn_amt || '';
    this.insr_program_yn = data.insr_program_yn || 'N';
    this.insr_program = data.insr_program || '';
    this.insr_service = data.insr_service || '';
    this.insr_pcnt_sale_rt = data.insr_pcnt_sale_rt || 0;
    this.insr_sale_year = data.insr_sale_year || 0;
    this.insr_sale_rt = data.insr_sale_rt || 0;
    this.insr_base_amt = data.insr_base_amt || 0;
    this.insr_amt = data.insr_amt || 0;
    this.insr_premium_amt = data.insr_premium_amt || 0;
    this.insr_tot_amt = data.insr_tot_amt || 0;
    this.insr_tot_paid_amt = data.insr_tot_paid_amt || 0;
    this.insr_tot_unpaid_amt = data.insr_tot_unpaid_amt || 0;
    this.cbr_cnt = data.cbr_cnt || 0;
    this.cbr_data = data.cbr_data || [];
    this.cons_join_yn = data.cons_join_yn || '';
    this.cons_data = data.cons_data || {
      insr_st_dt: '',
      insr_cncls_dt: '',
      insr_pblc_brdn_rt: '',
      insr_year_clm_lt_amt: '',
      insr_clm_lt_amt: '',
      insr_psnl_brdn_amt: '',
      insr_retr_yn: '',
      insr_retr_dt: '',
      insr_sale_rt: 0,
      insr_base_amt: 0,
      insr_amt: 0,
      cbr_cnt: 0,
      cbr_data: []
    };
    this.spct_join_yn = data.spct_join_yn || '';
    this.spct_data = data.spct_data || {
      insr_st_dt: '',
      insr_cncls_dt: '',
      insr_year_clm_lt_amt: '',
      insr_clm_lt_amt: '',
      insr_psnl_brdn_amt: '',
      insr_retr_yn: '',
      insr_retr_dt: '',
      insr_sale_rt: 0,
      insr_base_amt: 0,
      insr_amt: 0,
      cbr_cnt: 0,
      cbr_data: []
    };
    this.trx_data = data.trx_data || [];
    this.active_yn = data.active_yn || 'N';
    this.agr10_yn = data.agr10_yn || 'N';
    this.agr20_yn = data.agr20_yn || 'N';
    this.agr30_yn = data.agr30_yn || 'N';
    this.agr31_yn = data.agr31_yn || 'N';
    this.agr32_yn = data.agr32_yn || 'N';
    this.agr33_yn = data.agr33_yn || 'N';
    this.agr34_yn = data.agr34_yn || 'N';
    this.agr40_yn = data.agr40_yn || 'N';
    this.agr41_yn = data.agr41_yn || 'N';
    this.agr50_yn = data.agr50_yn || 'N';

    this.complete_dt = data.complete_dt || '';
    this.status_cd = data.status_cd || '';
    this.status_nm = data.status_nm || '';
    this.rmk = data.rmk || '';
    this.change_rmk = data.change_rmk || '';
    this.change_dt = data.change_dt || '';
    this.erp_st_dt = data.erp_st_dt || '';
    this.erp_cncls_dt = data.erp_cncls_dt || '';
    this.erp_amt = data.erp_amt || 0;
    this.erp_dt = data.erp_dt || '';
    this.created_id = data.created_id || '';
    this.created_ip = data.created_ip || '';
    this.updated_id = data.updated_id || '';
    this.updated_ip = data.updated_ip || '';
    this.renewal = data.renewal || '';
    this.limited_collateral = data.limited_collateral || '';
    this.table_name = data.table_name || '';
  }
}
export { TRXDataDTO, CBRDataDTO, InsuranceDTO, InsuranceRateDTO };
