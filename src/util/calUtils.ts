import RATE_ITEMS from '../views/json/discountRateByMemData.json';
import {getDateDiff} from "./util";
import {ref} from "vue/dist/vue";
import {vModelText} from "vue";

let INSR_RATE_TABLE = {};
let INSR_RATE_MAX_DAYS = 0;

// 변호사 인원수별 할인구간
let discountRangesADV = [
    {range: [15, Infinity], rate: -42},
    {range: [14, 14], rate: -41},
    {range: [13, 13], rate: -40},
    {range: [12, 12], rate: -39},
    {range: [11, 11], rate: -37},
    {range: [10, 10], rate: -35},
    {range: [9, 9], rate: -33},
    {range: [8, 8], rate: -30},
    {range: [7, 7], rate: -27},
    {range: [6, 6], rate: -24},
    {range: [5, 5], rate: -21},
    {range: [4, 4], rate: -18},
    {range: [3, 3], rate: -15},
    {range: [2, 2], rate: -10},
    {range: [0, 1], rate: -0},
];
// 변호사 인원수별 할인구간
let discountRangesTAX = [
    {range: [11, Infinity], rate: -15},
    {range: [7, 10], rate: -10},
    {range: [3, 6], rate: -5},
    {range: [0, 2], rate: -0},
];
/*
0	0%
1	0%
2	0%
3	-5%
4	-5%
5	-5%
6	-5%
7	-10%
8	-10%
9	-10%
10	-10%
11	-15%
12	-15%

 */


/**
 * 인원보험료 게산 2023-12-09
 * @param businness_cd
 * @param count //정상 상태 멤버 수
 * @returns
 */


export let getDiscountRate = (businnessCd: string,  nPCnt:number) => {
    let discountRate = 0
    let discountRanges = []

    //console.log("businnessCd :",businnessCd)
    if(businnessCd == 'ADV') {
        discountRanges = discountRangesADV
    } else if(businnessCd == 'TAX') {
        discountRanges = discountRangesTAX
    }
    for (let i = 0; i < discountRanges.length; i++) {
        let range = discountRanges[i].range;
        if (nPCnt >= range[0] && nPCnt <= range[1]) {
            discountRate = discountRanges[i].rate;
            break;
        }
    }

    //console.log("discountRate :",discountRate)
  return discountRate;
};

export let getInsrAmt = (
    sSDt: string,
    sEDt: string,
    sKey1: string,
    sKey2: string,
    sKey3: string,
    nRate: number,
    nPCnt: number,
    discountRate: number,
    data : object,
    contents : object,
    days : number

) => {

    INSR_RATE_TABLE = contents;
    INSR_RATE_MAX_DAYS = days;

    // console.log("sKey1 : ",sKey1)
    // console.log("sKey2 : ",sKey2)
    // console.log("sKey3 : ",sKey3)
    if (!sKey1 || !sKey2 || !sKey3) return 0;

    let nTotAmt = 0;
    let nInitAmt = 0;
    let nDCnt = 0;

    let sKey = sKey1.getValueBySplit(0) + '|' + sKey2.getValueBySplit(0) + '|' + sKey3.getValueBySplit(0);

    try {
        // 기간 계산
        nDCnt = getDateDiff(sSDt, sEDt, INSR_RATE_MAX_DAYS);

        if (nDCnt > INSR_RATE_MAX_DAYS) nDCnt = INSR_RATE_MAX_DAYS;

        // 기본보험료 조회
        nInitAmt = INSR_RATE_TABLE.기본담보.보험료.filter(data => data.key === sKey)[0].amt;

        // 기본 보험 계산식(합동)  기본금액 * 할인 할증 * 인원수 할인 * 기간일수 / 365
        nTotAmt = (nInitAmt *  (nDCnt / INSR_RATE_MAX_DAYS)) * (1 + discountRate / 100) * (1 + nRate / 100);

        // 10원단위 절사
        nTotAmt = Math.floor(nTotAmt / 10) * 10;

    } catch (err) {
        console.log(err);
        nTotAmt = 0;
    }

    // 계산불가 일 경우 0으로 설정
    if (isNaN(nTotAmt)) nTotAmt = 0;

    return nTotAmt;
};



/**
 * 특약 보험료 계산
 *
 * @param sSDt  시작일자
 * @param sEDt  종료일자
 * @param sKey1 보상한도
 * @param sKey2 자기부담금
 * @param nPCnt 인원수
 */
export let getInsrSpctAmt = (
    sSDt: string,
    sEDt: string,
    sKey1: string,
    sKey2: string,
    nPCnt: number,
    contents : object,
    days : number

) => {
    if (!sKey1 || !sKey2) return 0;

    INSR_RATE_TABLE = contents;
    INSR_RATE_MAX_DAYS = days;

    let nTotAmt = 0;
    let nInitAmt = 0;
    let nDCnt = 0;

    let sKey = sKey1.getValueBySplit(0) + '|' + sKey2.getValueBySplit(0);

    console.log("INSR_RATE_TABLE",INSR_RATE_TABLE)
    console.log("INSR_RATE_MAX_DAYS",INSR_RATE_MAX_DAYS)
    try {
        // 연간보험료 계산
        nDCnt = getDateDiff(sSDt, sEDt, INSR_RATE_MAX_DAYS);
        // 365일을 넘지 않도록 한다.
        if (nDCnt > INSR_RATE_MAX_DAYS) nDCnt = INSR_RATE_MAX_DAYS;
        // 기본보험료 조회
        //nInitAmt =  (eval("INSR_RATE_TABLE.value['특약']['" + sKey1 + "']['"+ sKey2 + "']"));
        nInitAmt = INSR_RATE_TABLE.특약담보.보험료.filter(
            data => data.key === sKey
        )[0].amt;

        // 보험 계산식
        nTotAmt = Math.floor((nInitAmt * (nDCnt / INSR_RATE_MAX_DAYS)) / 10) * 10 * nPCnt;
    } catch (err) {
        console.log(err);
        nTotAmt = 0;
    }
    // 계산불가 일 경우 0으로 설정
    if (isNaN(nTotAmt)) nTotAmt = 0;
console.log("nTotAmt",nTotAmt)
    return nTotAmt;
};