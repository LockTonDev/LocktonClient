import yup from '../config/yupConfig';

export const insrScm2 = yup.object({
  // INSR_ST_DT: yup.date().required() // 보험시작일자
  // INSR_CNCLS_DT: yup.date().required(), // 보험종료일자
  // INSR_PBLC_BRDN_RT: yup.string().required() // 공동보험율
  // INSR_CLM_LT_AMT: yup.string().required(), // 보상한도
  // INSR_PSNL_BRDN_AMT: yup.string().required() // 자기부담금
});
