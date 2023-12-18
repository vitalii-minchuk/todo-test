import { fieldRequiredMsg, invalidPhoneMsg, lettersOnlyMsg, longTextMsg } from '~/constants'

export interface IFieldRulesComposition {
  required: (v: string | number) => boolean | string
  onlyLetters: (v: string) => boolean | string
  isPhone: (v: string) => boolean | string
  lengthValue: (v: string, maxLength?: number) => boolean | string
}

export function useFieldRules(): IFieldRulesComposition {
  // check if value is empty
  const required = (v: string | number) => (!!v || v === 0) || fieldRequiredMsg

  // check how long a value is
  const lengthValue = (v: string, maxLength = 255) => v?.length <= maxLength || longTextMsg

  // check if value consists of only letters
  const onlyLetters = (v: string) => {
    return /^[a-zA-Z]+$/.test(v) || lettersOnlyMsg
  }

  // check if value has only digits or hyphens or space or "x" letter
  // example : "1-1111-11 x451"
  const isPhone = (v: string) => {
    return /^[\d\-x\s]+$/.test(v) || invalidPhoneMsg
  }

  return {
    required,
    onlyLetters,
    lengthValue,
    isPhone,
  }
}
