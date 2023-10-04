import yup from '../config/yupConfig';

export const insrScm3 = yup.object({
  USER_NM: yup.string().required(),
  USER_BRDT: yup
    .string()
    .required()
    .matches(/^(?=.*[a-z0-9])[a-z0-9]{6,20}$/, '2022-12-31 형태로 입력하세요.'),
  USER_REGNO: yup.string().required(),

  CORP_NM: yup.string().required(),
  CORP_NO: yup
    .string()
    .required()
    .matches(
      /^\d{2,3}-\d{3,4}-\d{4}$/,
      '6 ~ 20자 이하, 영어 및 숫자 조합으로 입력하세요.'
    ),

  CORP_TELNO: yup
    .string()
    .required()
    .matches(
      /^(0[2-8][0-5]?|01[01346-9])-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/,
      '올바른 전화번호를 입력하세요. 02-123-3456'
    ),
  CORP_TAXNO: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z0-9])[a-z0-9]{6,20}$/,
      '6 ~ 20자 이하, 영어 및 숫자 조합으로 입력하세요.'
    ),
  CORP_POST: yup.string().required(),
  CORP_ADDR: yup.string().required(),
  CORP_ADDR_DTL: yup.string().required(),
  CORP_CUST_NM: yup.string().required(),
  CORP_CUST_HPNO: yup
    .string()
    .required()
    .matches(
      /^\d{3}-\d{3,4}-\d{4}$/,
      '올바른 휴대폰 번호를 입력하세요. ex) 010-1234-5678'
    ),
  CORP_CUST_EMAIL: yup
    .string()
    .required()
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      '올바른 E-Mail 주소를 입력하세요.'
    )
});
