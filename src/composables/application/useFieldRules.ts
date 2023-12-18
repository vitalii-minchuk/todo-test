import { fieldRequiredMsg, invalidPhoneMsg, lettersOnlyMsg, longTextMsg } from '~/constants'

export interface IFieldRulesComposition {
  required: (v: string | number) => boolean | string
  onlyLetters: (v: string) => boolean | string
  isPhone: (v: string) => boolean | string
  lengthValue: (v: string, maxLength?: number) => boolean | string
}

export function useFieldRules(): IFieldRulesComposition {
  const required = (v: string | number) => (!!v || v === 0) || fieldRequiredMsg

  const lengthValue = (v: string, maxLength = 255) => v?.length <= maxLength || longTextMsg

  const onlyLetters = (v: string) => {
    return /^[a-zA-Z]+$/.test(v) || lettersOnlyMsg
  }

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
