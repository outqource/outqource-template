import * as Hangul from 'hangul-js';

const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

export const isKorean = (target?: string): target is string => {
  if (!target) return false;

  return korean.test(target as string);
};

export const hangulSearch = (target: string, keyword: string): boolean => {
  target = target.toUpperCase();
  keyword = keyword.toUpperCase();

  for (let i = 0; i < keyword.length; i++) {
    if (Hangul.isJong(keyword[i])) {
      keyword = keyword.slice(0, i) + Hangul.d(keyword[i]).join('') + keyword.slice(i + 1);
    }
  }

  const seperatedTarget = Hangul.d(target, true);
  const seperatedKeyword = Hangul.d(keyword, true);

  const choTarget = seperatedTarget.map((el) => el[0]).join('');
  const choKeyword = seperatedKeyword.map((el) => el[0]).join('');

  let correctIdx = choTarget.indexOf(choKeyword);
  let check = false;

  while (correctIdx >= 0) {
    check = true;

    for (let charIdx = 0; charIdx < seperatedKeyword.length; charIdx++) {
      const dTargetIdx = charIdx + correctIdx;

      for (let dIdx = 0; dIdx < seperatedKeyword[charIdx].length; dIdx++) {
        if (seperatedTarget[dTargetIdx][dIdx] !== seperatedKeyword[charIdx][dIdx]) {
          check = false;

          if (
            dIdx === choKeyword[charIdx].length - 1 &&
            Hangul.isCho(choKeyword[charIdx][dIdx]) &&
            choKeyword[dTargetIdx + 1] &&
            choKeyword[dTargetIdx + 1][0] === choKeyword[charIdx][dIdx]
          )
            check = true;

          break;
        }
      }
      if (check === false) {
        correctIdx = choTarget.indexOf(choKeyword, correctIdx + 1);
        break;
      }
    }
    if (check) break;
  }

  return check;
};

export const getChosungSearchedData = <T extends object>(target: keyof T, data: T[], keyword: string): T[] => {
  return data.filter((value) => hangulSearch(value[`${target as string}`], keyword));
};
