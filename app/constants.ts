// constants.ts

export const VALUE_STEPS = Object.freeze([0, 10, 100, 1000, 10000, 99999]);

export const SinoKoreanDict: { [key: number]: string } = {
    0: '영',
    1: '일',
    2: '이',
    3: '삼',
    4: '사',
    5: '오',
    6: '육',
    7: '칠',
    8: '팔',
    9: '구',
    10: '십',
    100: '백',
    1000: '천',
    10000: '만'
  };
  
export const NativeKoreanDict: { [key: number]: string } = {
    1: '하나',
    2: '둘',
    3: '셋',
    4: '넷',
    5: '다섯',
    6: '여섯',
    7: '일곱',
    8: '여덟',
    9: '아홉',
    10: '열',
    20: '스물',
    30: '서른',
    40: '마흔',
    50: '쉰',
    60: '예순',
    70: '일흔',
    80: '여든',
    90: '아흔',
    100: '백' // Rare in native, but included for completeness
  };
  

export function toSinoKorean(num: number): string {
    if (num <= 1 ) return SinoKoreanDict[num];
  
    let result = ''
    let pow = 1;
    while(num > 0){
        if(num % 10 >= 1){
            if(pow > 1)
                result = SinoKoreanDict[pow] + result;
            if(num % 10 > 1)
                // console.log(num%10)
                result = SinoKoreanDict[num % 10] + result;
        }
        num = Math.floor(num / 10); // wtf javascript
        pow*=10;
    }

  
    return result;
  }