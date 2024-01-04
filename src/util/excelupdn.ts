import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { EXCEL_TAX_IND, EXCEL_TAX_COR, EXCEL_ACC_IND, InsuranceDTO, TRXDataDTO, UserDTO, CommonCode, ParamsDTO,
  EXCEL_ADV_IND, EXCEL_ADV_JNT, EXCEL_CAA_IND, EXCEL_CAA_JNT, EXCEL_CAA_COR, EXCEL_PAT_IND, EXCEL_PAT_JNT, EXCEL_PAT_COR } from '@/model';
import { convertStringToNumber, getEmpty } from '../util/util';
import dayjs from 'dayjs';

let businessCdItems = [];
let statusCdItems = [];
let userCdItems = [];
let regionCdItems = [];
let trxCdItems = [];

async function initCode() {
  businessCdItems = await CommonCode.getCodeList('COM001');
  statusCdItems = await CommonCode.getCodeList('COM030');
  userCdItems = await CommonCode.getCodeList('TAX002');
  regionCdItems = await CommonCode.getCodeList('TAX001');
  trxCdItems = await CommonCode.getCodeList('COM031');
}
/*

const EXCEL_NUM_CELL_TAX_IND = ['G','I','O','R','AC','AD','AF','AK','AO','AP','AQ'];
const EXCEL_NUM_CELL_TAX_COR = ['H','I','P','Q','S','V','W','AG','AH','AJ','AN','AO','AP','AQ'];

const EXCEL_NUM_CELL_CAA_IND = ['G','I','O','R','AC','AD','AF','AK','AO','AP','AQ'];
const EXCEL_NUM_CELL_CAA_COR = ['H','I','P','Q','S','V','W','AG','AH','AJ','AN','AO','AP','AQ'];

const EXCEL_NUM_CELL_ADV_IND = ['G','I','O','R','AC','AD','AF','AK','AO','AP','AQ'];
const EXCEL_NUM_CELL_ADV_JNT = ['H','I','P','Q','S','V','W','AG','AH','AJ','AN','AO','AP','AQ'];
*/

// 초기 호출
initCode();
/*
const EXCEL_NUM_MAPPERS = {
  TAX_IND: EXCEL_NUM_CELL_TAX_IND,
  TAX_COR: EXCEL_NUM_CELL_TAX_COR,
  ADV_IND: EXCEL_NUM_CELL_ADV_IND,
  ADV_JNT: EXCEL_NUM_CELL_ADV_JNT,
  ACC_IND: EXCEL_NUM_CELL_TAX_IND,
  CAA_IND: EXCEL_NUM_CELL_CAA_IND,
  CAA_COR: EXCEL_NUM_CELL_CAA_COR,
};
};*/

const EXCEL_MAPPERS = {
  TAX_IND: EXCEL_TAX_IND,
  TAX_COR: EXCEL_TAX_COR,
  ACC_IND: EXCEL_ACC_IND,
  ADV_IND: EXCEL_ADV_IND,
  ADV_JNT: EXCEL_ADV_JNT,
  CAA_IND: EXCEL_CAA_IND,
  CAA_JNT: EXCEL_CAA_JNT,
  CAA_COR: EXCEL_CAA_COR,
  PAT_IND: EXCEL_PAT_IND,
  PAT_JNT: EXCEL_PAT_JNT,
  PAT_COR: EXCEL_PAT_COR,
};

const ROW_MAPPERS = {
  TAX_IND: mapperRow_TAX_IND,
  TAX_COR: mapperRow_TAX_COR,
  ACC_IND: mapperRow_TAX_IND,
  ADV_IND: mapperRow_ADV_IND,
  ADV_JNT: mapperRow_ADV_JNT,
  CAA_IND: mapperRow_CAA_IND,
  CAA_JNT: mapperRow_CAA_JNT,
  CAA_COR: mapperRow_CAA_COR,
  PAT_IND: mapperRow_PAT_IND,
  PAT_JNT: mapperRow_PAT_JNT,
  PAT_COR: mapperRow_PAT_COR,
};


/**
 * 세무사_개인 입금 엑셀업로드
 *
 * @param event
 * @returns
 */
export const UPLOAD_EXCEL_INSURANCE_TAX_TRE_IND = async (event: any) => {
  return new Promise(async (resolve, reject) => {
    let excelList = [];

    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const workbook = new Workbook();
        workbook.xlsx.load(data).then(() => {
          const worksheet = workbook.getWorksheet(1);

          worksheet.eachRow((row, index) => {
            if (index === 1) return;
            let insuranceDTO = new InsuranceDTO();
            let trxDataDTO1 = new TRXDataDTO();
            let trxDataDTO2 = new TRXDataDTO();

            insuranceDTO.insurance_uuid = row.getCell(EXCEL_TAX_IND.보험식별번호).value;
            insuranceDTO.insr_tot_paid_amt = row.getCell(EXCEL_TAX_IND.총입금액).value;
            insuranceDTO.insr_tot_unpaid_amt = row.getCell(EXCEL_TAX_IND.차액).value;

            insuranceDTO.status_nm = row.getCell(EXCEL_TAX_IND.상태).value;
            try {
              insuranceDTO.status_cd = statusCdItems.find(item => item.title == insuranceDTO.status_nm).value;
            } catch (e) {
              insuranceDTO.status_cd = '';
              // console.log(e);
            }

            trxDataDTO1.trx_nm = row.getCell(EXCEL_TAX_IND.입금구분1).value;
            trxDataDTO1.trx_amt = row.getCell(EXCEL_TAX_IND.입금금액1).value;
            trxDataDTO1.trx_dt = dayjs(row.getCell(EXCEL_TAX_IND.처리일자1).value).format('YYYY-MM-DD');
            trxDataDTO1.rmk = row.getCell(EXCEL_TAX_IND.비고1).value;
            trxDataDTO1.acct_nm = row.getCell(EXCEL_TAX_IND.예금주명1).value;

            try {
              trxDataDTO1.trx_cd = trxCdItems.find(item => item.title == trxDataDTO1.trx_nm).value;
            } catch (e) {
              trxDataDTO1.trx_cd = '';
              // console.log(e);
            }

            trxDataDTO2.trx_nm = row.getCell(EXCEL_TAX_IND.입금구분2).value;
            trxDataDTO2.trx_amt = row.getCell(EXCEL_TAX_IND.입금금액2).value;
            trxDataDTO2.trx_dt = dayjs(row.getCell(EXCEL_TAX_IND.처리일자2).value).format('YYYY-MM-DD');
            trxDataDTO2.rmk = row.getCell(EXCEL_TAX_IND.비고2).value;
            trxDataDTO2.acct_nm = row.getCell(EXCEL_TAX_IND.예금주명2).value;

            try {
              trxDataDTO2.trx_cd = trxCdItems.find(item => item.title == trxDataDTO2.trx_nm).value;
            } catch (e) {
              trxDataDTO2.trx_cd = '';
              // console.log(e);
            }
            if (getEmpty(trxDataDTO1.trx_cd) !== '') {
              insuranceDTO.trx_data.push(trxDataDTO1);
            }
            if (getEmpty(trxDataDTO2.trx_cd) !== '') {
              insuranceDTO.trx_data.push(trxDataDTO2);
            }

            excelList.push(insuranceDTO);
          });

          resolve(excelList);
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

/**
 * 세무사_법인 입금 엑셀업로드
 *
 * @param event
 * @returns
 */
export const UPLOAD_EXCEL_INSURANCE_TAX_TRE_COR = async (event: any) => {
  return new Promise(async (resolve, reject) => {
    let excelList = [];

    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const workbook = new Workbook();
        workbook.xlsx.load(data).then(() => {
          const worksheet = workbook.getWorksheet(1);
          let insuranceDTO = null;
          let corp_bnno = null;

          worksheet.eachRow((row, index) => {
            if (index === 1) return;

            if (getEmpty(row.getCell(EXCEL_TAX_COR.보험식별번호).value) !== '') {
              insuranceDTO = new InsuranceDTO();

              insuranceDTO.insurance_uuid = row.getCell(EXCEL_TAX_COR.보험식별번호).value;
              insuranceDTO.insr_tot_paid_amt = row.getCell(EXCEL_TAX_COR.총입금액).value;
              insuranceDTO.insr_tot_unpaid_amt = row.getCell(EXCEL_TAX_COR.차액).value;

              insuranceDTO.status_nm = row.getCell(EXCEL_TAX_COR.상태).value;
              try {
                insuranceDTO.status_cd = statusCdItems.find(item => item.title == insuranceDTO.status_nm).value;
              } catch (e) {
                insuranceDTO.status_cd = '';
                // console.log(e);
              }

              if (getEmpty(row.getCell(EXCEL_TAX_COR.입금구분).value) !== '') {
                let trxDataDTO = new TRXDataDTO();

                trxDataDTO.trx_nm = row.getCell(EXCEL_TAX_COR.입금구분).value;
                trxDataDTO.trx_amt = row.getCell(EXCEL_TAX_COR.입금금액).value;
                trxDataDTO.trx_dt = dayjs(row.getCell(EXCEL_TAX_COR.처리일자).value).format('YYYY-MM-DD');
                trxDataDTO.rmk = row.getCell(EXCEL_TAX_COR.비고).value;
                trxDataDTO.acct_nm = row.getCell(EXCEL_TAX_COR.예금주명).value;

                try {
                  trxDataDTO.trx_cd = trxCdItems.find(item => item.title == trxDataDTO.trx_nm).value;
                } catch (e) {
                  trxDataDTO.trx_cd = '';
                  // console.log(e);
                }
                if (trxDataDTO.trx_cd) {
                  insuranceDTO.trx_data.push(trxDataDTO);
                }
              }

              excelList.push(insuranceDTO);
            } else {
              if (getEmpty(row.getCell(EXCEL_TAX_COR.입금구분).value) !== '') {
                let trxDataDTO = new TRXDataDTO();
                trxDataDTO.trx_nm = row.getCell(EXCEL_TAX_COR.입금구분).value;
                trxDataDTO.trx_amt = row.getCell(EXCEL_TAX_COR.입금금액).value;
                trxDataDTO.trx_dt = dayjs(row.getCell(EXCEL_TAX_COR.처리일자).value).format('YYYY-MM-DD');
                trxDataDTO.rmk = row.getCell(EXCEL_TAX_COR.비고).value;
                trxDataDTO.acct_nm = row.getCell(EXCEL_TAX_COR.예금주명).value;

                try {
                  trxDataDTO.trx_cd = trxCdItems.find(item => item.title == trxDataDTO.trx_nm).value;
                } catch (e) {
                  trxDataDTO.trx_cd = '';
                  // console.log(e);
                }

                if (trxDataDTO.trx_cd) {
                  excelList[excelList.length - 1].trx_data.push(trxDataDTO);
                }
              }
            }
          });

          resolve(excelList);
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};


/**
 * 변호사_개인 입금 엑셀업로드
 *
 * @param event
 * @returns
 */
export const UPLOAD_EXCEL_INSURANCE_ADV_TRE_IND = async (event: any) => {
  return new Promise(async (resolve, reject) => {
    let excelList = [];

    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const workbook = new Workbook();
        workbook.xlsx.load(data).then(() => {
          const worksheet = workbook.getWorksheet(1);

          worksheet.eachRow((row, index) => {
            if (index === 1) return;
            let insuranceDTO = new InsuranceDTO();
            let trxDataDTO1 = new TRXDataDTO();
            let trxDataDTO2 = new TRXDataDTO();

            insuranceDTO.insurance_uuid = row.getCell(EXCEL_TAX_IND.보험식별번호).value;
            insuranceDTO.insr_tot_paid_amt = row.getCell(EXCEL_TAX_IND.총입금액).value;
            insuranceDTO.insr_tot_unpaid_amt = row.getCell(EXCEL_TAX_IND.차액).value;

            insuranceDTO.status_nm = row.getCell(EXCEL_TAX_IND.상태).value;
            try {
              insuranceDTO.status_cd = statusCdItems.find(item => item.title == insuranceDTO.status_nm).value;
            } catch (e) {
              insuranceDTO.status_cd = '';
              // console.log(e);
            }

            trxDataDTO1.trx_nm = row.getCell(EXCEL_TAX_IND.입금구분1).value;
            trxDataDTO1.trx_amt = row.getCell(EXCEL_TAX_IND.입금금액1).value;
            trxDataDTO1.trx_dt = dayjs(row.getCell(EXCEL_TAX_IND.처리일자1).value).format('YYYY-MM-DD');
            trxDataDTO1.rmk = row.getCell(EXCEL_TAX_IND.비고1).value;
            trxDataDTO1.acct_nm = row.getCell(EXCEL_TAX_IND.예금주명1).value;

            try {
              trxDataDTO1.trx_cd = trxCdItems.find(item => item.title == trxDataDTO1.trx_nm).value;
            } catch (e) {
              trxDataDTO1.trx_cd = '';
              // console.log(e);
            }

            trxDataDTO2.trx_nm = row.getCell(EXCEL_TAX_IND.입금구분2).value;
            trxDataDTO2.trx_amt = row.getCell(EXCEL_TAX_IND.입금금액2).value;
            trxDataDTO2.trx_dt = dayjs(row.getCell(EXCEL_TAX_IND.처리일자2).value).format('YYYY-MM-DD');
            trxDataDTO2.rmk = row.getCell(EXCEL_TAX_IND.비고2).value;
            trxDataDTO2.acct_nm = row.getCell(EXCEL_TAX_IND.예금주명2).value;

            try {
              trxDataDTO2.trx_cd = trxCdItems.find(item => item.title == trxDataDTO2.trx_nm).value;
            } catch (e) {
              trxDataDTO2.trx_cd = '';
              // console.log(e);
            }
            if (getEmpty(trxDataDTO1.trx_cd) !== '') {
              insuranceDTO.trx_data.push(trxDataDTO1);
            }
            if (getEmpty(trxDataDTO2.trx_cd) !== '') {
              insuranceDTO.trx_data.push(trxDataDTO2);
            }

            excelList.push(insuranceDTO);
          });

          resolve(excelList);
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

/**
 * 세무사_법인 입금 엑셀업로드
 *
 * @param event
 * @returns
 */
export const UPLOAD_EXCEL_INSURANCE_ADV_TRE_JNT = async (event: any) => {
  return new Promise(async (resolve, reject) => {
    let excelList = [];

    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const workbook = new Workbook();
        workbook.xlsx.load(data).then(() => {
          const worksheet = workbook.getWorksheet(1);
          let insuranceDTO = null;
          let corp_bnno = null;

          worksheet.eachRow((row, index) => {
            if (index === 1) return;

            if (getEmpty(row.getCell(EXCEL_ADV_JNT.보험식별번호).value) !== '') {
              insuranceDTO = new InsuranceDTO();

              insuranceDTO.insurance_uuid = row.getCell(EXCEL_ADV_JNT.보험식별번호).value;
             // insuranceDTO.insr_tot_paid_amt = row.getCell(EXCEL_ADV_JNT.총입금액).value;
              insuranceDTO.insr_tot_paid_amt = row.getCell(EXCEL_ADV_JNT.총입금액).value ? row.getCell(EXCEL_ADV_JNT.총입금액).value: 0;
              insuranceDTO.insr_tot_unpaid_amt = row.getCell(EXCEL_ADV_JNT.차액).value;

              insuranceDTO.status_nm = row.getCell(EXCEL_ADV_JNT.상태).value;
              try {
                insuranceDTO.status_cd = statusCdItems.find(item => item.title == insuranceDTO.status_nm).value;
              } catch (e) {
                insuranceDTO.status_cd = '';
                // console.log(e);
              }

              if (getEmpty(row.getCell(EXCEL_ADV_JNT.입금구분).value) !== '') {
                let trxDataDTO = new TRXDataDTO();

                trxDataDTO.trx_nm = row.getCell(EXCEL_ADV_JNT.입금구분).value;
                trxDataDTO.trx_amt = row.getCell(EXCEL_ADV_JNT.입금금액).value;
                trxDataDTO.trx_dt = dayjs(row.getCell(EXCEL_ADV_JNT.처리일자).value).format('YYYY-MM-DD');
                trxDataDTO.rmk = row.getCell(EXCEL_ADV_JNT.비고).value;
                trxDataDTO.acct_nm = row.getCell(EXCEL_ADV_JNT.예금주명).value;

                try {
                  trxDataDTO.trx_cd = trxCdItems.find(item => item.title == trxDataDTO.trx_nm).value;
                } catch (e) {
                  trxDataDTO.trx_cd = '';
                  // console.log(e);
                }
                if (trxDataDTO.trx_cd) {
                  insuranceDTO.trx_data.push(trxDataDTO);
                }
              }

              excelList.push(insuranceDTO);
            } else {
              if (getEmpty(row.getCell(EXCEL_ADV_JNT.입금구분).value) !== '') {
                let trxDataDTO = new TRXDataDTO();
                trxDataDTO.trx_nm = row.getCell(EXCEL_ADV_JNT.입금구분).value;
                trxDataDTO.trx_amt = row.getCell(EXCEL_ADV_JNT.입금금액).value;
                trxDataDTO.trx_dt = dayjs(row.getCell(EXCEL_ADV_JNT.처리일자).value).format('YYYY-MM-DD');
                trxDataDTO.rmk = row.getCell(EXCEL_ADV_JNT.비고).value;
                trxDataDTO.acct_nm = row.getCell(EXCEL_ADV_JNT.예금주명).value;

                try {
                  trxDataDTO.trx_cd = trxCdItems.find(item => item.title == trxDataDTO.trx_nm).value;
                } catch (e) {
                  trxDataDTO.trx_cd = '';
                  // console.log(e);
                }

                if (trxDataDTO.trx_cd) {
                  excelList[excelList.length - 1].trx_data.push(trxDataDTO);
                }
              }
            }
          });

          resolve(excelList);
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};


/**
 * 세무사_개인 입금 엑셀업로드
 *
 * @param event
 * @returns
 */
export const UPLOAD_EXCEL_INSURANCE_ACC_IND_Y = async (event: any) => {
  UPLOAD_EXCEL_INSURANCE_ACC_IND_N(event);
};

/**
 * 세무사_개인 입금 엑셀업로드
 *
 * @param event
 * @returns
 */
export const UPLOAD_EXCEL_INSURANCE_ACC_IND_N = async (event: any) => {
  return new Promise(async (resolve, reject) => {
    let excelList = [];

    try {
      const file = event.target.files[0];
      // console.log(file);
      const reader = new FileReader();

      reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const workbook = new Workbook();
        workbook.xlsx.load(data).then(() => {
          const worksheet = workbook.getWorksheet(1);

          worksheet.eachRow((row, index) => {
            if (index === 1) return;
            let insuranceDTO = new InsuranceDTO();
            let trxDataDTO1 = new TRXDataDTO();
            let trxDataDTO2 = new TRXDataDTO();

            insuranceDTO.insurance_uuid = row.getCell(EXCEL_TAX_IND.보험식별번호).value;
            insuranceDTO.insr_tot_paid_amt = row.getCell(EXCEL_TAX_IND.총입금액).value;
            insuranceDTO.insr_tot_unpaid_amt = row.getCell(EXCEL_TAX_IND.차액).value;
            insuranceDTO.status_nm = row.getCell(EXCEL_ACC_IND.상태).value;

            try {
              insuranceDTO.status_cd = statusCdItems.find(item => item.title == insuranceDTO.status_nm).value;
            } catch (e) {
              insuranceDTO.status_cd = '';
              // console.log(e);
            }

            trxDataDTO1.trx_nm = row.getCell(EXCEL_ACC_IND.입금구분1).value;
            trxDataDTO1.trx_amt = row.getCell(EXCEL_ACC_IND.입금금액1).value;
            trxDataDTO1.trx_dt = dayjs(row.getCell(EXCEL_ACC_IND.처리일자1).value).format('YYYY-MM-DD');
            trxDataDTO1.rmk = row.getCell(EXCEL_ACC_IND.비고1).value;
            trxDataDTO1.acct_nm = row.getCell(EXCEL_ACC_IND.예금주명1).value;

            try {
              trxDataDTO1.trx_cd = trxCdItems.find(item => item.title == trxDataDTO1.trx_nm).value;
            } catch (e) {
              trxDataDTO1.trx_cd = '';
              // console.log(e);
            }

            trxDataDTO2.trx_nm = row.getCell(EXCEL_ACC_IND.입금구분2).value;
            trxDataDTO2.trx_amt = row.getCell(EXCEL_ACC_IND.입금금액2).value;
            trxDataDTO2.trx_dt = dayjs(row.getCell(EXCEL_ACC_IND.처리일자2).value).format('YYYY-MM-DD');
            trxDataDTO2.rmk = row.getCell(EXCEL_ACC_IND.비고2).value;
            trxDataDTO2.acct_nm = row.getCell(EXCEL_ACC_IND.예금주명2).value;

            try {
              trxDataDTO2.trx_cd = trxCdItems.find(item => item.title == trxDataDTO2.trx_nm).value;
            } catch (e) {
              trxDataDTO2.trx_cd = '';
              // console.log(e);
            }
            if (getEmpty(trxDataDTO1.trx_cd) !== '') {
              insuranceDTO.trx_data.push(trxDataDTO1);
            }
            if (getEmpty(trxDataDTO2.trx_cd) !== '') {
              insuranceDTO.trx_data.push(trxDataDTO2);
            }

            excelList.push(insuranceDTO);
          });

          resolve(excelList);
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

/**
 * 관세사_개인 입금 엑셀업로드
 *
 * @param event
 * @returns
 */
export const UPLOAD_EXCEL_INSURANCE_CAA_TRE_IND = async (event: any) => {
  return new Promise(async (resolve, reject) => {
    let excelList = [];

    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const workbook = new Workbook();
        workbook.xlsx.load(data).then(() => {
          const worksheet = workbook.getWorksheet(1);

          worksheet.eachRow((row, index) => {
            if (index === 1) return;
            if (!row.getCell(EXCEL_CAA_IND.순번).value || row.getCell(EXCEL_CAA_IND.순번).value < 1) return;
            let insuranceDTO = new InsuranceDTO();
            let trxDataDTO1 = new TRXDataDTO();
            let trxDataDTO2 = new TRXDataDTO();

            insuranceDTO.insurance_uuid = row.getCell(EXCEL_CAA_IND.보험식별번호).value;
            insuranceDTO.insr_tot_paid_amt = row.getCell(EXCEL_CAA_IND.총입금액).value;
            insuranceDTO.insr_tot_unpaid_amt = row.getCell(EXCEL_CAA_IND.차액).value;

            insuranceDTO.status_nm = row.getCell(EXCEL_CAA_IND.상태).value;
            try {
              insuranceDTO.status_cd = statusCdItems.find(item => item.title == insuranceDTO.status_nm).value;
            } catch (e) {
              insuranceDTO.status_cd = '';
              // console.log(e);
            }

            trxDataDTO1.trx_nm = row.getCell(EXCEL_CAA_IND.입금구분1).value;
            trxDataDTO1.trx_amt = row.getCell(EXCEL_CAA_IND.입금금액1).value;
            trxDataDTO1.trx_dt = dayjs(row.getCell(EXCEL_CAA_IND.처리일자1).value).format('YYYY-MM-DD');
            trxDataDTO1.rmk = row.getCell(EXCEL_CAA_IND.비고1).value;
            trxDataDTO1.acct_nm = row.getCell(EXCEL_CAA_IND.예금주명1).value;

            try {
              trxDataDTO1.trx_cd = trxCdItems.find(item => item.title == trxDataDTO1.trx_nm).value;
            } catch (e) {
              trxDataDTO1.trx_cd = '';
              // console.log(e);
            }

            trxDataDTO2.trx_nm = row.getCell(EXCEL_CAA_IND.입금구분2).value;
            trxDataDTO2.trx_amt = row.getCell(EXCEL_CAA_IND.입금금액2).value;
            trxDataDTO2.trx_dt = dayjs(row.getCell(EXCEL_CAA_IND.처리일자2).value).format('YYYY-MM-DD');
            trxDataDTO2.rmk = row.getCell(EXCEL_CAA_IND.비고2).value;
            trxDataDTO2.acct_nm = row.getCell(EXCEL_CAA_IND.예금주명2).value;

            try {
              trxDataDTO2.trx_cd = trxCdItems.find(item => item.title == trxDataDTO2.trx_nm).value;
            } catch (e) {
              trxDataDTO2.trx_cd = '';
              // console.log(e);
            }
            if (getEmpty(trxDataDTO1.trx_cd) !== '') {
              insuranceDTO.trx_data.push(trxDataDTO1);
            }
            if (getEmpty(trxDataDTO2.trx_cd) !== '') {
              insuranceDTO.trx_data.push(trxDataDTO2);
            }

            excelList.push(insuranceDTO);
          });

          resolve(excelList);
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};


/**
 * 관세사_합동 입금 엑셀업로드
 *
 * @param event
 * @returns
 */
export const UPLOAD_EXCEL_INSURANCE_CAA_TRE_JNT = async (event: any) => {
  return new Promise(async (resolve, reject) => {
    let excelList = [];

    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const workbook = new Workbook();
        workbook.xlsx.load(data).then(() => {
          const worksheet = workbook.getWorksheet(1);
          let insuranceDTO = null;
          let corp_bnno = null;

          worksheet.eachRow((row, index) => {
            if (index === 1) return;

            if (getEmpty(row.getCell(EXCEL_CAA_JNT.보험식별번호).value) !== '') {
              insuranceDTO = new InsuranceDTO();

              insuranceDTO.insurance_uuid = row.getCell(EXCEL_CAA_JNT.보험식별번호).value;
              insuranceDTO.insr_tot_paid_amt = row.getCell(EXCEL_CAA_JNT.총입금액).value;
              insuranceDTO.insr_tot_unpaid_amt = row.getCell(EXCEL_CAA_JNT.차액).value;

              insuranceDTO.status_nm = row.getCell(EXCEL_CAA_JNT.상태).value;
              try {
                insuranceDTO.status_cd = statusCdItems.find(item => item.title == insuranceDTO.status_nm).value;
              } catch (e) {
                insuranceDTO.status_cd = '';
                // console.log(e);
              }

              if (getEmpty(row.getCell(EXCEL_CAA_JNT.입금구분).value) !== '') {
                let trxDataDTO = new TRXDataDTO();

                trxDataDTO.trx_nm = row.getCell(EXCEL_CAA_JNT.입금구분).value;
                trxDataDTO.trx_amt = row.getCell(EXCEL_CAA_JNT.입금금액).value;
                trxDataDTO.trx_dt = dayjs(row.getCell(EXCEL_CAA_JNT.처리일자).value).format('YYYY-MM-DD');
                trxDataDTO.rmk = row.getCell(EXCEL_CAA_JNT.비고).value;
                trxDataDTO.acct_nm = row.getCell(EXCEL_CAA_JNT.예금주명).value;

                try {
                  trxDataDTO.trx_cd = trxCdItems.find(item => item.title == trxDataDTO.trx_nm).value;
                } catch (e) {
                  trxDataDTO.trx_cd = '';
                  // console.log(e);
                }
                if (trxDataDTO.trx_cd) {
                  insuranceDTO.trx_data.push(trxDataDTO);
                }
              }

              excelList.push(insuranceDTO);
            } else {
              if (getEmpty(row.getCell(EXCEL_CAA_JNT.입금구분).value) !== '') {
                let trxDataDTO = new TRXDataDTO();
                trxDataDTO.trx_nm = row.getCell(EXCEL_CAA_JNT.입금구분).value;
                trxDataDTO.trx_amt = row.getCell(EXCEL_CAA_JNT.입금금액).value;
                trxDataDTO.trx_dt = dayjs(row.getCell(EXCEL_CAA_JNT.처리일자).value).format('YYYY-MM-DD');
                trxDataDTO.rmk = row.getCell(EXCEL_CAA_JNT.비고).value;
                trxDataDTO.acct_nm = row.getCell(EXCEL_CAA_JNT.예금주명).value;

                try {
                  trxDataDTO.trx_cd = trxCdItems.find(item => item.title == trxDataDTO.trx_nm).value;
                } catch (e) {
                  trxDataDTO.trx_cd = '';
                  // console.log(e);
                }

                if (trxDataDTO.trx_cd) {
                  excelList[excelList.length - 1].trx_data.push(trxDataDTO);
                }
              }
            }
          });

          resolve(excelList);
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

/**
 * 관세사_법인 입금 엑셀업로드
 *
 * @param event
 * @returns
 */
export const UPLOAD_EXCEL_INSURANCE_CAA_TRE_COR = async (event: any) => {
  return new Promise(async (resolve, reject) => {
    let excelList = [];

    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const workbook = new Workbook();
        workbook.xlsx.load(data).then(() => {
          const worksheet = workbook.getWorksheet(1);
          let insuranceDTO = null;
          let corp_bnno = null;

          worksheet.eachRow((row, index) => {
            if (index === 1) return;

            if (getEmpty(row.getCell(EXCEL_CAA_COR.보험식별번호).value) !== '') {
              insuranceDTO = new InsuranceDTO();

              insuranceDTO.insurance_uuid = row.getCell(EXCEL_CAA_COR.보험식별번호).value;
              insuranceDTO.insr_tot_paid_amt = row.getCell(EXCEL_CAA_COR.총입금액).value;
              insuranceDTO.insr_tot_unpaid_amt = row.getCell(EXCEL_CAA_COR.차액).value;

              insuranceDTO.status_nm = row.getCell(EXCEL_CAA_COR.상태).value;
              try {
                insuranceDTO.status_cd = statusCdItems.find(item => item.title == insuranceDTO.status_nm).value;
              } catch (e) {
                insuranceDTO.status_cd = '';
                // console.log(e);
              }

              if (getEmpty(row.getCell(EXCEL_CAA_COR.입금구분).value) !== '') {
                let trxDataDTO = new TRXDataDTO();

                trxDataDTO.trx_nm = row.getCell(EXCEL_CAA_COR.입금구분).value;
                trxDataDTO.trx_amt = row.getCell(EXCEL_CAA_COR.입금금액).value;
                trxDataDTO.trx_dt = dayjs(row.getCell(EXCEL_CAA_COR.처리일자).value).format('YYYY-MM-DD');
                trxDataDTO.rmk = row.getCell(EXCEL_CAA_COR.비고).value;
                trxDataDTO.acct_nm = row.getCell(EXCEL_CAA_COR.예금주명).value;

                try {
                  trxDataDTO.trx_cd = trxCdItems.find(item => item.title == trxDataDTO.trx_nm).value;
                } catch (e) {
                  trxDataDTO.trx_cd = '';
                  // console.log(e);
                }
                if (trxDataDTO.trx_cd) {
                  insuranceDTO.trx_data.push(trxDataDTO);
                }
              }

              excelList.push(insuranceDTO);
            } else {
              if (getEmpty(row.getCell(EXCEL_CAA_COR.입금구분).value) !== '') {
                let trxDataDTO = new TRXDataDTO();
                trxDataDTO.trx_nm = row.getCell(EXCEL_CAA_COR.입금구분).value;
                trxDataDTO.trx_amt = row.getCell(EXCEL_CAA_COR.입금금액).value;
                trxDataDTO.trx_dt = dayjs(row.getCell(EXCEL_CAA_COR.처리일자).value).format('YYYY-MM-DD');
                trxDataDTO.rmk = row.getCell(EXCEL_CAA_COR.비고).value;
                trxDataDTO.acct_nm = row.getCell(EXCEL_CAA_COR.예금주명).value;

                try {
                  trxDataDTO.trx_cd = trxCdItems.find(item => item.title == trxDataDTO.trx_nm).value;
                } catch (e) {
                  trxDataDTO.trx_cd = '';
                  // console.log(e);
                }

                if (trxDataDTO.trx_cd) {
                  excelList[excelList.length - 1].trx_data.push(trxDataDTO);
                }
              }
            }
          });

          resolve(excelList);
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

/**
 * 변리사_개인 입금 엑셀업로드
 *
 * @param event
 * @returns
 */
export const UPLOAD_EXCEL_INSURANCE_PAT_TRE_IND = async (event: any) => {
  return new Promise(async (resolve, reject) => {
    let excelList = [];

    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const workbook = new Workbook();
        workbook.xlsx.load(data).then(() => {
          const worksheet = workbook.getWorksheet(1);

          worksheet.eachRow((row, index) => {
            if (index === 1) return;
            let insuranceDTO = new InsuranceDTO();
            let trxDataDTO1 = new TRXDataDTO();
            let trxDataDTO2 = new TRXDataDTO();

            insuranceDTO.insurance_uuid = row.getCell(EXCEL_PAT_IND.보험식별번호).value;
            insuranceDTO.insr_tot_paid_amt = row.getCell(EXCEL_PAT_IND.총입금액).value ? row.getCell(EXCEL_PAT_IND.총입금액).value: 0;
            insuranceDTO.insr_tot_unpaid_amt = row.getCell(EXCEL_PAT_IND.차액).value;

            insuranceDTO.status_nm = row.getCell(EXCEL_PAT_IND.상태).value;
            try {
              insuranceDTO.status_cd = statusCdItems.find(item => item.title == insuranceDTO.status_nm).value;
            } catch (e) {
              insuranceDTO.status_cd = '';
              // console.log(e);
            }

            trxDataDTO1.trx_nm = row.getCell(EXCEL_PAT_IND.입금구분1).value;
            trxDataDTO1.trx_amt = row.getCell(EXCEL_PAT_IND.입금금액1).value;
            trxDataDTO1.trx_dt = dayjs(row.getCell(EXCEL_PAT_IND.처리일자1).value).format('YYYY-MM-DD');
            trxDataDTO1.rmk = row.getCell(EXCEL_PAT_IND.비고1).value;
            trxDataDTO1.acct_nm = row.getCell(EXCEL_PAT_IND.예금주명1).value;

            try {
              trxDataDTO1.trx_cd = trxCdItems.find(item => item.title == trxDataDTO1.trx_nm).value;
            } catch (e) {
              trxDataDTO1.trx_cd = '';
              // console.log(e);
            }

            trxDataDTO2.trx_nm = row.getCell(EXCEL_PAT_IND.입금구분2).value;
            trxDataDTO2.trx_amt = row.getCell(EXCEL_PAT_IND.입금금액2).value;
            trxDataDTO2.trx_dt = dayjs(row.getCell(EXCEL_PAT_IND.처리일자2).value).format('YYYY-MM-DD');
            trxDataDTO2.rmk = row.getCell(EXCEL_PAT_IND.비고2).value;
            trxDataDTO2.acct_nm = row.getCell(EXCEL_PAT_IND.예금주명2).value;

            try {
              trxDataDTO2.trx_cd = trxCdItems.find(item => item.title == trxDataDTO2.trx_nm).value;
            } catch (e) {
              trxDataDTO2.trx_cd = '';
              // console.log(e);
            }
            if (getEmpty(trxDataDTO1.trx_cd) !== '') {
              insuranceDTO.trx_data.push(trxDataDTO1);
            }
            if (getEmpty(trxDataDTO2.trx_cd) !== '') {
              insuranceDTO.trx_data.push(trxDataDTO2);
            }

            excelList.push(insuranceDTO);
          });

          resolve(excelList);
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

/**
 * 변리사_합동 입금 엑셀업로드
 *
 * @param event
 * @returns
 */
export const UPLOAD_EXCEL_INSURANCE_PAT_TRE_JNT = async (event: any) => {
  return new Promise(async (resolve, reject) => {
    let excelList = [];

    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const workbook = new Workbook();
        workbook.xlsx.load(data).then(() => {
          const worksheet = workbook.getWorksheet(1);
          let insuranceDTO = null;
          let corp_bnno = null;

          worksheet.eachRow((row, index) => {
            if (index === 1) return;

            if (getEmpty(row.getCell(EXCEL_PAT_JNT.보험식별번호).value) !== '') {
              insuranceDTO = new InsuranceDTO();

              insuranceDTO.insurance_uuid = row.getCell(EXCEL_PAT_JNT.보험식별번호).value;
              insuranceDTO.insr_tot_paid_amt = row.getCell(EXCEL_PAT_JNT.총입금액).value ? row.getCell(EXCEL_PAT_JNT.총입금액).value: 0;
              insuranceDTO.insr_tot_unpaid_amt = row.getCell(EXCEL_PAT_JNT.차액).value;

              insuranceDTO.status_nm = row.getCell(EXCEL_PAT_JNT.상태).value;
              try {
                insuranceDTO.status_cd = statusCdItems.find(item => item.title == insuranceDTO.status_nm).value;
              } catch (e) {
                insuranceDTO.status_cd = '';
                // console.log(e);
              }

              if (getEmpty(row.getCell(EXCEL_PAT_JNT.입금구분).value) !== '') {
                let trxDataDTO = new TRXDataDTO();

                trxDataDTO.trx_nm = row.getCell(EXCEL_PAT_JNT.입금구분).value;
                trxDataDTO.trx_amt = row.getCell(EXCEL_PAT_JNT.입금금액).value;
                trxDataDTO.trx_dt = dayjs(row.getCell(EXCEL_PAT_JNT.처리일자).value).format('YYYY-MM-DD');
                trxDataDTO.rmk = row.getCell(EXCEL_PAT_JNT.비고).value;
                trxDataDTO.acct_nm = row.getCell(EXCEL_PAT_JNT.예금주명).value;

                try {
                  trxDataDTO.trx_cd = trxCdItems.find(item => item.title == trxDataDTO.trx_nm).value;
                } catch (e) {
                  trxDataDTO.trx_cd = '';
                  // console.log(e);
                }
                if (trxDataDTO.trx_cd) {
                  insuranceDTO.trx_data.push(trxDataDTO);
                }
              }

              excelList.push(insuranceDTO);
            } else {
              if (getEmpty(row.getCell(EXCEL_PAT_JNT.입금구분).value) !== '') {
                let trxDataDTO = new TRXDataDTO();
                trxDataDTO.trx_nm = row.getCell(EXCEL_PAT_JNT.입금구분).value;
                trxDataDTO.trx_amt = row.getCell(EXCEL_PAT_JNT.입금금액).value;
                trxDataDTO.trx_dt = dayjs(row.getCell(EXCEL_PAT_JNT.처리일자).value).format('YYYY-MM-DD');
                trxDataDTO.rmk = row.getCell(EXCEL_PAT_JNT.비고).value;
                trxDataDTO.acct_nm = row.getCell(EXCEL_PAT_JNT.예금주명).value;

                try {
                  trxDataDTO.trx_cd = trxCdItems.find(item => item.title == trxDataDTO.trx_nm).value;
                } catch (e) {
                  trxDataDTO.trx_cd = '';
                  // console.log(e);
                }

                if (trxDataDTO.trx_cd) {
                  excelList[excelList.length - 1].trx_data.push(trxDataDTO);
                }
              }
            }
          });

          resolve(excelList);
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

/**
 * 세무사_법인 입금 엑셀업로드
 *
 * @param event
 * @returns
 */
export const UPLOAD_EXCEL_INSURANCE_PAT_TRE_COR = async (event: any) => {
  return new Promise(async (resolve, reject) => {
    let excelList = [];

    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const workbook = new Workbook();
        workbook.xlsx.load(data).then(() => {
          const worksheet = workbook.getWorksheet(1);
          let insuranceDTO = null;
          let corp_bnno = null;

          worksheet.eachRow((row, index) => {
            if (index === 1) return;

            if (getEmpty(row.getCell(EXCEL_PAT_COR.보험식별번호).value) !== '') {
              insuranceDTO = new InsuranceDTO();

              insuranceDTO.insurance_uuid = row.getCell(EXCEL_PAT_COR.보험식별번호).value;
              insuranceDTO.insr_tot_paid_amt = row.getCell(EXCEL_PAT_COR.총입금액).value ? row.getCell(EXCEL_PAT_COR.총입금액).value: 0;
              insuranceDTO.insr_tot_unpaid_amt = row.getCell(EXCEL_PAT_COR.차액).value;

              insuranceDTO.status_nm = row.getCell(EXCEL_PAT_COR.상태).value;
              try {
                insuranceDTO.status_cd = statusCdItems.find(item => item.title == insuranceDTO.status_nm).value;
              } catch (e) {
                insuranceDTO.status_cd = '';
                // console.log(e);
              }

              if (getEmpty(row.getCell(EXCEL_PAT_COR.입금구분).value) !== '') {
                let trxDataDTO = new TRXDataDTO();

                trxDataDTO.trx_nm = row.getCell(EXCEL_PAT_COR.입금구분).value;
                trxDataDTO.trx_amt = row.getCell(EXCEL_PAT_COR.입금금액).value;
                trxDataDTO.trx_dt = dayjs(row.getCell(EXCEL_PAT_COR.처리일자).value).format('YYYY-MM-DD');
                trxDataDTO.rmk = row.getCell(EXCEL_PAT_COR.비고).value;
                trxDataDTO.acct_nm = row.getCell(EXCEL_PAT_COR.예금주명).value;

                try {
                  trxDataDTO.trx_cd = trxCdItems.find(item => item.title == trxDataDTO.trx_nm).value;
                } catch (e) {
                  trxDataDTO.trx_cd = '';
                  // console.log(e);
                }
                if (trxDataDTO.trx_cd) {
                  insuranceDTO.trx_data.push(trxDataDTO);
                }
              }

              excelList.push(insuranceDTO);
            } else {
              if (getEmpty(row.getCell(EXCEL_PAT_COR.입금구분).value) !== '') {
                let trxDataDTO = new TRXDataDTO();
                trxDataDTO.trx_nm = row.getCell(EXCEL_PAT_COR.입금구분).value;
                trxDataDTO.trx_amt = row.getCell(EXCEL_PAT_COR.입금금액).value;
                trxDataDTO.trx_dt = dayjs(row.getCell(EXCEL_PAT_COR.처리일자).value).format('YYYY-MM-DD');
                trxDataDTO.rmk = row.getCell(EXCEL_PAT_COR.비고).value;
                trxDataDTO.acct_nm = row.getCell(EXCEL_PAT_COR.예금주명).value;

                try {
                  trxDataDTO.trx_cd = trxCdItems.find(item => item.title == trxDataDTO.trx_nm).value;
                } catch (e) {
                  trxDataDTO.trx_cd = '';
                  // console.log(e);
                }

                if (trxDataDTO.trx_cd) {
                  excelList[excelList.length - 1].trx_data.push(trxDataDTO);
                }
              }
            }
          });

          resolve(excelList);
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};





/**
 * 공통 엑셀다운로드
 * @param searchParams
 * @param excelList
 * @returns
 */
export const DOWNLOAD_EXCEL = async (searchParams: ParamsDTO, excelList: any[]) => {
  return new Promise(async (resolve, reject) => {
    try {
      let workbook = new Workbook();
      let sheetName = businessCdItems.find(item => item.value === searchParams.data.business_cd).title + '_' + userCdItems.find(item => item.value === searchParams.data.user_cd).title;
      let worksheet = workbook.addWorksheet(sheetName);
      let mapperKey = `${searchParams.data.business_cd}_${searchParams.data.user_cd}`;

      // console.log("mapperKey",mapperKey)
      let excelMapper = EXCEL_MAPPERS[mapperKey];
      let rowMapper = ROW_MAPPERS[mapperKey];
     // let numMapper = EXCEL_NUM_MAPPERS[mapperKey];
      let headers = Object.keys(excelMapper).map(key => ({ header: key, key: excelMapper[key] }));
      // console.log("headers :",headers)

      // Assign columns
      worksheet.columns = headers;
      excelList.forEach((dataRow, index) => {
         dataRow.index = index;
         let rows = rowMapper(excelMapper, dataRow);
         rows.forEach(row => {
        //   numMapper.forEach(target => {
        //
        //     if(row[target]!=undefined &&row[target]!='') row[target]=row[target]*1
        //   })
          worksheet.addRow(row);
        });
      });
      // Add rows to the sheet
      /*excelList.forEach((dataRow, index) => {
        dataRow.index = index;
        let rows = rowMapper(excelMapper, dataRow);
        rows.forEach(row => {
          numMapper.forEach(target => {

            if(row[target]!=undefined &&row[target]!='') row[target]=row[target]*1
          })
          worksheet.addRow(row);
        });
      });

      worksheet.columns.forEach(col => {
        numMapper.forEach(target => {
          if(col.key == target){
            col.eachCell(cell => {
              cell.numFmt = '@'
            })
          }
        })
      });*/

      // Write to the buffer
      const buffer = await workbook.xlsx.writeBuffer();

      // Convert buffer to blob
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Use FileSaver.js to save the file
      saveAs(blob, `${searchParams.data.excel_filenm}_${dayjs().format('_YYYYMMDDHHmmss')}.xlsx`);
      resolve(excelList);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

/**
 * 세무사_개인 Mapper
 *
 * @param excelMapper
 * @param excelDataRow
 * @returns
 */
function mapperRow_TAX_IND(excelMapper: object, excelDataRow: any) {
  let insuranceDTO = new InsuranceDTO();
  Object.assign(insuranceDTO, excelDataRow);
  let row = {};
  row[excelMapper.순번] = insuranceDTO.index + 1;
  row[excelMapper.보험식별번호] = insuranceDTO.insurance_uuid;
  row[excelMapper.보험개시일] = insuranceDTO.insr_st_dt;
  row[excelMapper.보험종료일] = insuranceDTO.insr_cncls_dt;
  row[excelMapper.상태] = insuranceDTO.status_nm;
  row[excelMapper.피보험자] = insuranceDTO.user_nm;
  row[excelMapper.생년월일] = insuranceDTO.user_birth;
  row[excelMapper.사업자번호] = insuranceDTO.corp_cnno;
  row[excelMapper.등록번호] = insuranceDTO.user_regno;
  row[excelMapper.보상한도] = insuranceDTO.insr_clm_lt_amt?.getValueBySplit(1);
  row[excelMapper.보상한도_총한도] = insuranceDTO.insr_year_clm_lt_amt;
  row[excelMapper.자기부담금] = insuranceDTO.insr_psnl_brdn_amt?.getValueBySplit(1);
  row[excelMapper.소급담보일] = insuranceDTO.insr_retr_dt;
  row[excelMapper.기준보험료] = insuranceDTO.insr_base_amt;
  row[excelMapper.할인할증기준] = insuranceDTO.insr_sale_year;
  row[excelMapper.할인할증] = insuranceDTO.insr_sale_rt;
  row[excelMapper.공동보험] = insuranceDTO.insr_pblc_brdn_rt?.getValueBySplit(1);
  row[excelMapper.최종보험료] = insuranceDTO.insr_tot_amt;
  row[excelMapper.전화] = insuranceDTO.corp_telno;
  row[excelMapper.팩스] = insuranceDTO.corp_faxno;
  row[excelMapper.휴대폰] = insuranceDTO.corp_cust_hpno;
  row[excelMapper.담당자] = insuranceDTO.corp_cust_nm;
  row[excelMapper.우편번호] = insuranceDTO.corp_post;
  row[excelMapper.지역] = insuranceDTO.corp_region_nm;
  row[excelMapper.주소] = insuranceDTO.corp_addr;
  row[excelMapper.주소상세] = insuranceDTO.corp_addr_dtl;
  row[excelMapper.사무소명] = insuranceDTO.corp_nm;
  row[excelMapper.이메일] = insuranceDTO.corp_cust_email;
  row[excelMapper.총입금액] = insuranceDTO.insr_tot_paid_amt;
  row[excelMapper.차액] = insuranceDTO.insr_tot_unpaid_amt;

  try {
    row[excelMapper.입금구분1] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[0]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분1] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액1] = insuranceDTO?.trx_data[0]?.trx_amt;
  row[excelMapper.처리일자1] = insuranceDTO?.trx_data[0]?.trx_dt;
  row[excelMapper.비고1] = insuranceDTO?.trx_data[0]?.rmk;
  row[excelMapper.예금주명1] = insuranceDTO?.trx_data[0]?.acct_nm;

  // console.log('row[excelMapper.입금금액1]',row[excelMapper.입금금액1])
  try {
    row[excelMapper.입금구분2] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[1]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분2] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액2] = insuranceDTO?.trx_data[1]?.trx_amt;
  row[excelMapper.처리일자2] = insuranceDTO?.trx_data[1]?.trx_dt;
  row[excelMapper.비고2] = insuranceDTO?.trx_data[1]?.rmk;
  row[excelMapper.예금주명2] = insuranceDTO?.trx_data[1]?.acct_nm;
  row[excelMapper.ERP시작일] = insuranceDTO.erp_st_dt;
  row[excelMapper.ERP종료일] = insuranceDTO.erp_cncls_dt;
  row[excelMapper.ERP보험료] = insuranceDTO.erp_amt;
  row[excelMapper.ERP납입일] = insuranceDTO.erp_dt;
  row[excelMapper.변경일자] = insuranceDTO.change_dt;
  row[excelMapper.변경내용] = insuranceDTO.change_rmk;
  return [row];
}

/**
 * 세무사_법인 Mapper
 *
 * @param excelMapper
 * @param excelDataRow
 * @returns
 */
function mapperRow_TAX_COR(excelMapper: object, excelDataRow: any) {
  let insuranceDTO = new InsuranceDTO();
  Object.assign(insuranceDTO, excelDataRow);
  let rows = [];
  let row = {};
  row[excelMapper.순번] = insuranceDTO.index + 1;
  row[excelMapper.보험식별번호] = insuranceDTO.insurance_uuid;
  row[excelMapper.보험개시일] = insuranceDTO.insr_st_dt;
  row[excelMapper.보험종료일] = insuranceDTO.insr_cncls_dt;
  row[excelMapper.상태] = insuranceDTO.status_nm;
  row[excelMapper.대표자성명] = insuranceDTO.corp_ceo_nm;
  row[excelMapper.피보험자] = insuranceDTO.user_nm;
  row[excelMapper.생년월일] = insuranceDTO.user_birth;
  row[excelMapper.등록번호] = insuranceDTO.user_regno;
  row[excelMapper.소급담보일] = insuranceDTO.insr_retr_dt;
  row[excelMapper.사업자번호] = insuranceDTO.corp_cnno;
  row[excelMapper.법인번호] = insuranceDTO.corp_bnno;
  row[excelMapper.보상한도] = insuranceDTO.insr_clm_lt_amt?.getValueBySplit(1);
  row[excelMapper.보상한도_총한도] = insuranceDTO.insr_year_clm_lt_amt;
  row[excelMapper.자기부담금] = insuranceDTO.insr_psnl_brdn_amt?.getValueBySplit(1);
  row[excelMapper.기준보험료] = insuranceDTO.insr_base_amt;
  row[excelMapper.인원수] = insuranceDTO.cbr_cnt;
  row[excelMapper.인원수할인] = insuranceDTO.insr_pcnt_sale_rt;
  row[excelMapper.할인할증기준] = insuranceDTO.insr_sale_year;
  row[excelMapper.할인할증] = insuranceDTO.insr_sale_rt;
  row[excelMapper.공동보험] = insuranceDTO.insr_pblc_brdn_rt?.getValueBySplit(1);
  row[excelMapper.최종보험료] = insuranceDTO.insr_tot_amt;
  row[excelMapper.전화] = insuranceDTO.corp_telno;
  row[excelMapper.팩스] = insuranceDTO.corp_faxno;
  row[excelMapper.휴대폰] = insuranceDTO.corp_cust_hpno;
  row[excelMapper.담당자] = insuranceDTO.corp_cust_nm;
  row[excelMapper.우편번호] = insuranceDTO.corp_post;
  row[excelMapper.지역] = insuranceDTO.corp_region_nm;
  row[excelMapper.주소] = insuranceDTO.corp_addr;
  row[excelMapper.주소상세] = insuranceDTO.corp_addr_dtl;
  row[excelMapper.사무소명] = insuranceDTO.corp_nm;
  row[excelMapper.이메일] = insuranceDTO.corp_cust_email;
  row[excelMapper.총입금액] = insuranceDTO.insr_tot_paid_amt;
  row[excelMapper.차액] = insuranceDTO.insr_tot_unpaid_amt;
  row[excelMapper.ERP시작일] = insuranceDTO.erp_st_dt;
  row[excelMapper.ERP종료일] = insuranceDTO.erp_cncls_dt;
  row[excelMapper.ERP보험료] = insuranceDTO.erp_amt;
  row[excelMapper.ERP납입일] = insuranceDTO.erp_dt;
  row[excelMapper.변경일자] = insuranceDTO.change_dt;
  row[excelMapper.변경내용] = insuranceDTO.change_rmk;

  try {

    row[excelMapper.입금구분] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[0]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액] = insuranceDTO?.trx_data[0]?.trx_amt;
  row[excelMapper.처리일자] = insuranceDTO?.trx_data[0]?.trx_dt;
  row[excelMapper.비고] = insuranceDTO?.trx_data[0]?.rmk;
  row[excelMapper.예금주명] = insuranceDTO?.trx_data[0]?.acct_nm;

  rows.push(row);

  let maxLength = Math.max(insuranceDTO.cbr_data.length, insuranceDTO.trx_data.length);
  let cbrCnt = 0;

  for (let i = 0; i < maxLength; i++) {
    let subRow = {};
    if (insuranceDTO.cbr_data[i].status_cd=='80') cbrCnt++
    if (insuranceDTO.cbr_data[i]) {
      subRow[excelMapper.보험개시일] = insuranceDTO.cbr_data[i].insr_st_dt;
      subRow[excelMapper.보험종료일] = insuranceDTO.cbr_data[i].insr_cncls_dt;

      try {
        subRow[excelMapper.상태] = statusCdItems.find(items => items.value === insuranceDTO.cbr_data[i].status_cd).title;
      } catch (e) {
        subRow[excelMapper.상태] = '';
        // console.log(e);
      }

      subRow[excelMapper.피보험자] = insuranceDTO?.cbr_data[i]?.cbr_nm;
      subRow[excelMapper.생년월일] = insuranceDTO?.cbr_data[i]?.cbr_brdt;
      subRow[excelMapper.등록번호] = insuranceDTO?.cbr_data[i]?.cbr_regno;
      subRow[excelMapper.소급담보일] = insuranceDTO?.cbr_data[i]?.insr_retr_dt;
      subRow[excelMapper.할인할증기준] = insuranceDTO?.cbr_data[i]?.insr_sale_year;
      subRow[excelMapper.할인할증] = insuranceDTO?.cbr_data[i]?.insr_sale_rt;
      subRow[excelMapper.보험료] = insuranceDTO?.cbr_data[i]?.insr_amt;
    }

    if (insuranceDTO.trx_data[i + 1]) {
      try {
        subRow[excelMapper.입금구분] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[i + 1]?.trx_cd).title;
      } catch (e) {
        subRow[excelMapper.입금구분] = '';
        // console.log(e);
      }
      subRow[excelMapper.입금금액] = insuranceDTO?.trx_data[i + 1]?.trx_amt;
      subRow[excelMapper.처리일자] = insuranceDTO?.trx_data[i + 1]?.trx_dt;
      subRow[excelMapper.비고] = insuranceDTO?.trx_data[i + 1]?.rmk;
      subRow[excelMapper.예금주명] = insuranceDTO?.trx_data[i + 1]?.acct_nm;
    }

    row[excelMapper.인원수] = cbrCnt;

    rows.push(subRow);
  }
  return rows;
}

/**
 * 변호사_개인 Mapper
 *
 * @param excelMapper
 * @param excelDataRow
 * @returns
 */
function mapperRow_ADV_IND(excelMapper: object, excelDataRow: any) {
  let insuranceDTO = new InsuranceDTO();
  Object.assign(insuranceDTO, excelDataRow);
  let row = {};
  row[excelMapper.순번] = insuranceDTO.index + 1;
  row[excelMapper.보험식별번호] = insuranceDTO.insurance_uuid;
  row[excelMapper.보험개시일] = insuranceDTO.insr_st_dt;
  row[excelMapper.보험종료일] = insuranceDTO.insr_cncls_dt;
  row[excelMapper.상태] = insuranceDTO.status_nm;
  row[excelMapper.피보험자] = insuranceDTO.user_nm;
  row[excelMapper.생년월일] = insuranceDTO.user_birth;
  row[excelMapper.사업자번호] = insuranceDTO.corp_cnno;
  row[excelMapper.등록번호] = insuranceDTO.user_regno;
  row[excelMapper.보상한도] = insuranceDTO.insr_clm_lt_amt?.getValueBySplit(1);
  row[excelMapper.보상한도_총한도] = insuranceDTO.insr_year_clm_lt_amt;
  row[excelMapper.자기부담금] = insuranceDTO.insr_psnl_brdn_amt?.getValueBySplit(1);
  row[excelMapper.소급담보일] = insuranceDTO.insr_retr_dt;
  row[excelMapper.기준보험료] = insuranceDTO.insr_base_amt;
  row[excelMapper.할인할증기준] = insuranceDTO.insr_sale_year;
  row[excelMapper.할인할증] = insuranceDTO.insr_sale_rt;
  row[excelMapper.매출액구간] = insuranceDTO.insr_take_sec?.getValueBySplit(1);
  row[excelMapper.최종보험료] = insuranceDTO.insr_tot_amt;
  row[excelMapper.특약가입여부] = insuranceDTO.spct_join_yn=='Y'?'가입':'미가입';
  row[excelMapper.특약보상한도] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_clm_lt_amt?.getValueBySplit(1):'';
  row[excelMapper.특약자기부담금] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_psnl_brdn_amt?.getValueBySplit(1):'';
  row[excelMapper.사무원인원수] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.cbr_cnt:'';
  row[excelMapper.특약소급담보일] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_retr_dt:'';
  row[excelMapper.특약산출보험료] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_amt:'';
  row[excelMapper.전화] = insuranceDTO.corp_telno;
  row[excelMapper.팩스] = insuranceDTO.corp_faxno;
  row[excelMapper.휴대폰] = insuranceDTO.corp_cust_hpno;
  row[excelMapper.담당자] = insuranceDTO.corp_cust_nm;
  row[excelMapper.우편번호] = insuranceDTO.corp_post;
  row[excelMapper.지역] = insuranceDTO.corp_region_nm;
  row[excelMapper.주소] = insuranceDTO.corp_addr;
  row[excelMapper.주소상세] = insuranceDTO.corp_addr_dtl;
  row[excelMapper.사무소명] = insuranceDTO.corp_nm;
  row[excelMapper.이메일] = insuranceDTO.corp_cust_email;
  row[excelMapper.총입금액] = insuranceDTO.insr_tot_paid_amt;
  row[excelMapper.차액] = insuranceDTO.insr_tot_unpaid_amt;

  try {
    row[excelMapper.입금구분1] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[0]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분1] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액1] = insuranceDTO?.trx_data[0]?.trx_amt;
  row[excelMapper.처리일자1] = insuranceDTO?.trx_data[0]?.trx_dt;
  row[excelMapper.비고1] = insuranceDTO?.trx_data[0]?.rmk;
  row[excelMapper.예금주명1] = insuranceDTO?.trx_data[0]?.acct_nm;

   // console.log('row[excelMapper.특약가입여부]',row[excelMapper.특약가입여부])
  try {
    row[excelMapper.입금구분2] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[1]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분2] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액2] = insuranceDTO?.trx_data[1]?.trx_amt;
  row[excelMapper.처리일자2] = insuranceDTO?.trx_data[1]?.trx_dt;
  row[excelMapper.비고2] = insuranceDTO?.trx_data[1]?.rmk;
  row[excelMapper.예금주명2] = insuranceDTO?.trx_data[1]?.acct_nm;
  row[excelMapper.ERP시작일] = insuranceDTO.erp_st_dt;
  row[excelMapper.ERP종료일] = insuranceDTO.erp_cncls_dt;
  row[excelMapper.ERP보험료] = insuranceDTO.erp_amt;
  row[excelMapper.ERP납입일] = insuranceDTO.erp_dt;
  row[excelMapper.변경일자] = insuranceDTO.change_dt;
  row[excelMapper.변경내용] = insuranceDTO.change_rmk;
  row[excelMapper.담보한정] = insuranceDTO?.limited_collateral;
  return [row];
}

/**
 * 변호사_복수 Mapper
 *
 * @param excelMapper
 * @param excelDataRow
 * @returns
 */
function mapperRow_ADV_JNT(excelMapper: object, excelDataRow: any) {
  let insuranceDTO = new InsuranceDTO();
  Object.assign(insuranceDTO, excelDataRow);
  let rows = [];
  let row = {};
  row[excelMapper.순번] = insuranceDTO.index + 1;
  row[excelMapper.보험식별번호] = insuranceDTO.insurance_uuid;
  row[excelMapper.보험개시일] = insuranceDTO.insr_st_dt;
  row[excelMapper.보험종료일] = insuranceDTO.insr_cncls_dt;
  row[excelMapper.상태] = insuranceDTO.status_nm;
  row[excelMapper.대표자성명] = insuranceDTO.corp_ceo_nm;
  row[excelMapper.피보험자] = insuranceDTO.user_nm;
  row[excelMapper.생년월일] = insuranceDTO.user_birth;
  row[excelMapper.등록번호] = insuranceDTO.user_regno;
  row[excelMapper.소급담보일] = insuranceDTO.insr_retr_dt;
  row[excelMapper.사업자번호] = insuranceDTO.corp_cnno;
  row[excelMapper.법인번호] = insuranceDTO.corp_bnno;
  row[excelMapper.보상한도] = insuranceDTO.insr_clm_lt_amt?.getValueBySplit(1);
  row[excelMapper.보상한도_총한도] = insuranceDTO.insr_year_clm_lt_amt;
  row[excelMapper.자기부담금] = insuranceDTO.insr_psnl_brdn_amt?.getValueBySplit(1);
  row[excelMapper.기준보험료] = insuranceDTO.insr_base_amt;
  row[excelMapper.인원수] = insuranceDTO.cbr_cnt;
  row[excelMapper.인원수할인] = insuranceDTO.insr_pcnt_sale_rt;
  row[excelMapper.할인할증기준] = insuranceDTO.insr_sale_year;
  row[excelMapper.할인할증] = insuranceDTO.insr_sale_rt;
  row[excelMapper.매출액구간] = insuranceDTO.insr_take_sec?.getValueBySplit(1);
  row[excelMapper.최종보험료] = insuranceDTO.insr_tot_amt;
  row[excelMapper.특약가입여부] = insuranceDTO.spct_join_yn=='Y'?'가입':'미가입';
  row[excelMapper.특약보상한도] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_clm_lt_amt?.getValueBySplit(1):'';
  row[excelMapper.특약자기부담금] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_psnl_brdn_amt?.getValueBySplit(1):'';
  row[excelMapper.사무원인원수] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.cbr_cnt:'';
  row[excelMapper.특약소급담보일] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_retr_dt:'';
  row[excelMapper.특약산출보험료] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_amt:'';
  row[excelMapper.전화] = insuranceDTO.corp_telno;
  row[excelMapper.팩스] = insuranceDTO.corp_faxno;
  row[excelMapper.휴대폰] = insuranceDTO.corp_cust_hpno;
  row[excelMapper.담당자] = insuranceDTO.corp_cust_nm;
  row[excelMapper.우편번호] = insuranceDTO.corp_post;
  row[excelMapper.지역] = insuranceDTO.corp_region_nm;
  row[excelMapper.주소] = insuranceDTO.corp_addr;
  row[excelMapper.주소상세] = insuranceDTO.corp_addr_dtl;
  row[excelMapper.사무소명] = insuranceDTO.corp_nm;
  row[excelMapper.이메일] = insuranceDTO.corp_cust_email;
  row[excelMapper.총입금액] = insuranceDTO.insr_tot_paid_amt;
  row[excelMapper.차액] = insuranceDTO.insr_tot_unpaid_amt;
  row[excelMapper.ERP시작일] = insuranceDTO.erp_st_dt;
  row[excelMapper.ERP종료일] = insuranceDTO.erp_cncls_dt;
  row[excelMapper.ERP보험료] = insuranceDTO.erp_amt;
  row[excelMapper.ERP납입일] = insuranceDTO.erp_dt;
  row[excelMapper.변경일자] = insuranceDTO.change_dt;
  row[excelMapper.변경내용] = insuranceDTO.change_rmk;

  try {

    row[excelMapper.입금구분] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[0]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액] = insuranceDTO?.trx_data[0]?.trx_amt;
  row[excelMapper.처리일자] = insuranceDTO?.trx_data[0]?.trx_dt;
  row[excelMapper.비고] = insuranceDTO?.trx_data[0]?.rmk;
  row[excelMapper.예금주명] = insuranceDTO?.trx_data[0]?.acct_nm;

  row[excelMapper.담보한정] = insuranceDTO?.limited_collateral;

  rows.push(row);

  let maxLength = Math.max(insuranceDTO.cbr_data.length, insuranceDTO.trx_data.length);
  let cbrCnt = 0;

  for (let i = 0; i < maxLength; i++) {
    let subRow = {};
    if (insuranceDTO.cbr_data[i].status_cd=='80') cbrCnt++
    if (insuranceDTO.cbr_data[i]) {
      subRow[excelMapper.보험개시일] = insuranceDTO.cbr_data[i].insr_st_dt;
      subRow[excelMapper.보험종료일] = insuranceDTO.cbr_data[i].insr_cncls_dt;

      try {
        subRow[excelMapper.상태] = statusCdItems.find(items => items.value === insuranceDTO.cbr_data[i].status_cd).title;
      } catch (e) {
        subRow[excelMapper.상태] = '';
        // console.log(e);
      }

      subRow[excelMapper.피보험자] = insuranceDTO?.cbr_data[i]?.cbr_nm;
      subRow[excelMapper.생년월일] = insuranceDTO?.cbr_data[i]?.cbr_brdt;
      subRow[excelMapper.등록번호] = insuranceDTO?.cbr_data[i]?.cbr_regno;
      subRow[excelMapper.소급담보일] = insuranceDTO?.cbr_data[i]?.insr_retr_dt;
      subRow[excelMapper.할인할증기준] = insuranceDTO?.cbr_data[i]?.insr_sale_year;
      subRow[excelMapper.할인할증] = insuranceDTO?.cbr_data[i]?.insr_sale_rt;
      subRow[excelMapper.보험료] = insuranceDTO?.cbr_data[i]?.insr_amt;
    }

    if (insuranceDTO.trx_data[i + 1]) {
      try {
        subRow[excelMapper.입금구분] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[i + 1]?.trx_cd).title;
      } catch (e) {
        subRow[excelMapper.입금구분] = '';
        // console.log(e);
      }
      subRow[excelMapper.입금금액] = insuranceDTO?.trx_data[i + 1]?.trx_amt;
      subRow[excelMapper.처리일자] = insuranceDTO?.trx_data[i + 1]?.trx_dt;
      subRow[excelMapper.비고] = insuranceDTO?.trx_data[i + 1]?.rmk;
      subRow[excelMapper.예금주명] = insuranceDTO?.trx_data[i + 1]?.acct_nm;
    }

    row[excelMapper.인원수] = cbrCnt;

    rows.push(subRow);
  }
  return rows;
}


/**
 * 관세사_개인 Mapper
 *
 * @param excelMapper
 * @param excelDataRow
 * @returns
 */
function mapperRow_CAA_IND(excelMapper: object, excelDataRow: any) {
  let insuranceDTO = new InsuranceDTO();
  Object.assign(insuranceDTO, excelDataRow);
  let rows = [];
  let row = {};
  row[excelMapper.순번] = insuranceDTO.index + 1;
  row[excelMapper.보험식별번호] = insuranceDTO.insurance_uuid;
  row[excelMapper.보험개시일] = insuranceDTO.insr_st_dt;
  row[excelMapper.보험종료일] = insuranceDTO.insr_cncls_dt;
  row[excelMapper.상태] = insuranceDTO.status_nm;
  row[excelMapper.피보험자] = insuranceDTO.user_nm;
  row[excelMapper.생년월일] = insuranceDTO.user_birth;
  row[excelMapper.사업자번호] = insuranceDTO.corp_cnno;
  row[excelMapper.등록번호] = insuranceDTO.user_regno;
  row[excelMapper.보상한도] = insuranceDTO.insr_clm_lt_amt?.getValueBySplit(1);
  row[excelMapper.보상한도_총한도] = insuranceDTO.insr_year_clm_lt_amt;
  row[excelMapper.자기부담금] = insuranceDTO.insr_psnl_brdn_amt?.getValueBySplit(1);
  row[excelMapper.소급담보일] = insuranceDTO.insr_retr_dt;
  row[excelMapper.기준보험료] = insuranceDTO.insr_base_amt;
  row[excelMapper.보험료] = insuranceDTO.insr_amt;
  row[excelMapper.할인할증기준] = insuranceDTO.insr_sale_year;
  row[excelMapper.할인할증] = insuranceDTO.insr_sale_rt;
  row[excelMapper.공동보험] = insuranceDTO.insr_pblc_brdn_rt?.getValueBySplit(1);
  row[excelMapper.최종보험료] = insuranceDTO.insr_tot_amt;
  row[excelMapper.전화] = insuranceDTO.corp_telno;
  row[excelMapper.팩스] = insuranceDTO.corp_faxno;
  row[excelMapper.휴대폰] = insuranceDTO.corp_cust_hpno;
  row[excelMapper.담당자] = insuranceDTO.corp_cust_nm;
  row[excelMapper.우편번호] = insuranceDTO.corp_post;
  row[excelMapper.주소] = insuranceDTO.corp_addr;
  row[excelMapper.주소상세] = insuranceDTO.corp_addr_dtl;
  row[excelMapper.사무소명] = insuranceDTO.corp_nm;
  row[excelMapper.이메일] = insuranceDTO.corp_cust_email;
  row[excelMapper.총입금액] = insuranceDTO.insr_tot_paid_amt;
  row[excelMapper.차액] = insuranceDTO.insr_tot_unpaid_amt;

  row[excelMapper.특약보상한도] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_clm_lt_amt?.getValueBySplit(1):'';
  row[excelMapper.특약연간총보상한도] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_year_clm_lt_amt:'';
  row[excelMapper.특약자기부담금] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_psnl_brdn_amt?.getValueBySplit(1):'';
  row[excelMapper.특약보험료] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_amt:'';
  row[excelMapper.특약직원수] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.spct_data?.cbr_cnt:0;

  let spct_tot_cnt = 0;
  let spct_cnt = 0;
  if(insuranceDTO.spct_join_yn=='Y' && insuranceDTO.spct_data?.cbr_cnt > 0) {
    row[excelMapper.특약상태] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].status_cd : '';
    row[excelMapper.특약직원성명] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].cbr_nm : '';
    row[excelMapper.특약직원생년월일] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].cbr_brdt : '';
    row[excelMapper.특약소급담보일] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].insr_retr_dt : '';
    row[excelMapper.특약납입보험료] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].insr_amt : '';
    spct_tot_cnt = insuranceDTO.spct_data?.cbr_data.length
    spct_cnt = insuranceDTO.spct_data?.cbr_data.filter(item => !item.statud_cd || item.statud_cd == '80' || item.statud_cd == '').length
  }
  row[excelMapper.특약직원수] = spct_cnt;

  try {
    row[excelMapper.입금구분1] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[0]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분1] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액1] = insuranceDTO?.trx_data[0]?.trx_amt;
  row[excelMapper.처리일자1] = insuranceDTO?.trx_data[0]?.trx_dt;
  row[excelMapper.비고1] = insuranceDTO?.trx_data[0]?.rmk;
  row[excelMapper.예금주명1] = insuranceDTO?.trx_data[0]?.acct_nm;

  // console.log('row[excelMapper.입금금액1]',row[excelMapper.입금금액1])
  try {
    row[excelMapper.입금구분2] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[1]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분2] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액2] = insuranceDTO?.trx_data[1]?.trx_amt;
  row[excelMapper.처리일자2] = insuranceDTO?.trx_data[1]?.trx_dt;
  row[excelMapper.비고2] = insuranceDTO?.trx_data[1]?.rmk;
  row[excelMapper.예금주명2] = insuranceDTO?.trx_data[1]?.acct_nm;
  row[excelMapper.ERP시작일] = insuranceDTO.erp_st_dt;
  row[excelMapper.ERP종료일] = insuranceDTO.erp_cncls_dt;
  row[excelMapper.ERP보험료] = insuranceDTO.erp_amt;
  row[excelMapper.ERP납입일] = insuranceDTO.erp_dt;
  row[excelMapper.변경일자] = insuranceDTO.change_dt;
  row[excelMapper.변경내용] = insuranceDTO.change_rmk;
  rows.push(row)

  for (let i = 0; i < spct_tot_cnt - 1; i++) {
    let subRow = {};
    if(insuranceDTO.spct_join_yn=='Y' && insuranceDTO.spct_data.cbr_data[i + 1]) {
      subRow[excelMapper.특약상태] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].status_cd : '';
      subRow[excelMapper.특약직원성명] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].cbr_nm : '';
      subRow[excelMapper.특약직원생년월일] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].cbr_brdt : '';
      subRow[excelMapper.특약소급담보일] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].insr_retr_dt : '';
      subRow[excelMapper.특약납입보험료] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].insr_amt : '';
    }


    rows.push(subRow);
  }
  return rows;
}


/**
 * 관세사_합동 Mapper
 *
 * @param excelMapper
 * @param excelDataRow
 * @returns
 */
function mapperRow_CAA_JNT(excelMapper: object, excelDataRow: any) {
  let insuranceDTO = new InsuranceDTO();
  Object.assign(insuranceDTO, excelDataRow);
  let rows = [];
  let row = {};
  row[excelMapper.순번] = insuranceDTO.index + 1;
  row[excelMapper.보험식별번호] = insuranceDTO.insurance_uuid;
  row[excelMapper.보험개시일] = insuranceDTO.insr_st_dt;
  row[excelMapper.보험종료일] = insuranceDTO.insr_cncls_dt;
  row[excelMapper.상태] = insuranceDTO.status_nm;
  row[excelMapper.대표자성명] = insuranceDTO.corp_ceo_nm;
  row[excelMapper.피보험자] = insuranceDTO.user_nm;
  row[excelMapper.생년월일] = insuranceDTO.user_birth;
  row[excelMapper.등록번호] = insuranceDTO.user_regno;
  row[excelMapper.소급담보일] = insuranceDTO.insr_retr_dt;
  row[excelMapper.사업자번호] = insuranceDTO.corp_cnno;
  row[excelMapper.보상한도] = insuranceDTO.insr_clm_lt_amt?.getValueBySplit(1);
  row[excelMapper.보상한도_총한도] = insuranceDTO.insr_year_clm_lt_amt;
  row[excelMapper.자기부담금] = insuranceDTO.insr_psnl_brdn_amt?.getValueBySplit(1);
  row[excelMapper.기준보험료] = insuranceDTO.insr_base_amt;
  row[excelMapper.보험료] = insuranceDTO.insr_amt;
  row[excelMapper.인원수] = insuranceDTO.cbr_cnt;
  row[excelMapper.할인할증기준] = insuranceDTO.insr_sale_year;
  row[excelMapper.할인할증] = insuranceDTO.insr_sale_rt;
  row[excelMapper.공동보험] = insuranceDTO.insr_pblc_brdn_rt?.getValueBySplit(1);
  row[excelMapper.최종보험료] = insuranceDTO.insr_tot_amt;
  row[excelMapper.전화] = insuranceDTO.corp_telno;
  row[excelMapper.팩스] = insuranceDTO.corp_faxno;
  row[excelMapper.휴대폰] = insuranceDTO.corp_cust_hpno;
  row[excelMapper.담당자] = insuranceDTO.corp_cust_nm;
  row[excelMapper.우편번호] = insuranceDTO.corp_post;
  row[excelMapper.주소] = insuranceDTO.corp_addr;
  row[excelMapper.주소상세] = insuranceDTO.corp_addr_dtl;
  row[excelMapper.사무소명] = insuranceDTO.corp_nm;
  row[excelMapper.이메일] = insuranceDTO.corp_cust_email;
  row[excelMapper.총입금액] = insuranceDTO.insr_tot_paid_amt;
  row[excelMapper.차액] = insuranceDTO.insr_tot_unpaid_amt;
  row[excelMapper.ERP시작일] = insuranceDTO.erp_st_dt;
  row[excelMapper.ERP종료일] = insuranceDTO.erp_cncls_dt;
  row[excelMapper.ERP보험료] = insuranceDTO.erp_amt;
  row[excelMapper.ERP납입일] = insuranceDTO.erp_dt;
  row[excelMapper.변경일자] = insuranceDTO.change_dt;
  row[excelMapper.변경내용] = insuranceDTO.change_rmk;
  row[excelMapper.특약보상한도] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_clm_lt_amt?.getValueBySplit(1):'';
  row[excelMapper.특약연간총보상한도] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_year_clm_lt_amt:'';
  row[excelMapper.특약자기부담금] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_psnl_brdn_amt?.getValueBySplit(1):'';
  row[excelMapper.특약보험료] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_amt:'';
  row[excelMapper.특약직원수] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.spct_data?.cbr_cnt:0;

  let spct_tot_cnt = 0;
  let spct_cnt = 0;
  if(insuranceDTO.spct_join_yn=='Y' && insuranceDTO.spct_data?.cbr_cnt > 0) {
    row[excelMapper.특약상태] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].status_cd : '';
    row[excelMapper.특약직원성명] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].cbr_nm : '';
    row[excelMapper.특약직원생년월일] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].cbr_brdt : '';
    row[excelMapper.특약소급담보일] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].insr_retr_dt : '';
    row[excelMapper.특약납입보험료] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].insr_amt : '';
    spct_tot_cnt = insuranceDTO.spct_data?.cbr_data.length
    spct_cnt = insuranceDTO.spct_data?.cbr_data.filter(item => !item.statud_cd || item.statud_cd == '80' || item.statud_cd == '').length
  }
  row[excelMapper.특약직원수] = spct_cnt;

  try {

    row[excelMapper.입금구분] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[0]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액] = insuranceDTO?.trx_data[0]?.trx_amt;
  row[excelMapper.처리일자] = insuranceDTO?.trx_data[0]?.trx_dt;
  row[excelMapper.비고] = insuranceDTO?.trx_data[0]?.rmk;
  row[excelMapper.예금주명] = insuranceDTO?.trx_data[0]?.acct_nm;

  rows.push(row);
  
  let maxLength = Math.max(insuranceDTO.cbr_data.length, insuranceDTO.trx_data.length, spct_tot_cnt - 1);
  let cbrCnt = 0;

  for (let i = 0; i < maxLength; i++) {
    let subRow = {};
    if (insuranceDTO.cbr_data[i].status_cd=='80') cbrCnt++
    if (insuranceDTO.cbr_data[i]) {
      subRow[excelMapper.보험개시일] = insuranceDTO.cbr_data[i].insr_st_dt;
      subRow[excelMapper.보험종료일] = insuranceDTO.cbr_data[i].insr_cncls_dt;

      try {
        subRow[excelMapper.상태] = statusCdItems.find(items => items.value === insuranceDTO.cbr_data[i].status_cd).title;
      } catch (e) {
        subRow[excelMapper.상태] = '';
        // console.log(e);
      }

      subRow[excelMapper.피보험자] = insuranceDTO?.cbr_data[i]?.cbr_nm;
      subRow[excelMapper.생년월일] = insuranceDTO?.cbr_data[i]?.cbr_brdt;
      subRow[excelMapper.등록번호] = insuranceDTO?.cbr_data[i]?.cbr_regno;
      subRow[excelMapper.소급담보일] = insuranceDTO?.cbr_data[i]?.insr_retr_dt;
      subRow[excelMapper.할인할증기준] = insuranceDTO?.cbr_data[i]?.insr_sale_year;
      subRow[excelMapper.할인할증] = insuranceDTO?.cbr_data[i]?.insr_sale_rt;
      subRow[excelMapper.보험료] = insuranceDTO?.cbr_data[i]?.insr_amt;
    }

    if (insuranceDTO.trx_data[i + 1]) {
      try {
        subRow[excelMapper.입금구분] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[i + 1]?.trx_cd).title;
      } catch (e) {
        subRow[excelMapper.입금구분] = '';
        // console.log(e);
      }
      subRow[excelMapper.입금금액] = insuranceDTO?.trx_data[i + 1]?.trx_amt;
      subRow[excelMapper.처리일자] = insuranceDTO?.trx_data[i + 1]?.trx_dt;
      subRow[excelMapper.비고] = insuranceDTO?.trx_data[i + 1]?.rmk;
      subRow[excelMapper.예금주명] = insuranceDTO?.trx_data[i + 1]?.acct_nm;
    }

    if(insuranceDTO.spct_join_yn=='Y' && insuranceDTO.spct_data.cbr_data[i + 1]) {
      subRow[excelMapper.특약상태] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].status_cd : '';
      subRow[excelMapper.특약직원성명] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].cbr_nm : '';
      subRow[excelMapper.특약직원생년월일] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].cbr_brdt : '';
      subRow[excelMapper.특약소급담보일] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].insr_retr_dt : '';
      subRow[excelMapper.특약납입보험료] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].insr_amt : '';
    }
    row[excelMapper.인원수] = cbrCnt;


    rows.push(subRow);
  }
  if(insuranceDTO.cons_join_yn === 'Y'){
    let row_cons = {};
    row_cons[excelMapper.보험식별번호] = insuranceDTO.insurance_uuid;
    row_cons[excelMapper.보험개시일] = insuranceDTO.cons_data.insr_st_dt;
    row_cons[excelMapper.보험종료일] = insuranceDTO.cons_data.insr_cncls_dt;
    row_cons[excelMapper.상태] = insuranceDTO.status_nm;
    row_cons[excelMapper.대표자성명] = insuranceDTO.corp_ceo_nm;
    row_cons[excelMapper.피보험자] = insuranceDTO.user_nm + '_컨설팅';
    row_cons[excelMapper.생년월일] = insuranceDTO.user_birth;
    row_cons[excelMapper.등록번호] = insuranceDTO.user_regno;
    row_cons[excelMapper.소급담보일] = insuranceDTO.cons_data.insr_retr_dt;
    row_cons[excelMapper.사업자번호] = insuranceDTO.corp_cnno;
    row_cons[excelMapper.보상한도] = insuranceDTO.cons_data.insr_clm_lt_amt?.getValueBySplit(1);
    row_cons[excelMapper.보상한도_총한도] = insuranceDTO.cons_data.insr_year_clm_lt_amt;
    row_cons[excelMapper.자기부담금] = insuranceDTO.cons_data.insr_psnl_brdn_amt?.getValueBySplit(1);
    row_cons[excelMapper.기준보험료] = insuranceDTO.cons_data.insr_base_amt;
    row_cons[excelMapper.보험료] = insuranceDTO.cons_data.insr_amt;
    row_cons[excelMapper.인원수] = insuranceDTO.cons_data.cbr_cnt;
    row_cons[excelMapper.할인할증기준] = insuranceDTO.cons_data.insr_sale_year;
    row_cons[excelMapper.할인할증] = insuranceDTO.cons_data.insr_sale_rt;
    row_cons[excelMapper.공동보험] = insuranceDTO.cons_data.insr_pblc_brdn_rt?.getValueBySplit(1);
    row_cons[excelMapper.전화] = insuranceDTO.corp_telno;
    row_cons[excelMapper.팩스] = insuranceDTO.corp_faxno;
    row_cons[excelMapper.휴대폰] = insuranceDTO.corp_cust_hpno;
    row_cons[excelMapper.담당자] = insuranceDTO.corp_cust_nm;
    row_cons[excelMapper.우편번호] = insuranceDTO.corp_post;
    row_cons[excelMapper.주소] = insuranceDTO.corp_addr;
    row_cons[excelMapper.주소상세] = insuranceDTO.corp_addr_dtl;
    row_cons[excelMapper.사무소명] = insuranceDTO.corp_nm;
    row_cons[excelMapper.이메일] = insuranceDTO.corp_cust_email;
    rows.push(row_cons);

    let maxLength = insuranceDTO.cons_data.cbr_data.length
    let cbrCnt = 0;

    for (let i = 0; i < maxLength; i++) {
      let subRow = {};
      if (insuranceDTO.cons_data.cbr_data[i].status_cd=='80') cbrCnt++
      if (insuranceDTO.cons_data.cbr_data[i]) {
        subRow[excelMapper.보험개시일] = insuranceDTO.cons_data.cbr_data[i].insr_st_dt;
        subRow[excelMapper.보험종료일] = insuranceDTO.cons_data.cbr_data[i].insr_cncls_dt;

        try {
          subRow[excelMapper.상태] = statusCdItems.find(items => items.value === insuranceDTO.cons_data.cbr_data[i].status_cd).title;
        } catch (e) {
          subRow[excelMapper.상태] = '';
          // console.log(e);
        }

        subRow[excelMapper.피보험자] = insuranceDTO?.cons_data.cbr_data[i]?.cbr_nm;
        subRow[excelMapper.생년월일] = insuranceDTO?.cons_data.cbr_data[i]?.cbr_brdt;
        subRow[excelMapper.등록번호] = insuranceDTO?.cons_data.cbr_data[i]?.cbr_regno;
        subRow[excelMapper.소급담보일] = insuranceDTO?.cons_data.cbr_data[i]?.insr_retr_dt;
        subRow[excelMapper.할인할증기준] = insuranceDTO?.cons_data.cbr_data[i]?.insr_sale_year;
        subRow[excelMapper.할인할증] = insuranceDTO?.cons_data.cbr_data[i]?.insr_sale_rt;
        subRow[excelMapper.보험료] = insuranceDTO?.cons_data.cbr_data[i]?.insr_amt;
      }

      row[excelMapper.인원수] = cbrCnt;

      rows.push(subRow);
    }
  }
  return rows;
}


/**
 * 관세사_법인 Mapper
 *
 * @param excelMapper
 * @param excelDataRow
 * @returns
 */
function mapperRow_CAA_COR(excelMapper: object, excelDataRow: any) {
  let insuranceDTO = new InsuranceDTO();
  Object.assign(insuranceDTO, excelDataRow);
  let rows = [];
  let row = {};
  row[excelMapper.순번] = insuranceDTO.index + 1;
  row[excelMapper.보험식별번호] = insuranceDTO.insurance_uuid;
  row[excelMapper.보험개시일] = insuranceDTO.insr_st_dt;
  row[excelMapper.보험종료일] = insuranceDTO.insr_cncls_dt;
  row[excelMapper.상태] = insuranceDTO.status_nm;
  row[excelMapper.대표자성명] = insuranceDTO.corp_ceo_nm;
  row[excelMapper.피보험자] = insuranceDTO.user_nm;
  row[excelMapper.생년월일] = insuranceDTO.user_birth;
  row[excelMapper.등록번호] = insuranceDTO.user_regno;
  row[excelMapper.소급담보일] = insuranceDTO.insr_retr_dt;
  row[excelMapper.사업자번호] = insuranceDTO.corp_cnno;
  row[excelMapper.법인번호] = insuranceDTO.corp_bnno;
  row[excelMapper.보상한도] = insuranceDTO.insr_clm_lt_amt?.getValueBySplit(1);
  row[excelMapper.보상한도_총한도] = insuranceDTO.insr_year_clm_lt_amt;
  row[excelMapper.자기부담금] = insuranceDTO.insr_psnl_brdn_amt?.getValueBySplit(1);
  row[excelMapper.기준보험료] = insuranceDTO.insr_base_amt;
  row[excelMapper.인원수] = insuranceDTO.cbr_cnt;
  row[excelMapper.할인할증기준] = insuranceDTO.insr_sale_year;
  row[excelMapper.할인할증] = insuranceDTO.insr_sale_rt;
  row[excelMapper.공동보험] = insuranceDTO.insr_pblc_brdn_rt?.getValueBySplit(1);
  row[excelMapper.보험료] = insuranceDTO.insr_amt;
  row[excelMapper.최종보험료] = insuranceDTO.insr_tot_amt;
  row[excelMapper.전화] = insuranceDTO.corp_telno;
  row[excelMapper.팩스] = insuranceDTO.corp_faxno;
  row[excelMapper.휴대폰] = insuranceDTO.corp_cust_hpno;
  row[excelMapper.담당자] = insuranceDTO.corp_cust_nm;
  row[excelMapper.우편번호] = insuranceDTO.corp_post;
  row[excelMapper.주소] = insuranceDTO.corp_addr;
  row[excelMapper.주소상세] = insuranceDTO.corp_addr_dtl;
  row[excelMapper.사무소명] = insuranceDTO.corp_nm;
  row[excelMapper.이메일] = insuranceDTO.corp_cust_email;
  row[excelMapper.총입금액] = insuranceDTO.insr_tot_paid_amt;
  row[excelMapper.차액] = insuranceDTO.insr_tot_unpaid_amt;
  row[excelMapper.ERP시작일] = insuranceDTO.erp_st_dt;
  row[excelMapper.ERP종료일] = insuranceDTO.erp_cncls_dt;
  row[excelMapper.ERP보험료] = insuranceDTO.erp_amt;
  row[excelMapper.ERP납입일] = insuranceDTO.erp_dt;
  row[excelMapper.변경일자] = insuranceDTO.change_dt;
  row[excelMapper.변경내용] = insuranceDTO.change_rmk;

  row[excelMapper.특약보상한도] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_clm_lt_amt?.getValueBySplit(1):'';
  row[excelMapper.특약연간총보상한도] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_year_clm_lt_amt:'';
  row[excelMapper.특약자기부담금] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_psnl_brdn_amt?.getValueBySplit(1):'';
  row[excelMapper.특약보험료] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.insr_amt:'';
  row[excelMapper.특약직원수] = insuranceDTO.spct_join_yn=='Y'?insuranceDTO.spct_data?.spct_data?.cbr_cnt:0;

  let spct_tot_cnt = 0;
  let spct_cnt = 0;
  if(insuranceDTO.spct_join_yn=='Y' && insuranceDTO.spct_data?.cbr_cnt > 0) {
    row[excelMapper.특약상태] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].status_cd : '';
    row[excelMapper.특약직원성명] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].cbr_nm : '';
    row[excelMapper.특약직원생년월일] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].cbr_brdt : '';
    row[excelMapper.특약소급담보일] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].insr_retr_dt : '';
    row[excelMapper.특약납입보험료] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[0].insr_amt : '';
    spct_tot_cnt = insuranceDTO.spct_data?.cbr_data.length
    spct_cnt = insuranceDTO.spct_data?.cbr_data.filter(item => !item.statud_cd || item.statud_cd == '80' || item.statud_cd == '').length
  }
  row[excelMapper.특약직원수] = spct_cnt;

  try {

    row[excelMapper.입금구분] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[0]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액] = insuranceDTO?.trx_data[0]?.trx_amt;
  row[excelMapper.처리일자] = insuranceDTO?.trx_data[0]?.trx_dt;
  row[excelMapper.비고] = insuranceDTO?.trx_data[0]?.rmk;
  row[excelMapper.예금주명] = insuranceDTO?.trx_data[0]?.acct_nm;

  rows.push(row);

  let maxLength = Math.max(insuranceDTO.cbr_data.length, insuranceDTO.trx_data.length, spct_tot_cnt - 1);
  let cbrCnt = 0;

  for (let i = 0; i < maxLength; i++) {
    let subRow = {};
    if (insuranceDTO.cbr_data[i].status_cd=='80') cbrCnt++
    if (insuranceDTO.cbr_data[i]) {
      subRow[excelMapper.보험개시일] = insuranceDTO.cbr_data[i].insr_st_dt;
      subRow[excelMapper.보험종료일] = insuranceDTO.cbr_data[i].insr_cncls_dt;

      try {
        subRow[excelMapper.상태] = statusCdItems.find(items => items.value === insuranceDTO.cbr_data[i].status_cd).title;
      } catch (e) {
        subRow[excelMapper.상태] = '';
        // console.log(e);
      }

      subRow[excelMapper.피보험자] = insuranceDTO?.cbr_data[i]?.cbr_nm;
      subRow[excelMapper.생년월일] = insuranceDTO?.cbr_data[i]?.cbr_brdt;
      subRow[excelMapper.등록번호] = insuranceDTO?.cbr_data[i]?.cbr_regno;
      subRow[excelMapper.소급담보일] = insuranceDTO?.cbr_data[i]?.insr_retr_dt;
      subRow[excelMapper.할인할증기준] = insuranceDTO?.cbr_data[i]?.insr_sale_year;
      subRow[excelMapper.할인할증] = insuranceDTO?.cbr_data[i]?.insr_sale_rt;
      subRow[excelMapper.보험료] = insuranceDTO?.cbr_data[i]?.insr_amt;
    }

    if (insuranceDTO.trx_data[i + 1]) {
      try {
        subRow[excelMapper.입금구분] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[i + 1]?.trx_cd).title;
      } catch (e) {
        subRow[excelMapper.입금구분] = '';
        // console.log(e);
      }
      subRow[excelMapper.입금금액] = insuranceDTO?.trx_data[i + 1]?.trx_amt;
      subRow[excelMapper.처리일자] = insuranceDTO?.trx_data[i + 1]?.trx_dt;
      subRow[excelMapper.비고] = insuranceDTO?.trx_data[i + 1]?.rmk;
      subRow[excelMapper.예금주명] = insuranceDTO?.trx_data[i + 1]?.acct_nm;
    }

    if(insuranceDTO.spct_join_yn=='Y' && insuranceDTO.spct_data.cbr_data[i + 1]) {
      subRow[excelMapper.특약상태] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].status_cd : '';
      subRow[excelMapper.특약직원성명] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].cbr_nm : '';
      subRow[excelMapper.특약직원생년월일] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].cbr_brdt : '';
      subRow[excelMapper.특약소급담보일] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].insr_retr_dt : '';
      subRow[excelMapper.특약납입보험료] = insuranceDTO.spct_join_yn == 'Y' ? insuranceDTO.spct_data?.cbr_data[i + 1].insr_amt : '';
    }
    row[excelMapper.인원수] = cbrCnt;

    rows.push(subRow);
  }
  if(insuranceDTO.cons_join_yn === 'Y'){
    let row_cons = {};
    row_cons[excelMapper.보험식별번호] = insuranceDTO.insurance_uuid;
    row_cons[excelMapper.보험개시일] = insuranceDTO.cons_data.insr_st_dt;
    row_cons[excelMapper.보험종료일] = insuranceDTO.cons_data.insr_cncls_dt;
    row_cons[excelMapper.상태] = insuranceDTO.status_nm;
    row_cons[excelMapper.대표자성명] = insuranceDTO.corp_ceo_nm;
    row_cons[excelMapper.피보험자] = insuranceDTO.user_nm + '_컨설팅';
    row_cons[excelMapper.생년월일] = insuranceDTO.user_birth;
    row_cons[excelMapper.등록번호] = insuranceDTO.user_regno;
    row_cons[excelMapper.소급담보일] = insuranceDTO.cons_data.insr_retr_dt;
    row_cons[excelMapper.사업자번호] = insuranceDTO.corp_cnno;
    row_cons[excelMapper.보상한도] = insuranceDTO.cons_data.insr_clm_lt_amt?.getValueBySplit(1);
    row_cons[excelMapper.보상한도_총한도] = insuranceDTO.cons_data.insr_year_clm_lt_amt;
    row_cons[excelMapper.자기부담금] = insuranceDTO.cons_data.insr_psnl_brdn_amt?.getValueBySplit(1);
    row_cons[excelMapper.기준보험료] = insuranceDTO.cons_data.insr_base_amt;
    row_cons[excelMapper.보험료] = insuranceDTO.cons_data.insr_amt;
    row_cons[excelMapper.인원수] = insuranceDTO.cons_data.cbr_cnt;
    row_cons[excelMapper.할인할증기준] = insuranceDTO.cons_data.insr_sale_year;
    row_cons[excelMapper.할인할증] = insuranceDTO.cons_data.insr_sale_rt;
    row_cons[excelMapper.공동보험] = insuranceDTO.cons_data.insr_pblc_brdn_rt?.getValueBySplit(1);
    row_cons[excelMapper.전화] = insuranceDTO.corp_telno;
    row_cons[excelMapper.팩스] = insuranceDTO.corp_faxno;
    row_cons[excelMapper.휴대폰] = insuranceDTO.corp_cust_hpno;
    row_cons[excelMapper.담당자] = insuranceDTO.corp_cust_nm;
    row_cons[excelMapper.우편번호] = insuranceDTO.corp_post;
    row_cons[excelMapper.주소] = insuranceDTO.corp_addr;
    row_cons[excelMapper.주소상세] = insuranceDTO.corp_addr_dtl;
    row_cons[excelMapper.사무소명] = insuranceDTO.corp_nm;
    row_cons[excelMapper.이메일] = insuranceDTO.corp_cust_email;
    rows.push(row_cons);

    let maxLength = insuranceDTO.cons_data.cbr_data.length
    let cbrCnt = 0;

    for (let i = 0; i < maxLength; i++) {
      let subRow = {};
      if (insuranceDTO.cons_data.cbr_data[i].status_cd=='80') cbrCnt++
      if (insuranceDTO.cons_data.cbr_data[i]) {
        subRow[excelMapper.보험개시일] = insuranceDTO.cons_data.cbr_data[i].insr_st_dt;
        subRow[excelMapper.보험종료일] = insuranceDTO.cons_data.cbr_data[i].insr_cncls_dt;

        try {
          subRow[excelMapper.상태] = statusCdItems.find(items => items.value === insuranceDTO.cons_data.cbr_data[i].status_cd).title;
        } catch (e) {
          subRow[excelMapper.상태] = '';
          // console.log(e);
        }

        subRow[excelMapper.피보험자] = insuranceDTO?.cons_data.cbr_data[i]?.cbr_nm;
        subRow[excelMapper.생년월일] = insuranceDTO?.cons_data.cbr_data[i]?.cbr_brdt;
        subRow[excelMapper.등록번호] = insuranceDTO?.cons_data.cbr_data[i]?.cbr_regno;
        subRow[excelMapper.소급담보일] = insuranceDTO?.cons_data.cbr_data[i]?.insr_retr_dt;
        subRow[excelMapper.할인할증기준] = insuranceDTO?.cons_data.cbr_data[i]?.insr_sale_year;
        subRow[excelMapper.할인할증] = insuranceDTO?.cons_data.cbr_data[i]?.insr_sale_rt;
        subRow[excelMapper.보험료] = insuranceDTO?.cons_data.cbr_data[i]?.insr_amt;
      }

      row[excelMapper.인원수] = cbrCnt;

      rows.push(subRow);
    }
  }
  return rows;
}


/**
 * 변리사_개인 Mapper
 *
 * @param excelMapper
 * @param excelDataRow
 * @returns
 */
function mapperRow_PAT_IND(excelMapper: object, excelDataRow: any) {
  let insuranceDTO = new InsuranceDTO();
  Object.assign(insuranceDTO, excelDataRow);
  let row = {};
  row[excelMapper.순번] = insuranceDTO.index + 1;
  row[excelMapper.보험식별번호] = insuranceDTO.insurance_uuid;
  row[excelMapper.보험개시일] = insuranceDTO.insr_st_dt;
  row[excelMapper.보험종료일] = insuranceDTO.insr_cncls_dt;
  row[excelMapper.상태] = insuranceDTO.status_nm;
  row[excelMapper.피보험자] = insuranceDTO.user_nm;
  row[excelMapper.생년월일] = insuranceDTO.user_birth;
  row[excelMapper.사업자번호] = insuranceDTO.corp_cnno;
  row[excelMapper.등록번호] = insuranceDTO.user_regno;
  row[excelMapper.보상한도] = insuranceDTO.insr_clm_lt_amt?.getValueBySplit(1);
  row[excelMapper.보상한도_총한도] = insuranceDTO.insr_year_clm_lt_amt;
  row[excelMapper.자기부담금] = insuranceDTO.insr_psnl_brdn_amt?.getValueBySplit(1);
  row[excelMapper.소급담보일] = insuranceDTO.insr_retr_dt;
  row[excelMapper.기준보험료] = insuranceDTO.insr_base_amt;
  row[excelMapper.할인할증기준] = insuranceDTO.insr_sale_year;
  row[excelMapper.할인할증] = insuranceDTO.insr_sale_rt;
  row[excelMapper.기일관리프로그램할인] = insuranceDTO.insr_program_yn;
  row[excelMapper.기일관리프로그램명] = insuranceDTO.insr_program;
  row[excelMapper.서비스제공사] = insuranceDTO.insr_service;
  row[excelMapper.최종보험료] = insuranceDTO.insr_tot_amt;
  row[excelMapper.전화] = insuranceDTO.corp_telno;
  row[excelMapper.팩스] = insuranceDTO.corp_faxno;
  row[excelMapper.휴대폰] = insuranceDTO.corp_cust_hpno;
  row[excelMapper.담당자] = insuranceDTO.corp_cust_nm;
  row[excelMapper.우편번호] = insuranceDTO.corp_post;
  row[excelMapper.주소] = insuranceDTO.corp_addr;
  row[excelMapper.주소상세] = insuranceDTO.corp_addr_dtl;
  row[excelMapper.사무소명] = insuranceDTO.corp_nm;
  row[excelMapper.이메일] = insuranceDTO.corp_cust_email;
  row[excelMapper.총입금액] = insuranceDTO.insr_tot_paid_amt;
  row[excelMapper.차액] = insuranceDTO.insr_tot_unpaid_amt;

  try {
    row[excelMapper.입금구분1] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[0]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분1] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액1] = insuranceDTO?.trx_data[0]?.trx_amt;
  row[excelMapper.처리일자1] = insuranceDTO?.trx_data[0]?.trx_dt;
  row[excelMapper.비고1] = insuranceDTO?.trx_data[0]?.rmk;
  row[excelMapper.예금주명1] = insuranceDTO?.trx_data[0]?.acct_nm;

  // console.log('row[excelMapper.특약가입여부]',row[excelMapper.특약가입여부])
  try {
    row[excelMapper.입금구분2] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[1]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분2] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액2] = insuranceDTO?.trx_data[1]?.trx_amt;
  row[excelMapper.처리일자2] = insuranceDTO?.trx_data[1]?.trx_dt;
  row[excelMapper.비고2] = insuranceDTO?.trx_data[1]?.rmk;
  row[excelMapper.예금주명2] = insuranceDTO?.trx_data[1]?.acct_nm;
  row[excelMapper.ERP시작일] = insuranceDTO.erp_st_dt;
  row[excelMapper.ERP종료일] = insuranceDTO.erp_cncls_dt;
  row[excelMapper.ERP보험료] = insuranceDTO.erp_amt;
  row[excelMapper.ERP납입일] = insuranceDTO.erp_dt;
  row[excelMapper.변경일자] = insuranceDTO.change_dt;
  row[excelMapper.변경내용] = insuranceDTO.change_rmk;
  return [row];
}

/**
 * 변리사_합동 Mapper
 *
 * @param excelMapper
 * @param excelDataRow
 * @returns
 */
function mapperRow_PAT_JNT(excelMapper: object, excelDataRow: any) {
  let insuranceDTO = new InsuranceDTO();
  Object.assign(insuranceDTO, excelDataRow);
  let rows = [];
  let row = {};
  row[excelMapper.순번] = insuranceDTO.index + 1;
  row[excelMapper.보험식별번호] = insuranceDTO.insurance_uuid;
  row[excelMapper.보험개시일] = insuranceDTO.insr_st_dt;
  row[excelMapper.보험종료일] = insuranceDTO.insr_cncls_dt;
  row[excelMapper.상태] = insuranceDTO.status_nm;
  row[excelMapper.대표자성명] = insuranceDTO.corp_ceo_nm;
  row[excelMapper.피보험자] = insuranceDTO.user_nm;
  row[excelMapper.생년월일] = insuranceDTO.user_birth;
  row[excelMapper.등록번호] = insuranceDTO.user_regno;
  row[excelMapper.소급담보일] = insuranceDTO.insr_retr_dt;
  row[excelMapper.사업자번호] = insuranceDTO.corp_cnno;
  //row[excelMapper.법인번호] = insuranceDTO.corp_bnno;
  row[excelMapper.보상한도] = insuranceDTO.insr_clm_lt_amt?.getValueBySplit(1);
  row[excelMapper.보상한도_총한도] = insuranceDTO.insr_year_clm_lt_amt;
  row[excelMapper.자기부담금] = insuranceDTO.insr_psnl_brdn_amt?.getValueBySplit(1);
  row[excelMapper.기준보험료] = insuranceDTO.insr_base_amt;
  row[excelMapper.인원수] = insuranceDTO.cbr_cnt;
  row[excelMapper.할인할증기준] = insuranceDTO.insr_sale_year;
  row[excelMapper.할인할증] = insuranceDTO.insr_sale_rt;
  row[excelMapper.기일관리프로그램할인] = insuranceDTO.insr_program_yn;
  row[excelMapper.기일관리프로그램명] = insuranceDTO.insr_program;
  row[excelMapper.서비스제공사] = insuranceDTO.insr_service;
  row[excelMapper.최종보험료] = insuranceDTO.insr_tot_amt;
  row[excelMapper.전화] = insuranceDTO.corp_telno;
  row[excelMapper.팩스] = insuranceDTO.corp_faxno;
  row[excelMapper.휴대폰] = insuranceDTO.corp_cust_hpno;
  row[excelMapper.담당자] = insuranceDTO.corp_cust_nm;
  row[excelMapper.우편번호] = insuranceDTO.corp_post;
  row[excelMapper.주소] = insuranceDTO.corp_addr;
  row[excelMapper.주소상세] = insuranceDTO.corp_addr_dtl;
  row[excelMapper.사무소명] = insuranceDTO.corp_nm;
  row[excelMapper.이메일] = insuranceDTO.corp_cust_email;
  row[excelMapper.총입금액] = insuranceDTO.insr_tot_paid_amt;
  row[excelMapper.차액] = insuranceDTO.insr_tot_unpaid_amt;
  row[excelMapper.ERP시작일] = insuranceDTO.erp_st_dt;
  row[excelMapper.ERP종료일] = insuranceDTO.erp_cncls_dt;
  row[excelMapper.ERP보험료] = insuranceDTO.erp_amt;
  row[excelMapper.ERP납입일] = insuranceDTO.erp_dt;
  row[excelMapper.변경일자] = insuranceDTO.change_dt;
  row[excelMapper.변경내용] = insuranceDTO.change_rmk;

  try {

    row[excelMapper.입금구분] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[0]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액] = insuranceDTO?.trx_data[0]?.trx_amt;
  row[excelMapper.처리일자] = insuranceDTO?.trx_data[0]?.trx_dt;
  row[excelMapper.비고] = insuranceDTO?.trx_data[0]?.rmk;
  row[excelMapper.예금주명] = insuranceDTO?.trx_data[0]?.acct_nm;

  rows.push(row);

  let maxLength = Math.max(insuranceDTO.cbr_data.length, insuranceDTO.trx_data.length);
  let cbrCnt = 0;

  for (let i = 0; i < maxLength; i++) {
    let subRow = {};
    if (insuranceDTO.cbr_data[i].status_cd=='80') cbrCnt++
    if (insuranceDTO.cbr_data[i]) {
      subRow[excelMapper.보험개시일] = insuranceDTO.cbr_data[i].insr_st_dt;
      subRow[excelMapper.보험종료일] = insuranceDTO.cbr_data[i].insr_cncls_dt;

      try {
        subRow[excelMapper.상태] = statusCdItems.find(items => items.value === insuranceDTO.cbr_data[i].status_cd).title;
      } catch (e) {
        subRow[excelMapper.상태] = '';
        // console.log(e);
      }

      subRow[excelMapper.피보험자] = insuranceDTO?.cbr_data[i]?.cbr_nm;
      subRow[excelMapper.생년월일] = insuranceDTO?.cbr_data[i]?.cbr_brdt;
      subRow[excelMapper.등록번호] = insuranceDTO?.cbr_data[i]?.cbr_regno;
      subRow[excelMapper.소급담보일] = insuranceDTO?.cbr_data[i]?.insr_retr_dt;
      subRow[excelMapper.할인할증기준] = insuranceDTO?.cbr_data[i]?.insr_sale_year;
      subRow[excelMapper.할인할증] = insuranceDTO?.cbr_data[i]?.insr_sale_rt;
      subRow[excelMapper.보험료] = insuranceDTO?.cbr_data[i]?.insr_amt;
    }

    if (insuranceDTO.trx_data[i + 1]) {
      try {
        subRow[excelMapper.입금구분] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[i + 1]?.trx_cd).title;
      } catch (e) {
        subRow[excelMapper.입금구분] = '';
        // console.log(e);
      }
      subRow[excelMapper.입금금액] = insuranceDTO?.trx_data[i + 1]?.trx_amt;
      subRow[excelMapper.처리일자] = insuranceDTO?.trx_data[i + 1]?.trx_dt;
      subRow[excelMapper.비고] = insuranceDTO?.trx_data[i + 1]?.rmk;
      subRow[excelMapper.예금주명] = insuranceDTO?.trx_data[i + 1]?.acct_nm;
    }

    row[excelMapper.인원수] = cbrCnt;

    rows.push(subRow);
  }
  return rows;
}

/**
 * 변리사_법인 Mapper
 *
 * @param excelMapper
 * @param excelDataRow
 * @returns
 */
function mapperRow_PAT_COR(excelMapper: object, excelDataRow: any) {
  let insuranceDTO = new InsuranceDTO();
  Object.assign(insuranceDTO, excelDataRow);
  let rows = [];
  let row = {};
  row[excelMapper.순번] = insuranceDTO.index + 1;
  row[excelMapper.보험식별번호] = insuranceDTO.insurance_uuid;
  row[excelMapper.보험개시일] = insuranceDTO.insr_st_dt;
  row[excelMapper.보험종료일] = insuranceDTO.insr_cncls_dt;
  row[excelMapper.상태] = insuranceDTO.status_nm;
  row[excelMapper.대표자성명] = insuranceDTO.corp_ceo_nm;
  row[excelMapper.피보험자] = insuranceDTO.user_nm;
  row[excelMapper.생년월일] = insuranceDTO.user_birth;
  row[excelMapper.등록번호] = insuranceDTO.user_regno;
  row[excelMapper.소급담보일] = insuranceDTO.insr_retr_dt;
  row[excelMapper.사업자번호] = insuranceDTO.corp_cnno;
  row[excelMapper.법인번호] = insuranceDTO.corp_bnno;
  row[excelMapper.보상한도] = insuranceDTO.insr_clm_lt_amt?.getValueBySplit(1);
  row[excelMapper.보상한도_총한도] = insuranceDTO.insr_year_clm_lt_amt;
  row[excelMapper.자기부담금] = insuranceDTO.insr_psnl_brdn_amt?.getValueBySplit(1);
  row[excelMapper.기준보험료] = insuranceDTO.insr_base_amt;
  row[excelMapper.인원수] = insuranceDTO.cbr_cnt;
  row[excelMapper.할인할증기준] = insuranceDTO.insr_sale_year;
  row[excelMapper.할인할증] = insuranceDTO.insr_sale_rt;
  row[excelMapper.매출액구간] = insuranceDTO.insr_take_sec;
  row[excelMapper.연간매출액] = insuranceDTO.insr_take_amt;
  row[excelMapper.기일관리프로그램할인] = insuranceDTO.insr_program_yn;
  row[excelMapper.기일관리프로그램명] = insuranceDTO.insr_program;
  row[excelMapper.서비스제공사] = insuranceDTO.insr_service;
  row[excelMapper.최종보험료] = insuranceDTO.insr_tot_amt;
  row[excelMapper.전화] = insuranceDTO.corp_telno;
  row[excelMapper.팩스] = insuranceDTO.corp_faxno;
  row[excelMapper.휴대폰] = insuranceDTO.corp_cust_hpno;
  row[excelMapper.담당자] = insuranceDTO.corp_cust_nm;
  row[excelMapper.우편번호] = insuranceDTO.corp_post;
  row[excelMapper.주소] = insuranceDTO.corp_addr;
  row[excelMapper.주소상세] = insuranceDTO.corp_addr_dtl;
  row[excelMapper.사무소명] = insuranceDTO.corp_nm;
  row[excelMapper.이메일] = insuranceDTO.corp_cust_email;
  row[excelMapper.총입금액] = insuranceDTO.insr_tot_paid_amt;
  row[excelMapper.차액] = insuranceDTO.insr_tot_unpaid_amt;
  row[excelMapper.ERP시작일] = insuranceDTO.erp_st_dt;
  row[excelMapper.ERP종료일] = insuranceDTO.erp_cncls_dt;
  row[excelMapper.ERP보험료] = insuranceDTO.erp_amt;
  row[excelMapper.ERP납입일] = insuranceDTO.erp_dt;
  row[excelMapper.변경일자] = insuranceDTO.change_dt;
  row[excelMapper.변경내용] = insuranceDTO.change_rmk;

  try {

    row[excelMapper.입금구분] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[0]?.trx_cd).title;
  } catch (e) {
    row[excelMapper.입금구분] = '';
    // console.log(e);
  }

  row[excelMapper.입금금액] = insuranceDTO?.trx_data[0]?.trx_amt;
  row[excelMapper.처리일자] = insuranceDTO?.trx_data[0]?.trx_dt;
  row[excelMapper.비고] = insuranceDTO?.trx_data[0]?.rmk;
  row[excelMapper.예금주명] = insuranceDTO?.trx_data[0]?.acct_nm;

  rows.push(row);

  let maxLength = Math.max(insuranceDTO.cbr_data.length, insuranceDTO.trx_data.length);
  let cbrCnt = 0;

  for (let i = 0; i < maxLength; i++) {
    let subRow = {};
    if (insuranceDTO?.cbr_data[i]?.status_cd=='80') cbrCnt++
    if (insuranceDTO.cbr_data[i]) {
      try {
        subRow[excelMapper.상태] = statusCdItems.find(items => items.value === insuranceDTO.cbr_data[i].status_cd).title;
      } catch (e) {
        subRow[excelMapper.상태] = '';
        // console.log(e);
      }

      subRow[excelMapper.피보험자] = insuranceDTO?.cbr_data[i]?.cbr_nm;
      subRow[excelMapper.생년월일] = insuranceDTO?.cbr_data[i]?.cbr_brdt;
      subRow[excelMapper.소급담보일] = insuranceDTO?.cbr_data[i]?.insr_retr_dt;
    }

    if (insuranceDTO.trx_data[i + 1]) {
      try {
        subRow[excelMapper.입금구분] = trxCdItems.find(item => item.value == insuranceDTO?.trx_data[i + 1]?.trx_cd).title;
      } catch (e) {
        subRow[excelMapper.입금구분] = '';
        // console.log(e);
      }
      subRow[excelMapper.입금금액] = insuranceDTO?.trx_data[i + 1]?.trx_amt;
      subRow[excelMapper.처리일자] = insuranceDTO?.trx_data[i + 1]?.trx_dt;
      subRow[excelMapper.비고] = insuranceDTO?.trx_data[i + 1]?.rmk;
      subRow[excelMapper.예금주명] = insuranceDTO?.trx_data[i + 1]?.acct_nm;
    }

    row[excelMapper.인원수] = cbrCnt;

    rows.push(subRow);
  }
  return rows;
}
