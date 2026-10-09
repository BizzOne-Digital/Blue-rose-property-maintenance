"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, Save, Trash2, LogOut } from "lucide-react";
import type { CatalogAddon, CatalogPlan, CatalogService, ServiceCatalog } from "@/lib/service-catalog/types";
import { slugifyId } from "@/lib/service-catalog/format";
import { CATALOG_UPDATED_EVENT, useCatalog } from "@/lib/service-catalog/client";

const emptyService = (): CatalogService => ({
  id: "",
  name: "",
  active: true,
  featured: false,
  mainPriceDisplay: "",
  shortDescription: "",
  description: "",
  image: "/images/carpet-cleaning-hero.jpg",
  items: [],
  benefits: [],
  bookingMode: "plans",
  plans: [],
  addons: [],
  extraPricingLines: [],
});

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-navy/60">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm text-navy focus:border-royal focus:outline-none";

/** Same output on server and client (avoids hydration mismatch from toLocaleString). */
function formatCatalogUpdatedAt(iso: string): string {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) return iso;
  const [, year, month, day, hour, minute] = match;
  return `${year}-${month}-${day} ${hour}:${minute} UTC`;
}

export function AdminDashboard({ initialCatalog }: { initialCatalog: ServiceCatalog }) {
  const router = useRouter();
  const { refresh: refreshPublicCatalog } = useCatalog();
  const [catalog, setCatalog] = useState<ServiceCatalog>(initialCatalog);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateService = (index: number, patch: Partial<CatalogService>) => {
    if (!catalog) return;
    const services = [...catalog.services];
    services[index] = { ...services[index], ...patch };
    setCatalog({ ...catalog, services });
  };

  const removeService = (index: number) => {
    if (!catalog) return;
    if (!confirm("Remove this service from the catalog?")) return;
    setCatalog({
      ...catalog,
      services: catalog.services.filter((_, i) => i !== index),
    });
  };

  const addService = () => {
    if (!catalog) return;
    const base = emptyService();
    base.id = `new-service-${Date.now()}`;
    base.name = "New Service";
    base.mainPriceDisplay = "Call for quote";
    setCatalog({ ...catalog, services: [...catalog.services, base] });
  };

  const save = async () => {
    if (!catalog) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    const res = await fetch("/api/admin/catalog", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(catalog),
    });
    setSaving(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Save failed.");
      return;
    }
    const saved = (await res.json()) as ServiceCatalog;
    setCatalog(saved);
    await refreshPublicCatalog();
    window.dispatchEvent(new Event(CATALOG_UPDATED_EVENT));
    setMessage(
      `Saved at ${formatCatalogUpdatedAt(saved.updatedAt)}. Open Pricing or Services to verify.`
    );
    router.refresh();
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Services & pricing</h1>
          <p className="mt-1 text-sm text-navy/60">
            Main price, plans, and add-ons for each service. Last saved:{" "}
            {formatCatalogUpdatedAt(catalog.updatedAt)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={addService}
            className="inline-flex items-center gap-2 rounded-lg border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-royal/40"
          >
            <Plus className="h-4 w-4" /> Add service
          </button>
          <button
            type="button"
            onClick={() => void save()}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-royal px-4 py-2 text-sm font-semibold text-white hover:bg-[#064EDB] disabled:opacity-60"
          >
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save changes to site"}
          </button>
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex items-center gap-2 rounded-lg border border-navy/15 px-4 py-2 text-sm text-navy/70"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </div>

      {message && (
        <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">{message}</p>
      )}
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <div className="space-y-8">
        {catalog.services.map((service, serviceIndex) => (
          <ServiceEditor
            key={serviceIndex}
            service={service}
            onChange={(patch) => updateService(serviceIndex, patch)}
            onRemove={() => removeService(serviceIndex)}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceEditor({
  service,
  onChange,
  onRemove,
}: {
  service: CatalogService;
  onChange: (patch: Partial<CatalogService>) => void;
  onRemove: () => void;
}) {
  const setPlans = (plans: CatalogPlan[]) => onChange({ plans });
  const setAddons = (addons: CatalogAddon[]) => onChange({ addons });

  const addPlan = () => {
    const id = slugifyId(`plan-${service.plans.length + 1}`) || `plan-${Date.now()}`;
    setPlans([
      ...service.plans,
      { id, label: "New plan", price: 0, description: "" },
    ]);
  };

  const addAddon = () => {
    const id = slugifyId(`addon-${service.addons.length + 1}`) || `addon-${Date.now()}`;
    setAddons([...service.addons, { id, label: "New add-on", price: 0 }]);
  };

  return (
    <section className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <h2 className="font-heading text-xl font-bold text-navy">{service.name || "Untitled service"}</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={service.active}
              onChange={(e) => onChange({ active: e.target.checked })}
            />
            Active on site
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={service.featured ?? false}
              onChange={(e) => onChange({ featured: e.target.checked })}
            />
            Featured
          </label>
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1 text-red-600 hover:underline"
          >
            <Trash2 className="h-4 w-4" /> Remove
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Service name">
          <input
            className={inputClass}
            value={service.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </Field>
        <Field label="Service ID (URL slug)">
          <input
            className={inputClass}
            value={service.id}
            onChange={(e) => onChange({ id: e.target.value })}
            onBlur={(e) => onChange({ id: slugifyId(e.target.value) || service.id })}
          />
        </Field>
        <Field label="Main price (headline)">
          <input
            className={inputClass}
            value={service.mainPriceDisplay}
            onChange={(e) => onChange({ mainPriceDisplay: e.target.value })}
            placeholder="e.g. Packages from $99"
          />
        </Field>
        <Field label="Booking form type">
          <select
            className={inputClass}
            value={service.bookingMode}
            onChange={(e) =>
              onChange({ bookingMode: e.target.value as CatalogService["bookingMode"] })
            }
          >
            <option value="plans">Plans + add-ons (carpet, snow)</option>
            <option value="property-size">Property size + add-ons (lawn)</option>
            <option value="bedrooms">Bedrooms + add-ons (home cleaning)</option>
          </select>
        </Field>
        <Field label="Hero image path">
          <input
            className={inputClass}
            value={service.image}
            onChange={(e) => onChange({ image: e.target.value })}
          />
        </Field>
        <Field label="Pricing page note">
          <input
            className={inputClass}
            value={service.pricingNote ?? ""}
            onChange={(e) => onChange({ pricingNote: e.target.value })}
          />
        </Field>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-navy">Plans / packages</h3>
          <button
            type="button"
            onClick={addPlan}
            className="text-sm font-semibold text-royal hover:underline"
          >
            + Add plan
          </button>
        </div>
        {service.plans.length === 0 ? (
          <p className="text-sm text-navy/50">No plans — booking may use main price only.</p>
        ) : (
          <div className="space-y-3">
            {service.plans.map((plan, i) => (
              <div
                key={i}
                className="grid gap-2 rounded-xl border border-navy/10 p-3 sm:grid-cols-2 lg:grid-cols-4"
              >
                <input
                  className={inputClass}
                  placeholder="Label"
                  value={plan.label}
                  onChange={(e) => {
                    const plans = [...service.plans];
                    plans[i] = { ...plan, label: e.target.value };
                    setPlans(plans);
                  }}
                />
                <input
                  className={inputClass}
                  placeholder="Price ($)"
                  type="number"
                  value={plan.price}
                  onChange={(e) => {
                    const plans = [...service.plans];
                    plans[i] = { ...plan, price: Number(e.target.value) };
                    setPlans(plans);
                  }}
                />
                <input
                  className={inputClass}
                  placeholder="Display (optional) e.g. $60–$80"
                  value={plan.priceDisplay ?? ""}
                  onChange={(e) => {
                    const plans = [...service.plans];
                    plans[i] = { ...plan, priceDisplay: e.target.value || undefined };
                    setPlans(plans);
                  }}
                />
                <div className="flex gap-2">
                  <input
                    className={inputClass}
                    placeholder="Plan ID"
                    value={plan.id}
                    onChange={(e) => {
                      const plans = [...service.plans];
                      plans[i] = { ...plan, id: e.target.value };
                      setPlans(plans);
                    }}
                    onBlur={(e) => {
                      const plans = [...service.plans];
                      plans[i] = { ...plan, id: slugifyId(e.target.value) || plan.id };
                      setPlans(plans);
                    }}
                  />
                  <button
                    type="button"
                    className="shrink-0 rounded-lg border border-red-200 px-2 text-red-600"
                    onClick={() => setPlans(service.plans.filter((_, idx) => idx !== i))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-navy">Add-ons</h3>
          <button
            type="button"
            onClick={addAddon}
            className="text-sm font-semibold text-royal hover:underline"
          >
            + Add add-on
          </button>
        </div>
        <div className="space-y-3">
          {service.addons.map((addon, i) => (
            <div
              key={i}
              className="grid gap-2 rounded-xl border border-navy/10 p-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              <input
                className={inputClass}
                placeholder="Label"
                value={addon.label}
                onChange={(e) => {
                  const addons = [...service.addons];
                  addons[i] = { ...addon, label: e.target.value };
                  setAddons(addons);
                }}
              />
              <input
                className={inputClass}
                placeholder="Price ($) or empty for quote"
                type="number"
                value={addon.price ?? ""}
                onChange={(e) => {
                  const addons = [...service.addons];
                  const val = e.target.value;
                  addons[i] = { ...addon, price: val === "" ? null : Number(val) };
                  setAddons(addons);
                }}
              />
              <input
                className={inputClass}
                placeholder="Display override"
                value={addon.priceDisplay ?? ""}
                onChange={(e) => {
                  const addons = [...service.addons];
                  addons[i] = { ...addon, priceDisplay: e.target.value || undefined };
                  setAddons(addons);
                }}
              />
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  placeholder="Addon ID"
                  value={addon.id}
                  onChange={(e) => {
                    const addons = [...service.addons];
                    addons[i] = { ...addon, id: e.target.value };
                    setAddons(addons);
                  }}
                  onBlur={(e) => {
                    const addons = [...service.addons];
                    addons[i] = { ...addon, id: slugifyId(e.target.value) || addon.id };
                    setAddons(addons);
                  }}
                />
                <button
                  type="button"
                  className="shrink-0 rounded-lg border border-red-200 px-2 text-red-600"
                  onClick={() => setAddons(service.addons.filter((_, idx) => idx !== i))}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {service.commercialNote !== undefined && (
        <Field label="Commercial / quote note (snow)">
          <input
            className={`${inputClass} mt-4`}
            value={service.commercialNote}
            onChange={(e) => onChange({ commercialNote: e.target.value })}
          />
        </Field>
      )}
    </section>
  );
}
