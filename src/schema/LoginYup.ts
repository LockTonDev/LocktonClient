import yup from '../config/yupConfig';

const loginSchema = yup.object({
  //USER_TYPE: yup.string().required(),
  // user_id: yup
  //   .string()
  //   .required()
  //   .matches(
  //     /^(?=.*[a-z0-9])[a-z0-9]{6,20}$/,
  //     '6 ~ 20자 이하, 영어 및 숫자 조합으로 입력하세요.'
  //   ),
  // user_pwd: yup
  //   .string()
  //   .required()
  //   .matches(
  //     /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{8,20}$/,
  //     '8 ~ 20자 이하 영어, 숫자, 특수문자 조합으로 입력하세요.'
  //   )
});

export { loginSchema };
