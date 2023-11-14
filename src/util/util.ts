/**
 * 윤년계산
 * @param year
 * @returns
 */
export const isLeapYear = (year: number) => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

/**
 * 날짜 비교
 * @param sSDt
 * @param sEDt
 * @returns
 */
export const getDateDiff = (sSDt: string, sEDt: string, maxDays:number) => {
  if (sSDt == null || sEDt == null) return maxDays;

  const date1 = new Date(sSDt);
  const date2 = new Date(sEDt);

  // calculate the difference in milliseconds
  const diffMs = Math.abs(date2.getTime() - date1.getTime());

  // convert milliseconds to days
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * 문자열 금액을 숫자로 계산하여 문자열로 리턴하기
 *
 * @param amount
 * @param num
 * @returns
 */
export const calByString = (amount: string, num: number, maxAmt: number) => {
  const koreanRegex = /[ㄱ-ㅎ가-힣]/;
  if (amount == null || amount == undefined || !koreanRegex.test(amount)) return '';
  if (num == 0 || num == null || num == undefined) num = 1;
  if (maxAmt == 0 || maxAmt == null || maxAmt == undefined) maxAmt = 0;
  const amtNumber = parseInt(amount);
  const amtHangul = amount.match(/[ㄱ-ㅎㅏ-ㅣ가-힣]+/g).join(''); // 한글만 추출하여 문자열로 변환

  const unit = {
    만원: 10000,
    백만원: 1000000,
    천만원: 10000000,
    억원: 100000000
  };

  const totalAmount = amtNumber * num * unit[amtHangul];
  const units = Object.entries(unit).reverse();

  let result = '';
  let remainingAmount = totalAmount;

  // 맥스값 설정
  if (maxAmt > 0 && remainingAmount > maxAmt) {
    remainingAmount = maxAmt;
  }

  for (const [unitString, unitValue] of units) {
    if (remainingAmount >= unitValue) {
      const count = Math.floor(remainingAmount / unitValue);
      remainingAmount -= count * unitValue;
      result += count + unitString + '';
    }
  }

  return result.trim().replace(/원/g, '') + '원';
};

export const getEmpty = (str: string): string => {
  const nullOrInvalidDateRegex = /^(null|invalid date)$/i;
  if (str == undefined || str === null || nullOrInvalidDateRegex.test(str)) {
    return '';
  }
  return str;
};

export const convertStringToNumber = (str: string): number => {
  const numRegEx = /[\d]+(?:,[\d]+)*(?:\.[\d]+)?/g; // 숫자 추출 정규식
  const unitRegEx = /(억|천만|백만|십만)/g; // 단위 추출 정규식
  const unitMap = {
    억: 100000000,
    천만: 10000000,
    백만: 1000000,
    십만: 100000
  }; // 단위에 대한 값 매핑

  let result = 0;
  try {
    // 문자열에서 숫자와 단위를 추출하여 배열로 저장
    const numbers =
      str.match(numRegEx)?.map(n => Number(n.replace(/,/g, ''))) ?? [];
    const units = str.match(unitRegEx) ?? [];

    // 각 숫자와 단위에 대해 값을 계산하여 결과값에 반영
    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i];
      const unit = units[i];

      // 단위에 대한 값이 없으면, 해당 숫자를 그대로 결과값에 반영
      if (!unit) {
        result += number;
      } else {
        // 단위에 대한 값이 있으면, 해당 값으로 숫자를 곱하여 결과값에 반영
        const unitValue = unitMap[unit];
        // console.log(unitMap[unit]);
        result += number * unitValue;
      }
      //  console.log(result);
    }
  } catch (e) {
    result = str;
  }

  return result;
};

export const genYearItems = (str: string): any => {
  const currentYear: number = new Date().getFullYear();
  const insrYearCdItems: { title: string; value: string;}[] = [];

  for (let year: number = 2022; year <= currentYear; year++) {
    insrYearCdItems.push({ title: String(year), value: String(year)});
  }

  return insrYearCdItems;
};

export const dateCompareWithNow = (endDate : string) =>{
  let today = new Date();
  let gap = new Date(endDate +" 23:59:59").getTime() - today;
/*
  let diffDay = String(Math.floor(gap / (1000 * 60 * 60 * 24)));
  let diffHour = String(Math.floor((gap / (1000 * 60 * 60)) % 24));
  let diffMin = String(Math.floor((gap / (1000 * 60)) % 60));
  let diffSec = String(Math.floor((gap / 1000) % 60));

  diffDay = diffDay >= 10 ? diffDay : "0" + diffDay;
  diffHour = diffHour >= 10 ? diffHour : "0" + diffHour;
  diffMin = diffMin >= 10 ? diffMin : "0" + diffMin;
  diffSec = diffSec >= 10 ? diffSec : "0" + diffSec;
*/
  return (gap >= 0) ?true:false
}