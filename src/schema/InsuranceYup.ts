import yup from '../config/yupConfig';
import insurance from "../router/insurance";

const 보험가입_공통가입정보 = yup.object({
  corp_telno1: yup.string().matches(/^\d{2,3}$/, '사무소 전화를 입력해주세요.'),
  corp_telno2: yup.string().matches(/^\d{3,4}$/, '사무소 전화를 입력해주세요.'),
  corp_telno3: yup.string().matches(/^\d{4}$/, '사무소 전화를 입력해주세요.'),
  corp_faxno1: yup.string().matches(/^\d{2,5}$/, '사무소 팩스를 입력해주세요.'),
  corp_faxno2: yup.string().matches(/^\d{3,4}$/, '사무소 팩스를 입력해주세요.'),
  corp_faxno3: yup.string().matches(/^\d{4}$/, '사무소 팩스를 입력해주세요.'),
  corp_cust_nm: yup.string().required('담당자 성명을 입력해주세요.'),
  //corp_cust_email: yup.string().matches(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, '이메일을 정확히 입력하세요.'),
  corp_post: yup.string().required('사무소 우편번호를 입력해주세요.'),
  corp_addr: yup.string().required('사무소 주소를 입력해주세요.'),
  corp_addr_dtl: yup.string().required('사무소 상세 주소를 입력해주세요.'),
});

const 보험가입_관세사가입정보 = yup.object({
  corp_cnno: yup.string().required(/^\d{3}-\d{2}-\d{5}$/, '사업자 번호를 입력해주세요.'),
  corp_telno: yup.string().matches(/^0\d{1,2}-\d{3,4}-\d{4}$/, '사무소 전화를 입력해주세요.'),
  corp_faxno: yup.string().matches(/^\d{2,5}-\d{3,4}-\d{4}$$/, '사무소 팩스를 입력해주세요.'),
  corp_cust_hpno: yup.string().required('휴대전화를 입력해주세요.'),
  corp_cust_nm: yup.string().required('담당자 성명을 입력해주세요.'),
  corp_cust_email: yup.string().matches(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, '이메일을 정확히 입력하세요.'),
  corp_post: yup.string().required('사무소 우편번호를 입력해주세요.'),
  corp_addr: yup.string().required('사무소 주소를 입력해주세요.'),
  corp_addr_dtl: yup.string().required('사무소 상세 주소를 입력해주세요.'),
});
const 보험가입_관세사개인가입정보 = yup.object({
  corp_nm: yup.string().required('사무소명을 입력해주세요.'),
});
const 보험가입_관세사복합가입정보 = yup.object({
  user_nm: yup.string().required('사무소명을 입력해주세요.'),
});

const 보험가입_공통보험계약 = yup.object({
  insr_st_dt: yup.string().required('보험시작일자를 입력해주세요.'),
  insr_cncls_dt: yup.string().required('보험시작일자를 입력해주세요.'),
  insr_pblc_brdn_rt: yup.string().required('공동보험을 선택해주세요.'),
  insr_clm_lt_amt: yup.string().required('보상한도를 선택해주세요.'),
  insr_psnl_brdn_amt: yup.string().required('자기부담금을 선택해주세요.')
});

const 보험가입_변호사기본보험계약 = yup.object({
  insr_st_dt: yup.string().required('보험시작일자를 입력해주세요.'),
  insr_cncls_dt: yup.string().required('보험시작일자를 입력해주세요.'),
  insr_take_amt: yup.string().required('매출액을 입력해주세요.'),
  insr_take_sec: yup.string().required('매출액을 입력해주세요.'),
  insr_clm_lt_amt: yup.string().required('보상한도를 선택해주세요.'),
  insr_psnl_brdn_amt: yup.string().required('자기부담금을 선택해주세요.')
});

const 보험가입_관세사기본복합보험계약 = yup.object({
  cbr_data: yup.array().min(1, '관세사 명단은 최소한 한 명 이상이어야 합니다.').of(
      yup.object({
        cbr_nm: yup.string().required('관세사 명단 성명을 입력해주세요.'),
        cbr_brdt: yup.string().matches(/^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, '관세사 명단 생년월일 입력해주세요.'),
        //cbr_regno: yup.string().matches(/^\d{3,7}$/, '관세사 명단 등록번호 입력해주세요.'),
        cbr_regno: yup.string().matches(/^\d{1,}$/, '관세사 명단 등록번호 입력해주세요'),
        isCheck: yup.boolean().oneOf([true], '관세사 명단 인증해주세요.').required()
      })
  ),
  cons_join_yn: yup.string().required('특약을 선택해주세요.'),
  cons_data: yup.object().when('cons_join_yn', {
    is: (value) => value === 'Y',
    then: yup.object().shape({
      insr_pblc_brdn_rt: yup.string().required('공동보험을 선택해주세요.'),
      insr_clm_lt_amt: yup.string().required('보상한도를 선택해주세요.'),
      insr_psnl_brdn_amt: yup.string().required('자기부담금을 선택해주세요.'),
      cbr_data: yup.array().min(1, '관세사 명단은 최소한 한 명 이상이어야 합니다.').of(
          yup.object({
            cbr_nm: yup.string().required('관세사 명단 성명을 입력해주세요.'),
            cbr_brdt: yup.string().matches(/^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, '관세사 명단 생년월일 입력해주세요.'),
            //cbr_regno: yup.string().matches(/^\d{3,7}$/, '관세사 명단 등록번호 입력해주세요.'),
            cbr_regno: yup.string().matches(/^\d{1,}$/, '관세사 명단 등록번호 입력해주세요'),
            isCheck: yup.boolean().oneOf([true], '관세사 명단 인증해주세요.').required()
          })
      )
    })
  })
});

const 보험가입_변리사기본명단보험계약 = yup.object({
  cbr_data: yup.array().min(2, '변리사 명단은 최소한 두 명 이상이어야 합니다.').of(
      yup.object({
        cbr_nm: yup.string().required('변리사 명단 성명을 입력해주세요.'),
        cbr_brdt: yup.string().matches(/^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, '변리사 명단 생년월일 입력해주세요.'),
        cbr_regno: yup.string().matches(/^\d{3,7}$/, '변리사 명단 등록번호 입력해주세요.'),
        isCheck: yup.boolean().oneOf([true], '변리사 명단 인증해주세요.').required()
      })
  )
});
const 보험가입_변리사보험계약 = yup.object({
  insr_st_dt: yup.string().required('보험시작일자를 입력해주세요.'),
  insr_cncls_dt: yup.string().required('보험종료일자를 입력해주세요.'),
  insr_clm_lt_amt: yup.string().required('보상한도를 선택해주세요.'),
  insr_psnl_brdn_amt: yup.string().required('자기부담금을 선택해주세요.'),
  insr_program_yn: yup.string().required('프로그램 명을 입력해주세요.'),
  insr_program: yup.string().nullable().when('insr_program_yn', {
    is: (value) => value === 'Y',
    then: yup.string().nullable().required('프로그램 명을 입력해주세요.')
  }),
  insr_service: yup.string().nullable().when('insr_program_yn', {
    is: (value) => value === 'Y',
    then: yup.string().nullable().required('서비스 제공회사를 입력해주세요.')
  })
});

const 법무사_복수_보험계약 = yup.object({
  cbr_data: yup.array().min(2, '복수가입은 최소 2명이상인 경우에만 가입이 가능합니다. 1명만 가입을 원하시면 개인가입으로 진행해 주시기 바랍니다. 관련문의는 록톤(02.2011.0300)으로 연락바랍니다.').of(
      yup.object({
        cbr_nm: yup.string().required('법무사 명단 성명을 입력해주세요.'),
        cbr_brdt: yup.string().matches(/^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, '법무사 명단 생년월일 입력해주세요.'),
        cbr_regno: yup.string().matches(/^\d{3,7}$/, '법무사 명단 등록번호 입력해주세요.'),
        isCheck: yup.boolean().oneOf([true], '법무사 명단 인증해주세요.').required()
      })
  )
});

const 보험가입_변호사법인매출액 = yup.object({
  insr_take_sec: yup.string().required('매출액을 입력해주세요.'),
});


const 보험가입_변호사특약보험계약 = yup.object({
  spct_join_yn: yup.string().required('특약을 선택해주세요.'),
  spct_data: yup.object().when('spct_join_yn', {
    is: (value) => value === 'Y',
    then: yup.object().shape({
      insr_clm_lt_amt: yup.string().required('보상한도를 선택해주세요.'),
      insr_psnl_brdn_amt: yup.string().required('자기부담금을 선택해주세요.'),
      cbr_cnt: yup.string().required('사무원 수 입력해주세요.')
    })
  })
});

const 보험가입_관세사특약보험계약 = yup.object({
  spct_join_yn: yup.string().required('특약을 선택해주세요.'),
  spct_data: yup.object().when('spct_join_yn', {
    is: (value) => value === 'Y',
    then: yup.object().shape({
      insr_clm_lt_amt: yup.string().required('보상한도를 선택해주세요.'),
      insr_psnl_brdn_amt: yup.string().required('자기부담금을 선택해주세요.'),
      cbr_data: yup.array().min(1, '사무원 명단은 최소한 한 명 이상이어야 합니다.').of(
          yup.object({
            cbr_nm: yup.string().required('사무원 명단 성명을 입력해주세요.'),
            cbr_brdt: yup.string().matches(/^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, '사무원 명단 생년월일 입력해주세요.'),
          })
      )
    })
  })
});

const 보험가입_공통약관동의 = yup.object({
  agr10_yn: yup.string().oneOf(['Y'], '[약관동의] 신청내용을 확인했음을 표시해주세요.'),
  agr20_yn: yup.string().oneOf(['Y'], '[약관동의] 보험 약관을 확인했음을 표시해주세요.'),
  agr30_yn: yup.string().oneOf(['Y'], '[약관동의] 계약 체결·이행 등을 위한 개인(신용)정보 처리에 동의해주세요.'),
  agr31_yn: yup.string().oneOf(['Y'], '[약관동의] 계약 체결·이행 등을 위한 개인(신용)정보 처리에 동의해주세요.'),
  agr32_yn: yup.string().oneOf(['Y'], '[약관동의] 계약 체결·이행 등을 위한 개인(신용)정보 처리에 동의해주세요.'),
  agr33_yn: yup.string().oneOf(['Y'], '[약관동의] 계약 체결·이행 등을 위한 개인(신용)정보 처리에 동의해주세요.'),
  agr34_yn: yup.string().oneOf(['Y'], '[약관동의] 계약 체결·이행 등을 위한 개인(신용)정보 처리에 동의해주세요.'),
  agr40_yn: yup.string().oneOf(['Y'], '[약관동의] 상품설명확인서를 확인했음을 표시해주세요.'),
  agr41_yn: yup.string().oneOf(['Y'], '[약관동의] 상품설명확인서를 확인했음을 표시해주세요.'),
  agr50_yn: yup.string().oneOf(['Y'], '[약관동의] 가입신청을 최종 확인했음을 표시해주세요.')
});


const 보험가입_가입정보_세무사_개인 = yup.object({
  corp_nm: yup.string().required('사무소명을 입력해주세요.'),
  corp_region_cd: yup.string().required('소속 지방회를 입력해주세요.')
});

const 보험가입_가입정보_세무사_법인 = yup.object({
  corp_ceo_nm: yup.string().required('대표자명을 입력해주세요'),
  corp_region_cd: yup.string().required('소속 지방회를 입력해주세요.')
});

const 세무사_법인_보험계약 = yup.object({
  cbr_data: yup.array().of(
    yup.object({
      cbr_nm: yup.string().required('세무사 명단 성명을 입력해주세요.'),
      cbr_brdt: yup.string().matches(/^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, '세무사 명단 생년월일 입력해주세요.'),
      cbr_regno: yup.string().matches(/^\d{3,7}$/, '세무사 명단 등록번호 입력해주세요.'),
      isCheck: yup.boolean().oneOf([true], '세무사 명단 인증해주세요.').required()
    })
  )
});

const 변호사_복수_보험계약 = yup.object({
  cbr_data: yup.array().min(1, `변호사 명단은 최소 1개 이상 입력해주세요.`).of(
      yup.object({
        cbr_nm: yup.string().required('변호사 명단 성명을 입력해주세요.'),
        cbr_brdt: yup.string().matches(/^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, '변호사 명단 생년월일 입력해주세요.'),
        cbr_regno: yup.string().matches(/^\d{3,7}$/, '변호사 명단 등록번호 입력해주세요.'),
        isCheck: yup.boolean().oneOf([true], '변호사 명단 인증해주세요.').required()
      })
  )
});

const 보험가입_가입정보_회계사_개인 = yup.object({
  corp_nm: yup.string().required('사무소명을 입력해주세요.')
});

const 보험가입_가입정보_변호사_개인 = yup.object({
  corp_nm: yup.string().required('사무소명을 입력해주세요.'),
  corp_region_cd: yup.string().required('소속 지방회를 입력해주세요.')
});

const 보험가입_가입정보_법무사_개인 = yup.object({
  corp_nm: yup.string().required('사무소명을 입력해주세요.'),
  corp_cnno: yup.string().matches(/^\d{3}-\d{2}-\d{5}$/, '사업자 번호를 입력해주세요.'),
  corp_telno1: yup.string().matches(/^\d{2,3}$/, '사무소 전화를 입력해주세요.'),
  corp_telno2: yup.string().matches(/^\d{3,4}$/, '사무소 전화를 입력해주세요.'),
  corp_telno3: yup.string().matches(/^\d{4}$/, '사무소 전화를 입력해주세요.'),
  corp_faxno1: yup.string().matches(/^\d{2,5}$/, '사무소 팩스를 입력해주세요.'),
  corp_faxno2: yup.string().matches(/^\d{3,4}$/, '사무소 팩스를 입력해주세요.'),
  corp_faxno3: yup.string().matches(/^\d{4}$/, '사무소 팩스를 입력해주세요.'),
  corp_cust_nm: yup.string().required('담당자 성명을 입력해주세요.'),
  //corp_cust_email: yup.string().matches(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, '이메일을 정확히 입력하세요.'),
  corp_region_cd: yup.string().required('소속 지방회를 입력해주세요.'),
  corp_post: yup.string().required('사무소 우편번호를 입력해주세요.'),
  corp_addr: yup.string().required('사무소 주소를 입력해주세요.'),
  corp_addr_dtl: yup.string().required('사무소 상세 주소를 입력해주세요.')

});

const 보험가입_가입정보_변호사_복수 = yup.object({
  corp_ceo_nm: yup.string().required('대표자명을 입력해주세요'),
  corp_region_cd: yup.string().required('소속 지방회를 입력해주세요.')
});

const 보험변경_신청정보 = yup.object({
  apply_cd: yup.string().required('변경구분을 입력해주세요.'),
  apply_posted_dt: yup.string().required('변경개시일을 입력해주세요.'),
  apply_content: yup.string().required('변경상세를 입력해주세요.'),
  nm: yup.string().required('담당자명을 입력해주세요.'),
  tel: yup.string().required('연락처를 입력해주세요.'),
  email: yup.string().required('이메일을 입력해주세요.')
});

const 보험가입_변리사법인기본명단보험계약 = yup.object({
  cbr_cnt: yup.string().required('소속 변호사 수를 입력해주세요.'),
  ...보험가입_변호사법인매출액.fields,
  ...보험가입_변리사보험계약.fields,
  insr_income_filename: yup.string().required('손익계산서를 첨부해주세요.')
});

const 증권정보 = yup.object({
  business_cd: yup.string().required('전문인 구분을 입력해주세요.'),
  user_cd: yup.string().required('사용자 구분을 입력해주세요.'),
  base_year: yup.string().required('증권년도를 입력해주세요.'),
  ver: yup.string().required('보험시작일을 입력해주세요.'),
  insr_st_dt: yup.string().required('보험종료일를 입력해주세요.'),
  insr_cncls_dt: yup.string().required('보험일수를 입력해주세요.'),
  days: yup.string().required('사무소 우편번호를 입력해주세요.'),
  insurance_no: yup.string().required('증권번호를 입력해주세요.'),
  insurance_nm: yup.string().required('보험명을 입력해주세요.'),
  use_yn: yup.string().required('사용유무를 입력해주세요.'),
  contents: yup.string().required('보험료표를 입력해주세요.'),
});

export const InsuranceYup = {

  MODIFY_FORM: yup.object().shape({
    ...보험변경_신청정보.fields
  }),
    
  /** ============================================================================
   *  사이트 : 세무사
   *  ============================================================================
   */
  TAX_COR_TAB1: yup.object().shape({
    ...보험가입_공통가입정보.fields,
    ...보험가입_가입정보_세무사_법인.fields
  }),
  TAX_COR_TAB2: yup.object().shape({
    ...보험가입_공통보험계약.fields,
    ...세무사_법인_보험계약.fields
  }),
  TAX_COR_TAB3: yup.object().shape({
    ...보험가입_공통약관동의.fields
  }),

  TAX_IND_TAB1: yup.object().shape({
    ...보험가입_공통가입정보.fields,
    ...보험가입_가입정보_세무사_개인.fields
  }),
  TAX_IND_TAB2: yup.object().shape({
    ...보험가입_공통보험계약.fields,
    ...세무사_법인_보험계약.fields
  }),
  TAX_IND_TAB3: yup.object().shape({
    ...보험가입_공통약관동의.fields
  }),

  /** ============================================================================
   *  사이트 : 회계사
   *  ============================================================================
   */
  ACC_IND_TAB1: yup.object().shape({
    ...보험가입_공통가입정보.fields,
    ...보험가입_가입정보_회계사_개인.fields
  }),
  ACC_IND_TAB2: yup.object().shape({
    ...보험가입_공통보험계약.fields
  }),
  ACC_IND_TAB3: yup.object().shape({
    ...보험가입_공통약관동의.fields
  }),

  /** ============================================================================
   *  사이트 : 변호사
   *  ============================================================================
   */
  ADV_IND_TAB1: yup.object().shape({
    ...보험가입_공통가입정보.fields,
    ...보험가입_가입정보_변호사_개인.fields
  }),
  ADV_IND_TAB2: yup.object().shape({
    ...보험가입_변호사기본보험계약.fields
  }),
  ADV_IND_TAB3: yup.object().shape({
    ...보험가입_변호사특약보험계약.fields
  }),
  ADV_IND_TAB4: yup.object().shape({
    ...보험가입_공통약관동의.fields
  }),

  ADV_JNT_TAB1: yup.object().shape({
    ...보험가입_공통가입정보.fields,
    ...보험가입_가입정보_변호사_복수.fields
  }),
  ADV_JNT_TAB2: yup.object().shape({
    ...보험가입_변호사기본보험계약.fields,
    ...변호사_복수_보험계약.fields
  }),
  ADV_JNT_TAB3: yup.object().shape({
    ...보험가입_변호사특약보험계약.fields
  }),
  ADV_JNT_TAB4: yup.object().shape({
    ...보험가입_공통약관동의.fields
  }),

  /** ============================================================================
   *  사이트 : 관세사
   *  ============================================================================
   */
  CAA_IND_TAB1: yup.object().shape({
    ...보험가입_관세사개인가입정보.fields,
    ...보험가입_관세사가입정보.fields,
  }),
  CAA_IND_TAB2: yup.object().shape({
    ...보험가입_공통보험계약.fields
  }),
  CAA_IND_TAB3: yup.object().shape({
    ...보험가입_관세사특약보험계약.fields
  }),
  CAA_IND_TAB4: yup.object().shape({
    ...보험가입_공통약관동의.fields
  }),

  CAA_JNT_TAB1: yup.object().shape({
    ...보험가입_관세사복합가입정보.fields,
    ...보험가입_관세사가입정보.fields,
  }),
  CAA_JNT_TAB2: yup.object().shape({
    ...보험가입_공통보험계약.fields,
    ...보험가입_관세사기본복합보험계약.fields
  }),
  CAA_JNT_TAB3: yup.object().shape({
    ...보험가입_관세사특약보험계약.fields
  }),
  CAA_JNT_TAB4: yup.object().shape({
    ...보험가입_공통약관동의.fields
  }),

  CAA_COR_TAB1: yup.object().shape({
    ...보험가입_관세사복합가입정보.fields,
    ...보험가입_관세사가입정보.fields,
  }),
  CAA_COR_TAB2: yup.object().shape({
    ...보험가입_공통보험계약.fields,
    ...보험가입_관세사기본복합보험계약.fields
  }),
  CAA_COR_TAB3: yup.object().shape({
    ...보험가입_관세사특약보험계약.fields
  }),
  CAA_COR_TAB4: yup.object().shape({
    ...보험가입_공통약관동의.fields
  }),

  /** ============================================================================
   *  사이트 : 변리사
   *  ============================================================================
   */
  PAT_IND_TAB1: yup.object().shape({
    ...보험가입_관세사개인가입정보.fields,
    ...보험가입_관세사가입정보.fields
  }),
  PAT_IND_TAB2: yup.object().shape({
    ...보험가입_변리사보험계약.fields
  }),
  PAT_IND_TAB3: yup.object().shape({
    ...보험가입_공통약관동의.fields
  }),

  PAT_JNT_TAB1: yup.object().shape({
    ...보험가입_관세사복합가입정보.fields,
    ...보험가입_관세사가입정보.fields,
  }),
  PAT_JNT_TAB2: yup.object().shape({
    ...보험가입_변리사보험계약.fields,
    ...보험가입_변리사기본명단보험계약.fields
  }),
  PAT_JNT_TAB3: yup.object().shape({
    ...보험가입_공통약관동의.fields
  }),

  PAT_COR_TAB1: yup.object().shape({
    ...보험가입_관세사복합가입정보.fields,
    ...보험가입_관세사가입정보.fields,
  }),
  PAT_COR_TAB2: yup.object().shape({
    ...보험가입_변리사법인기본명단보험계약.fields,
  }),
  PAT_COR_TAB3: yup.object().shape({
    ...보험가입_공통약관동의.fields
  }),

  /** ============================================================================
   *  사이트 : 법무사
   *  ============================================================================
   */
  LAW_IND_TAB1: yup.object().shape({
    ...보험가입_가입정보_법무사_개인.fields
  }),
  LAW_IND_TAB2: yup.object().shape({
    ...보험가입_변호사기본보험계약.fields
  }),
  LAW_IND_TAB3: yup.object().shape({
    ...보험가입_변호사특약보험계약.fields
  }),
  LAW_IND_TAB4: yup.object().shape({
    ...보험가입_공통약관동의.fields
  }),

  LAW_JNT_TAB1: yup.object().shape({
    ...보험가입_공통가입정보.fields,
    ...보험가입_가입정보_변호사_복수.fields
  }),
  LAW_JNT_TAB2: yup.object().shape({
    ...보험가입_변호사기본보험계약.fields,
    ...법무사_복수_보험계약.fields
  }),
  LAW_JNT_TAB3: yup.object().shape({
    ...보험가입_변호사특약보험계약.fields
  }),
  LAW_JNT_TAB4: yup.object().shape({
    ...보험가입_공통약관동의.fields
  }),
  /** ============================================================================
   *  사이트 : 관리자
   *  ============================================================================
   */
  MASTER_AJ3 : yup.object().shape({
    ...증권정보.fields
  })
};
