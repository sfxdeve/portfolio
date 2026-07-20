import { identity } from "@/catalog/portfolio";

export function ProfileSection({ location }: { location?: string }) {
  return (
    <section aria-label="Profile" className="mt-8 border-t border-foreground pt-8">
      <h2 className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
        Profile
      </h2>
      <p className="mt-3 text-base leading-relaxed text-foreground/80">{identity.bio}</p>
      {location ? (
        <p className="mt-3 font-mono text-[11px] text-muted-foreground">{location}</p>
      ) : null}
    </section>
  );
}
