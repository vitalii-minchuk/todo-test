import type { App } from '@vue/runtime-core'
import type { Router } from 'vue-router'

export type TAppContext = (ctx: { app: App, router: Router }) => void

export type TRecordable<T = any> = Record<string, T>
