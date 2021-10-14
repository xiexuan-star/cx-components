import { evaluate, round } from 'mathjs';

/**
 * 计算表达式
 * @param exp 计算表达式
 * @param precision 精度
 */
export function evaluateRound(exp: string, precision = 2) {
  try {
    return round(evaluate(exp), precision);
  } catch (err) {
    return '';
  }
}
