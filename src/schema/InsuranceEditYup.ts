import yup from '../config/yupConfig';

const 보험변경신청_세무사 = yup.object({
  apply_cd: yup.string().required('변경구분을 입력해주세요.'),
  apply_posted_dt: yup.string().required('변경개시일을 입력해주세요.'),
  apply_content: yup.string().required('변경상세를 입력해주세요.'),
  nm: yup.string().required('담당자명을 입력해주세요.'),
  tel: yup.string().required('연락처를 입력해주세요.'),
  email: yup.string().required('이메일을 입력해주세요.'),
});

export const InsuranceYup = {
  TAX_COR_TAB1: yup.object().shape({
    ...보험변경신청_세무사.fields
  })


};
