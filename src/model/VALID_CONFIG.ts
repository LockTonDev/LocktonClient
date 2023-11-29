export class VALID_CONFIG {
  static readonly MESSAGE = {
    REQUIRED: '을(를) 입력해주세요.'
  };

  static readonly VALID = {
    user_id: {
      LABEL: '아이디',
      REQUIRED: '',
      MAXLENGTH: 40
    },
    user_nm: {
      LABEL: '이름',
      REQUIRED: '',
      MAXLENGTH: 50
    },
    user_birth: {
      LABEL: '생년월일',
      REQUIRED: '',
      MAXLENGTH: 8
    },
    user_regno: {
      LABEL: '주민등록번호',
      REQUIRED: '',
      MAXLENGTH: 13
    },
    user_hpno: {
      LABEL: '휴대전화번호',
      REQUIRED: '',
      MAXLENGTH: 20
    },
    user_email: {
      LABEL: '이메일',
      REQUIRED: '',
      MAXLENGTH: 100
    },
    corp_nm: {
      LABEL: '기업명',
      REQUIRED: '',
      MAXLENGTH: 100
    },
    corp_ceo_nm: {
      LABEL: '대표자명',
      REQUIRED: '',
      MAXLENGTH: 50
    },
    corp_bnno: {
      LABEL: '사업자등록번호',
      REQUIRED: '',
      MAXLENGTH: 10
    },
    corp_cnno: {
      LABEL: '법인등록번호',
      REQUIRED: '',
      MAXLENGTH: 13
    },
    corp_telno1: {
      LABEL: '사무소 전화번호',
      REQUIRED: '',
      MAXLENGTH: 20
    },
    corp_telno2: {
      LABEL: '사무소 전화번호',
      REQUIRED: '',
      MAXLENGTH: 20
    },
    corp_telno3: {
      LABEL: '사무소 전화번호',
      REQUIRED: '',
      MAXLENGTH: 20
    },
    corp_faxno1: {
      LABEL: '사무소 팩스번호1',
      REQUIRED: '',
      MAXLENGTH: 20
    },
    corp_faxno2: {
      LABEL: '사무소 팩스번호2',
      REQUIRED: '',
      MAXLENGTH: 20
    },
    corp_faxno3: {
      LABEL: '사무소 팩스번호3',
      REQUIRED: '',
      MAXLENGTH: 20
    },
    corp_cust_nm: {
      LABEL: '담당자 성명',
      REQUIRED: '',
      MAXLENGTH: 50
    },
    corp_cust_email: {
      LABEL: '이메일',
      REQUIRED: '',
      MAXLENGTH: 100
    },
    corp_region_no: {
      LABEL: '소속 지방회',
      REQUIRED: '',
      MAXLENGTH: 50
    },
    corp_region_nm: {
      LABEL: '소속 지방회',
      REQUIRED: '',
      MAXLENGTH: 50
    },
    corp_post: {
      LABEL: '사무소 우편번호',
      REQUIRED: '',
      MAXLENGTH: 10
    },
    corp_addr: {
      LABEL: '사무소 주소',
      REQUIRED: '',
      MAXLENGTH: 100
    },
    insr_st_dt: {
      LABEL: '보험시작일자',
      REQUIRED: '',
      MAXLENGTH: 10
    },
    insr_cncls_dt: {
      LABEL: '보험종료일자',
      REQUIRED: '',
      MAXLENGTH: 10
    },
    insr_pblc_brdn_rt: {
      LABEL: '공동보험',
      REQUIRED: '',
      MAXLENGTH: 100
    },
    insr_clm_lt_amt: {
      LABEL: '보상한도',
      REQUIRED: '',
      MAXLENGTH: 100
    },
    insr_psnl_brdn_amt: {
      LABEL: '자기부담금',
      REQUIRED: '',
      MAXLENGTH: 100
    },
    agr10_yn: {
      LABEL: '[약관동의] 신청내용',
      REQUIRED: '',
      MAXLENGTH: 1
    },
    agr20_yn: {
      LABEL: '[약관동의] 보험 약관',
      REQUIRED: '',
      MAXLENGTH: 1
    },
    agr30_yn: {
      LABEL: '[약관동의] 계약 체결·이행 등을 위한 개인(신용)정보 처리',
      REQUIRED: '',
      MAXLENGTH: 1
    },
    agr31_yn: {
      LABEL: '[약관동의] 계약 체결·이행 등을 위한 개인(신용)정보 처리',
      REQUIRED: '',
      MAXLENGTH: 1
    },
    agr32_yn: {
      LABEL: '[약관동의] 계약 체결·이행 등을 위한 개인(신용)정보 처리',
      REQUIRED: '',
      MAXLENGTH: 1
    },
    agr33_yn: {
      LABEL: '[약관동의] 계약 체결·이행 등을 위한 개인(신용)정보 처리',
      REQUIRED: '',
      MAXLENGTH: 1
    },
    agr34_yn: {
      LABEL: '[약관동의] 계약 체결·이행 등을 위한 개인(신용)정보 처리',
      REQUIRED: '',
      MAXLENGTH: 1
    },
    agr40_yn: {
      LABEL: '[약관동의] 상품설명확인서',
      REQUIRED: '',
      MAXLENGTH: 1
    },
    agr41_yn: {
      LABEL: '[약관동의] 상품설명확인서',
      REQUIRED: '',
      MAXLENGTH: 1
    },
    agr50_yn: {
      LABEL: '[약관동의] 가입신청',
      REQUIRED: '',
      MAXLENGTH: 1
    },
    cbr_nm: {
      LABEL: '세무사 명단 성명',
      REQUIRED: '',
      MAXLENGTH: 50
    },
    cbr_brdt: {
      LABEL: '세무사 명단 생년월일',
      REQUIRED: '',
      MAXLENGTH: 8
    },
    cbr_regno: {
      LABEL: '세무사 명단 등록번호',
      REQUIRED: '',
      MAXLENGTH: 50
    },
    isCheck: {
      LABEL: '세무사 명단 인증',
      REQUIRED: '',
      MAXLENGTH: 1
    }
  };

  static updateValidTitles() {
    Object.keys(VALID_CONFIG.VALID).forEach(key => {
      const column = VALID_CONFIG.VALID[key];
      column.REQUIRED = `${column.TITLE} ${VALID_CONFIG.MESSAGE.REQUIRED}`;
    });
  }
}

VALID_CONFIG.updateValidTitles();
