export interface IFieldRulesComposition {
  required: (v: string | number) => boolean | string
  isNumber: (v: string) => boolean | string
  lengthValue: (v: string, maxLength?: number) => boolean | string
  isPositiveIntegerNumber: (v: string) => boolean | string
  isEmail: (v: string) => boolean | string
}

export function useFieldRules(): IFieldRulesComposition {
  const required = (v: string | number) => (!!v || v === 0) || 'validation.required'

  const lengthValue = (v: string, maxLength = 255) => v?.length <= maxLength || 'validation.lengthValue'

  const isNumber = (v: string) => !Number.isNaN(+v) || 'validation.number'

  const isPositiveIntegerNumber = (v: string) => {
    return ((Number(v) >= 0) && Number(v) % 1 === 0) || 'validation.positiveIntegerNumber'
  }

  const isEmail = (v: string) => {
    return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v) || 'validation.validateEmail'
  }

  return {
    required,
    isNumber,
    lengthValue,
    isPositiveIntegerNumber,
    isEmail,
  }
}
