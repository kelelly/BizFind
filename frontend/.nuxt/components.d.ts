
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'BusinessCard': typeof import("../components/BusinessCard.vue")['default']
    'Map': typeof import("../components/Map.vue")['default']
    'MapSearch': typeof import("../components/MapSearch.vue")['default']
    'ProductDetails': typeof import("../components/ProductDetails.vue")['default']
    'ProductList': typeof import("../components/ProductList.vue")['default']
    'BusinessAddProduct': typeof import("../components/businessAddProduct.vue")['default']
    'BusinessCreateAccount': typeof import("../components/businessCreateAccount.vue")['default']
    'BusinessEdit': typeof import("../components/businessEdit.vue")['default']
    'BusinessList': typeof import("../components/businessList.vue")['default']
    'BusinessLogin': typeof import("../components/businessLogin.vue")['default']
    'BusinessProfile': typeof import("../components/businessProfile.vue")['default']
    'LayoutAppFooter': typeof import("../components/layout/AppFooter.vue")['default']
    'LayoutAppHeader': typeof import("../components/layout/AppHeader.vue")['default']
    'LogoutButton': typeof import("../components/logoutButton.vue")['default']
    'UserCreateAccount': typeof import("../components/userCreateAccount.vue")['default']
    'UserLogin': typeof import("../components/userLogin.vue")['default']
    'ProseA': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']
    'ProseBlockquote': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']
    'ProseCode': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue")['default']
    'ProseEm': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']
    'ProseH1': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']
    'ProseH2': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']
    'ProseH3': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']
    'ProseH4': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']
    'ProseH5': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']
    'ProseH6': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']
    'ProseHr': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']
    'ProseImg': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']
    'ProseLi': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']
    'ProseOl': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']
    'ProseP': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']
    'ProsePre': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue")['default']
    'ProseScript': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']
    'ProseStrong': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']
    'ProseTable': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']
    'ProseTbody': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']
    'ProseTd': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']
    'ProseTh': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']
    'ProseThead': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']
    'ProseTr': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']
    'ProseUl': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'ContentRenderer': typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']
    'MDC': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']
    'MDCCached': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCCached.vue")['default']
    'MDCRenderer': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']
    'MDCSlot': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']
    'ColorScheme': typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyBusinessCard': LazyComponent<typeof import("../components/BusinessCard.vue")['default']>
    'LazyMap': LazyComponent<typeof import("../components/Map.vue")['default']>
    'LazyMapSearch': LazyComponent<typeof import("../components/MapSearch.vue")['default']>
    'LazyProductDetails': LazyComponent<typeof import("../components/ProductDetails.vue")['default']>
    'LazyProductList': LazyComponent<typeof import("../components/ProductList.vue")['default']>
    'LazyBusinessAddProduct': LazyComponent<typeof import("../components/businessAddProduct.vue")['default']>
    'LazyBusinessCreateAccount': LazyComponent<typeof import("../components/businessCreateAccount.vue")['default']>
    'LazyBusinessEdit': LazyComponent<typeof import("../components/businessEdit.vue")['default']>
    'LazyBusinessList': LazyComponent<typeof import("../components/businessList.vue")['default']>
    'LazyBusinessLogin': LazyComponent<typeof import("../components/businessLogin.vue")['default']>
    'LazyBusinessProfile': LazyComponent<typeof import("../components/businessProfile.vue")['default']>
    'LazyLayoutAppFooter': LazyComponent<typeof import("../components/layout/AppFooter.vue")['default']>
    'LazyLayoutAppHeader': LazyComponent<typeof import("../components/layout/AppHeader.vue")['default']>
    'LazyLogoutButton': LazyComponent<typeof import("../components/logoutButton.vue")['default']>
    'LazyUserCreateAccount': LazyComponent<typeof import("../components/userCreateAccount.vue")['default']>
    'LazyUserLogin': LazyComponent<typeof import("../components/userLogin.vue")['default']>
    'LazyProseA': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']>
    'LazyProseBlockquote': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']>
    'LazyProseCode': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue")['default']>
    'LazyProseEm': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']>
    'LazyProseH1': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']>
    'LazyProseH2': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']>
    'LazyProseH3': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']>
    'LazyProseH4': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']>
    'LazyProseH5': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']>
    'LazyProseH6': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']>
    'LazyProseHr': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']>
    'LazyProseImg': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']>
    'LazyProseLi': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']>
    'LazyProseOl': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']>
    'LazyProseP': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']>
    'LazyProsePre': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue")['default']>
    'LazyProseScript': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']>
    'LazyProseStrong': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']>
    'LazyProseTable': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']>
    'LazyProseTbody': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']>
    'LazyProseTd': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']>
    'LazyProseTh': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']>
    'LazyProseThead': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']>
    'LazyProseTr': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']>
    'LazyProseUl': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyContentRenderer': LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']>
    'LazyMDC': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']>
    'LazyMDCCached': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCCached.vue")['default']>
    'LazyMDCRenderer': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']>
    'LazyMDCSlot': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']>
    'LazyColorScheme': LazyComponent<typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const BusinessCard: typeof import("../components/BusinessCard.vue")['default']
export const Map: typeof import("../components/Map.vue")['default']
export const MapSearch: typeof import("../components/MapSearch.vue")['default']
export const ProductDetails: typeof import("../components/ProductDetails.vue")['default']
export const ProductList: typeof import("../components/ProductList.vue")['default']
export const BusinessAddProduct: typeof import("../components/businessAddProduct.vue")['default']
export const BusinessCreateAccount: typeof import("../components/businessCreateAccount.vue")['default']
export const BusinessEdit: typeof import("../components/businessEdit.vue")['default']
export const BusinessList: typeof import("../components/businessList.vue")['default']
export const BusinessLogin: typeof import("../components/businessLogin.vue")['default']
export const BusinessProfile: typeof import("../components/businessProfile.vue")['default']
export const LayoutAppFooter: typeof import("../components/layout/AppFooter.vue")['default']
export const LayoutAppHeader: typeof import("../components/layout/AppHeader.vue")['default']
export const LogoutButton: typeof import("../components/logoutButton.vue")['default']
export const UserCreateAccount: typeof import("../components/userCreateAccount.vue")['default']
export const UserLogin: typeof import("../components/userLogin.vue")['default']
export const ProseA: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']
export const ProseBlockquote: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']
export const ProseCode: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue")['default']
export const ProseEm: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']
export const ProseH1: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']
export const ProseH2: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']
export const ProseH3: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']
export const ProseH4: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']
export const ProseH5: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']
export const ProseH6: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']
export const ProseHr: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']
export const ProseImg: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']
export const ProseLi: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']
export const ProseOl: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']
export const ProseP: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']
export const ProsePre: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue")['default']
export const ProseScript: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']
export const ProseStrong: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']
export const ProseTable: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']
export const ProseTbody: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']
export const ProseTd: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']
export const ProseTh: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']
export const ProseThead: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']
export const ProseTr: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']
export const ProseUl: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const ContentRenderer: typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']
export const MDC: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']
export const MDCCached: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCCached.vue")['default']
export const MDCRenderer: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']
export const MDCSlot: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']
export const ColorScheme: typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyBusinessCard: LazyComponent<typeof import("../components/BusinessCard.vue")['default']>
export const LazyMap: LazyComponent<typeof import("../components/Map.vue")['default']>
export const LazyMapSearch: LazyComponent<typeof import("../components/MapSearch.vue")['default']>
export const LazyProductDetails: LazyComponent<typeof import("../components/ProductDetails.vue")['default']>
export const LazyProductList: LazyComponent<typeof import("../components/ProductList.vue")['default']>
export const LazyBusinessAddProduct: LazyComponent<typeof import("../components/businessAddProduct.vue")['default']>
export const LazyBusinessCreateAccount: LazyComponent<typeof import("../components/businessCreateAccount.vue")['default']>
export const LazyBusinessEdit: LazyComponent<typeof import("../components/businessEdit.vue")['default']>
export const LazyBusinessList: LazyComponent<typeof import("../components/businessList.vue")['default']>
export const LazyBusinessLogin: LazyComponent<typeof import("../components/businessLogin.vue")['default']>
export const LazyBusinessProfile: LazyComponent<typeof import("../components/businessProfile.vue")['default']>
export const LazyLayoutAppFooter: LazyComponent<typeof import("../components/layout/AppFooter.vue")['default']>
export const LazyLayoutAppHeader: LazyComponent<typeof import("../components/layout/AppHeader.vue")['default']>
export const LazyLogoutButton: LazyComponent<typeof import("../components/logoutButton.vue")['default']>
export const LazyUserCreateAccount: LazyComponent<typeof import("../components/userCreateAccount.vue")['default']>
export const LazyUserLogin: LazyComponent<typeof import("../components/userLogin.vue")['default']>
export const LazyProseA: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']>
export const LazyProseBlockquote: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']>
export const LazyProseCode: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue")['default']>
export const LazyProseEm: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']>
export const LazyProseH1: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']>
export const LazyProseH2: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']>
export const LazyProseH3: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']>
export const LazyProseH4: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']>
export const LazyProseH5: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']>
export const LazyProseH6: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']>
export const LazyProseHr: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']>
export const LazyProseImg: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']>
export const LazyProseLi: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']>
export const LazyProseOl: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']>
export const LazyProseP: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']>
export const LazyProsePre: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue")['default']>
export const LazyProseScript: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']>
export const LazyProseStrong: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']>
export const LazyProseTable: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']>
export const LazyProseTbody: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']>
export const LazyProseTd: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']>
export const LazyProseTh: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']>
export const LazyProseThead: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']>
export const LazyProseTr: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']>
export const LazyProseUl: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyContentRenderer: LazyComponent<typeof import("../node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue")['default']>
export const LazyMDC: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']>
export const LazyMDCCached: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCCached.vue")['default']>
export const LazyMDCRenderer: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']>
export const LazyMDCSlot: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']>
export const LazyColorScheme: LazyComponent<typeof import("../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue3.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
