import yup from '../config/yupConfig';
/** =======================================================================
 *    공통
 *  ========================================================================
 */
const 회원가입_공통_약관동의 = yup.object({
  agr1_yn: yup.string().oneOf(['Y'], '록톤코리아 서비스 이용약관에 동의해주세요.'),
  agr2_yn: yup.string().oneOf(['Y'], '개인(신용)정보 처리 상세에 동의해주세요.')
});

const 회원가입_공통_아이디_개인 = yup.object({
  user_id: yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,20}$/, '아이디는 6 ~ 20자 이하, 영어 및 숫자 조합으로 입력하세요.')
});

const 회원가입_공통_아이디_법인 = yup.object({
  user_id: yup.string().matches(/^[0-9]{3}-[0-9]{2}-[0-9]{5}$/, '아이디(사업자 번호)를 정확히 입력하세요.')
});

const 회원가입_공통_아이디_합동 = yup.object({
  user_id: yup.string().matches(/^[0-9]{3}-[0-9]{2}-[0-9]{5}$/, '아이디(사업자 번호)를 정확히 입력하세요.')
});

const 회원가입_공통_비밀번호 = yup.object({
  user_pwd: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, '비밀번호는 8 ~ 20자 이하 영어, 숫자, 특수문자(@$!%*#?&) 조합으로 입력하세요.'),
  user_pwd_chk: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, '비밀번호는 8 ~ 20자 이하 영어, 숫자, 특수문자(@$!%*#?&) 조합으로 입력하세요.')
    .oneOf([yup.ref('user_pwd'), null], '입력한 비밀번호가 다릅니다.')
});

const 회원가입_공통_비밀번호_수정 = yup.object({
  new_user_pwd: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, '비밀번호는 8 ~ 20자 이하 영어, 숫자, 특수문자(@$!%*#?&) 조합으로 입력하세요.'),
  new_user_pwd_chk: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, '비밀번호는 8 ~ 20자 이하 영어, 숫자, 특수문자(@$!%*#?&) 조합으로 입력하세요.')
    .oneOf([yup.ref('new_user_pwd'), null], '입력한 비밀번호가 다릅니다.')
});

const 회원가입_공통_이메일 = yup.object({
  user_email: yup.string().matches(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, '이메일을 정확히 입력하세요.')
});

const 회원가입_공통_사무소정보 = yup.object({
  corp_nm: yup.string().required('사무소명을 입력해주세요'),
  corp_cnno: yup.string().matches(/^[0-9]{3}-[0-9]{2}-[0-9]{5}$/, '사업자번호를 정확히 입력하세요.'),
  corp_telno1: yup.string().matches(/^\d{2,3}$/, '사무소 전화를 입력해주세요.'),
  corp_post: yup.string().required('사무소 우편번호를 입력해주세요.'),
  corp_telno2: yup.string().matches(/^\d{3,4}$/, '사무소 전화를 입력해주세요.'),
  corp_telno3: yup.string().matches(/^\d{4}$/, '사무소 전화를 입력해주세요.'),
  corp_faxno1: yup.string().matches(/^\d{2,5}$/, '사무소 팩스를 입력해주세요.'),
  corp_faxno2: yup.string().matches(/^\d{3,4}$/, '사무소 팩스를 입력해주세요.'),
  corp_faxno3: yup.string().matches(/^\d{4}$/, '사무소 팩스를 입력해주세요.'),
  corp_cust_nm: yup.string().required('담당자 성명을 입력해주세요.'),
  corp_addr: yup.string().required('사무소 주소를 입력해주세요.'),
  corp_addr_dtl: yup.string().required('사무소 상세 주소를 입력해주세요.'),
});

const 회원가입_합동_사무소정보 = yup.object({
  corp_ceo_nm: yup.string().required('대표자 성명을 선택해주세요.'),
  corp_type: yup.string().required('사무소 형태를 선택해주세요.'),
  corp_bnno: yup.string().when('corp_type', {
    is: (value) => value === '003',
    then: yup.string().required('법인번호를 입력하세요.'),
  }),
  corp_cnno: yup.string().matches(/^[0-9]{3}-[0-9]{2}-[0-9]{5}$/, '사업자번호를 정확히 입력하세요.'),
  corp_telno1: yup.string().matches(/^\d{2,3}$/, '사무소 전화를 입력해주세요.'),
  corp_telno2: yup.string().matches(/^\d{3,4}$/, '사무소 전화를 입력해주세요.'),
  corp_telno3: yup.string().matches(/^\d{4}$/, '사무소 전화를 입력해주세요.'),
  corp_faxno1: yup.string().matches(/^\d{2,5}$/, '사무소 팩스를 입력해주세요.'),
  corp_faxno2: yup.string().matches(/^\d{3,4}$/, '사무소 팩스를 입력해주세요.'),
  corp_faxno3: yup.string().matches(/^\d{4}$/, '사무소 팩스를 입력해주세요.'),
  corp_cust_nm: yup.string().required('담당자 성명을 입력해주세요.'),
  corp_post: yup.string().required('사무소 우편번호를 입력해주세요.'),
  corp_addr: yup.string().required('사무소 주소를 입력해주세요.'),
  corp_addr_dtl: yup.string().required('사무소 상세 주소를 입력해주세요.'),
});

const 회원가입_공통_개인 = yup.object({
  user_hpno: yup.string().required('휴대전화를 입력해주세요.'),
  user_nm: yup.string().required('이름을 입력해주세요.'),
  user_birth: yup.string().matches(/^[0-9]{6}$/, '6자리 생년월일을 정확히 입력해주세요.'),
  user_regno: yup.string().required('등록번호를 입력해주세요.'),
  is_user_regno: yup.boolean().oneOf([true], '등록번호 인증을 실행하세요.'),
  is_user_email: yup.boolean().oneOf([true], '이메일 중복확인을 실행하세요.'),
  is_user_id: yup.boolean().oneOf([true], '아이디 중복확인을 실행하세요.'),
});

const 회원가입_공통_법인 = yup.object({
  user_id: yup.string().required('아이디를 입력해주세요.'),
  user_nm: yup.string().required('법인명을 입력해주세요.'),
  corp_ceo_nm: yup.string().required('대표자명을 입력해주세요'),
  corp_bnno: yup.string().matches(/^[0-9]{6}-[0-9]{7}$/, '법인번호를 정확히 입력하세요.')
});

const 회원가입_공통_합동 = yup.object({
  user_id: yup.string().required('아이디를 입력해주세요.'),
  user_hpno: yup.string().required('휴대전화를 입력해주세요.'),
  user_nm: yup.string().required('사무소명을 입력해주세요.'),
});

const 회원수정_공통_사무소정보 = yup.object({
    ...회원가입_공통_사무소정보.fields
});

const 회원수정_합동_사무소정보 = yup.object({
  ...회원가입_합동_사무소정보.fields
});


/** =======================================================================
 *    회원가입 세무사 
 *  ========================================================================
 */
const 회원가입_세무사_개인 = yup.object({
  corp_region_cd: yup.string().required('소속 지방회를 입력해주세요.')
});

const 회원가입_세무사_법인 = yup.object({
  corp_region_cd: yup.string().required('소속 지방회를 입력해주세요.')
});

const 회원수정_세무사_개인 = yup.object({
  corp_region_cd: yup.string().required('소속 지방회를 입력해주세요.')
});

const 회원수정_세무사_법인 = yup.object({
  corp_region_cd: yup.string().required('소속 지방회를 입력해주세요.')
});


/** =======================================================================
 *    회계사
 *  ========================================================================
 */


/** =======================================================================
 *    회원가입 변호사
 *  ========================================================================
 */
const 회원가입_변호사_개인 = yup.object({
  corp_region_cd: yup.string().required('소속 지방회를 입력해주세요.')
});

const 회원가입_변호사_합동 = yup.object({
  corp_region_cd: yup.string().required('소속 지방회를 입력해주세요.')
});

const 회원수정_변호사_개인 = yup.object({
  corp_region_cd: yup.string().required('소속 지방회를 입력해주세요.')
});

const 회원수정_변호사_합동 = yup.object({
  corp_region_cd: yup.string().required('소속 지방회를 입력해주세요.')
});

const UserUpdateYup = yup.object({});

export const UserYup = {
  /** ============================================================================
   *  사이트 : 공통
   *  ============================================================================
   */
  MODIFY_PASSWORD: yup.object().shape({
    ...회원가입_공통_비밀번호_수정.fields
  }),

  VALID_USER_ID_IND: yup.object().shape({
    ...회원가입_공통_아이디_개인.fields
  }),
  VALID_USER_ID_COR: yup.object().shape({
    ...회원가입_공통_아이디_법인.fields
  }),
  VALID_USER_ID_JNT: yup.object().shape({
    ...회원가입_공통_아이디_합동.fields
  }),


  VALID_EMAIL: yup.object().shape({
    ...회원가입_공통_이메일.fields
  }),

  /** ============================================================================
   *  사이트 : 세무사
   *  ============================================================================
   */
  INSERT_TAX_IND_STEP1: yup.object().shape({
    ...회원가입_공통_약관동의.fields
  }),
  INSERT_TAX_IND_STEP2: yup.object().shape({
    ...회원가입_공통_사무소정보.fields,
    ...회원가입_공통_비밀번호.fields,
    ...회원가입_공통_개인.fields,
    ...회원가입_세무사_개인.fields
  }),
  INSERT_TAX_COR_STEP1: yup.object().shape({
    ...회원가입_공통_약관동의.fields
  }),

  INSERT_TAX_COR_STEP2: yup.object().shape({
    ...회원가입_공통_사무소정보.fields,
    ...회원가입_공통_비밀번호.fields,
    ...회원가입_공통_법인.fields,
    ...회원가입_세무사_법인.fields
  }),

  MODIFY_TAX_IND: yup.object().shape({
    ...회원수정_공통_사무소정보.fields,
    ...회원가입_공통_이메일.fields,
    ...회원수정_세무사_개인.fields,
  }),

  MODIFY_TAX_COR: yup.object().shape({
    ...회원수정_공통_사무소정보.fields,
    ...회원가입_공통_이메일.fields,
    ...회원수정_세무사_법인.fields
  }),

  /** ============================================================================
   *  사이트 : 회계사
   *  ============================================================================
   */
  INSERT_ACC_IND_STEP1: yup.object().shape({
    ...회원가입_공통_약관동의.fields
  }),
  INSERT_ACC_IND_STEP2: yup.object().shape({
    ...회원가입_공통_사무소정보.fields,
    ...회원가입_공통_이메일.fields,
    ...회원가입_공통_비밀번호.fields,
    ...회원가입_공통_개인.fields
  }),

  MODIFY_ACC_IND: yup.object().shape({
    ...회원수정_공통_사무소정보.fields,
    ...회원가입_공통_이메일.fields
  }),

  /** ============================================================================
   *  사이트 : 변호사
   *  ============================================================================
   */
  INSERT_ADV_IND_STEP1: yup.object().shape({
    ...회원가입_공통_약관동의.fields
  }),
  INSERT_ADV_IND_STEP2: yup.object().shape({
    ...회원가입_공통_개인.fields,
    ...회원가입_공통_이메일.fields,
    ...회원가입_공통_비밀번호.fields,
    ...회원가입_공통_사무소정보.fields,
    ...회원가입_변호사_개인.fields
  }),

  MODIFY_ADV_IND: yup.object().shape({
    ...회원수정_공통_사무소정보.fields,
    ...회원가입_공통_이메일.fields
  }),

  INSERT_ADV_JNT_STEP1: yup.object().shape({
    ...회원가입_공통_약관동의.fields
  }),
  INSERT_ADV_JNT_STEP2: yup.object().shape({
    ...회원가입_합동_사무소정보.fields,
    ...회원가입_공통_합동.fields,
    ...회원가입_공통_이메일.fields,
    ...회원가입_공통_비밀번호.fields,
    ...회원가입_변호사_합동.fields
  }),

  MODIFY_ADV_JNT: yup.object().shape({
    ...회원수정_합동_사무소정보.fields,
    ...회원가입_공통_이메일.fields
  })
};
