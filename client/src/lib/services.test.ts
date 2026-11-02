import { describe, expect, it } from "vitest";
import { allServices } from "@/lib/data";

const removedServices = [
  "Security Alarm System Installation",
  "Annual Maintenance Contracts",
  "Remote Monitoring",
  "Emergency Repairs",
  "System Upgrades",
];

const newServices = ["Security Guards", "Security Escort Service", "Event Security"];

describe("Services catalog", () => {
  it("keeps the requested seven-service detail portfolio", () => {
    const titles = allServices.map((service) => service.title);

    expect(titles).toEqual([
      "24/7 Monitoring",
      "Armed Response",
      "Preventive Maintenance",
      "Security Audits",
      ...newServices,
    ]);
    expect(titles).toHaveLength(7);
  });

  it.each(removedServices)("removes %s from the detail portfolio", (title) => {
    expect(allServices.some((service) => service.title === title)).toBe(false);
  });

  it.each(newServices)("provides complete content for %s", (title) => {
    const service = allServices.find((item) => item.title === title);

    expect(service).toBeDefined();
    expect(service?.overview).toBeTruthy();
    expect(service?.benefits).toHaveLength(4);
    expect(service?.process).toHaveLength(5);
    expect(service?.responseTime).toBeTruthy();
    expect(service?.cta).toBeTruthy();
  });
});
