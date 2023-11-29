import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: '사용할수 없는 값입니다.',
    required: '필수 입력사항 입니다.',
    oneOf: '다음 값 중 하나여야 합니다.: ${values}',
    notOneOf: '다음 값 중 하나가 아니어야 합니다.: ${values}',
    notType: function notType(_ref) {
      var path = _ref.path,
        type = _ref.type,
        value = _ref.value,
        originalValue = _ref.originalValue;
      var isCast = originalValue != null && originalValue !== value;
      if (type == 'number') {
        var msg = ' 숫자만 입력해주세요.';
      } else if (type == 'date') {
        var msg = ' 날짜 형식으로 입력해주세요.';
      } else {
        var msg = '필수 입력사항 입니다.';
        // var msg = path + ' 항목은 `' + type + '` 형식으로 입력해주세요.';
      }
      return msg;
    },
    defined: '정의되지 않았습니다.'
  },
  string: {
    length: '${length}자로 입력해주세요.',
    min: '${min}자 이상 입력바랍니다.',
    max: '${max}자 까지 입력됩니다.',
    email: '이메일 형식이 아닙니다.'
  }
});

export default yup;
