// plugins/toast.ts
import { defineNuxtPlugin, NuxtApp } from "#app";
import {
  toast as _toast,
  type ToastPosition,
  type ToastOptions as VueToastOptions,
} from "vue3-toastify";
import "vue3-toastify/dist/index.css";

/** Options you can override when calling any toast method */
export interface ToastOverrides {
  /** How long before auto-closing (ms) */
  autoClose?: number;
  /** Position on screen */
  position?: ToastPosition;
}

/** The full set of methods available on our toast instance */
export interface ToastInstance {
  /** Default/info-style toast */
  (message: string, options?: ToastOverrides): void;
  /** Success-style toast */
  success(message: string, options?: ToastOverrides): void;
  /** Error-style toast */
  error(message: string, options?: ToastOverrides): void;
  /** Info-style toast (alias of default) */
  info(message: string, options?: ToastOverrides): void;
  /** Warning-style toast */
  warning(message: string, options?: ToastOverrides): void;
}

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  // Base defaults for all toasts
  const baseOptions: VueToastOptions = {
    position: "top-right",
    autoClose: 5000,
    closeButton: true,
    pauseOnHover: true,
    draggable: true,
  };

  // Build our toast instance
  const toast: ToastInstance = Object.assign(
    // Default function = info-style
    ((message: string, opts: ToastOverrides = {}) => {
      _toast(message, { ...baseOptions, ...opts });
    }) as ToastInstance,
    {
      success: (message: string, opts: ToastOverrides = {}) => {
        _toast.success(message, {
          ...baseOptions,
          autoClose: opts.autoClose ?? 3000,
          position: opts.position ?? "top-right",
        });
      },
      error: (message: string, opts: ToastOverrides = {}) => {
        _toast.error(message, {
          ...baseOptions,
          autoClose: opts.autoClose ?? 5000,
          position: opts.position ?? "top-right",
        });
      },
      info: (message: string, opts: ToastOverrides = {}) => {
        _toast.info(message, {
          ...baseOptions,
          autoClose: opts.autoClose ?? 5000,
          position: opts.position ?? "top-right",
        });
      },
      warning: (message: string, opts: ToastOverrides = {}) => {
        _toast.warning(message, {
          ...baseOptions,
          autoClose: opts.autoClose ?? 4000,
          position: opts.position ?? "top-right",
        });
      },
    }
  );

  // Provide it under the key 'toast'
  nuxtApp.provide("toast", toast);
});
