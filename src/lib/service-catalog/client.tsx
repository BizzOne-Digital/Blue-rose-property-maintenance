"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export const CATALOG_UPDATED_EVENT = "blue-rose-catalog-updated";
import type { CatalogService, ServiceCatalog } from "./types";

interface CatalogContextValue {
  catalog: ServiceCatalog;
  refresh: () => Promise<void>;
  getService: (id: string) => CatalogService | undefined;
  activeServices: CatalogService[];
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({
  initialCatalog,
  children,
}: {
  initialCatalog: ServiceCatalog;
  children: ReactNode;
}) {
  const [catalog, setCatalog] = useState(initialCatalog);
  const pathname = usePathname();
  const skipPathRefresh = useRef(true);

  const refresh = useCallback(async () => {
    const res = await fetch(`/api/catalog?t=${Date.now()}`, { cache: "no-store" });
    if (res.ok) {
      setCatalog(await res.json());
    }
  }, []);

  useEffect(() => {
    if (skipPathRefresh.current) {
      skipPathRefresh.current = false;
      return;
    }
    void refresh();
  }, [pathname, refresh]);

  useEffect(() => {
    const onFocus = () => {
      void refresh();
    };
    const onCatalogUpdated = () => {
      void refresh();
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener(CATALOG_UPDATED_EVENT, onCatalogUpdated);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener(CATALOG_UPDATED_EVENT, onCatalogUpdated);
    };
  }, [refresh]);

  const value = useMemo(() => {
    const activeServices = catalog.services.filter((s) => s.active);
    return {
      catalog,
      refresh,
      activeServices,
      getService: (id: string) => catalog.services.find((s) => s.id === id),
    };
  }, [catalog, refresh]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error("useCatalog must be used within CatalogProvider");
  }
  return ctx;
}
