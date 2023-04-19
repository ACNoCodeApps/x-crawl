import { IncomingHttpHeaders } from 'node:http'
import { Browser, HTTPResponse, Page, Protocol, Viewport } from 'puppeteer'

import { AnyObject } from './common'

/* API Config */

// API crawl config

// API crawl config other
export type IntervalTime = number | { max: number; min?: number }

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK'

export type PageCookies =
  | string
  | Protocol.Network.CookieParam
  | Protocol.Network.CookieParam[]

export type Platform =
  | 'Android'
  | 'Chrome OS'
  | 'Chromium OS'
  | 'iOS'
  | 'Linux'
  | 'macOS'
  | 'Windows'
  | 'Unknown'

export type Mobile = '?0' | '?1'

export interface DetailTargetFingerprintCommon {
  userAgent?: string
  ua?: string
  platform?: Platform
  platformVersion?: string
  mobile?: Mobile
  acceptLanguage?: string
}

export interface AdvancedFingerprintCommon {
  userAgents?: string[]
  uas?: string[]
  platforms?: Platform[]
  platformVersions?: string[]
  mobiles?: Mobile[]
  acceptLanguages?: string[]
}

export interface CrawlCommonConfig {
  timeout?: number
  proxy?: string
  maxRetry?: number
}

// 1.Detail target
export interface CrawlPageDetailTargetConfig extends CrawlCommonConfig {
  url: string
  headers?: AnyObject | null
  cookies?: PageCookies | null
  priority?: number
  viewport?: Viewport | null
  fingerprint?:
    | (DetailTargetFingerprintCommon & {
        maxWidth: number
        minWidth?: number
        maxHeight: number
        minHidth?: number
      })
    | null
}

export interface CrawlDataDetailTargetConfig extends CrawlCommonConfig {
  url: string
  method?: Method
  headers?: AnyObject | null
  params?: AnyObject
  data?: any
  priority?: number
  fingerprint?: DetailTargetFingerprintCommon | null
}

export interface CrawlFileDetailTargetConfig extends CrawlCommonConfig {
  url: string
  headers?: AnyObject | null
  priority?: number
  storeDir?: string | null
  fileName?: string
  extension?: string | null
  fingerprint?: DetailTargetFingerprintCommon | null
}

// 2.Advanced
export interface CrawlPageAdvancedConfig extends CrawlCommonConfig {
  targets: (string | CrawlPageDetailTargetConfig)[]
  intervalTime?: IntervalTime
  fingerprint?: AdvancedFingerprintCommon & {
    maxWidth: number
    minWidth?: number
    maxHeight: number
    minHidth?: number
  }

  headers?: AnyObject
  cookies?: PageCookies
  viewport?: Viewport

  onCrawlItemComplete?: (crawlPageSingleRes: CrawlPageSingleRes) => void
}

export interface CrawlDataAdvancedConfig<T> extends CrawlCommonConfig {
  targets: (string | CrawlDataDetailTargetConfig)[]
  intervalTime?: IntervalTime
  fingerprint?: AdvancedFingerprintCommon

  headers?: AnyObject

  onCrawlItemComplete?: (crawlDataSingleRes: CrawlDataSingleRes<T>) => void
}

export interface CrawlFileAdvancedConfig extends CrawlCommonConfig {
  targets: (string | CrawlFileDetailTargetConfig)[]
  intervalTime?: IntervalTime
  fingerprint?: AdvancedFingerprintCommon

  headers?: AnyObject
  storeDir?: string
  extension?: string

  onCrawlItemComplete?: (crawlFileSingleRes: CrawlFileSingleRes) => void
  onBeforeSaveItemFile?: (info: {
    id: number
    fileName: string
    filePath: string
    data: Buffer
  }) => Promise<Buffer>
}

export interface StartPollingConfig {
  d?: number
  h?: number
  m?: number
}

/* API Result */
export interface CrawlCommonRes {
  id: number
  isSuccess: boolean
  maxRetry: number
  retryCount: number
  crawlErrorQueue: Error[]
}

export interface CrawlPageSingleRes extends CrawlCommonRes {
  data: {
    browser: Browser
    response: HTTPResponse | null
    page: Page
  }
}

export interface CrawlDataSingleRes<D> extends CrawlCommonRes {
  data: {
    statusCode: number | undefined
    headers: IncomingHttpHeaders
    data: D
  } | null
}

export interface CrawlFileSingleRes extends CrawlCommonRes {
  data: {
    statusCode: number | undefined
    headers: IncomingHttpHeaders
    data: {
      isSuccess: boolean
      fileName: string
      fileExtension: string
      mimeType: string
      size: number
      filePath: string
    }
  } | null
}
