interface CardMeta {
  label: string;
  values: string[];
}

interface ProjectCardProps {
  image?: string;
  heading?: string;
  year?: string;
  role?: string;
  counter?: string;
  description?: string;
  services?: string[];
  metas?: CardMeta[];
  className?: string;
  style?: React.CSSProperties;
}

const ProjectCard = ({
  image,
  heading = "PROJECT",
  year = "2024",
  role = "Designer",
  counter = "01 / 01",
  description = "We've partnered with businesses across various industries to help them achieve their goals.",
  services = ["Designing", "Branding", "Development"],
  metas = [],
  className = "",
  style,
}: ProjectCardProps) => {
  return (
    <div
      className={`relative w-full h-full rounded-3xl overflow-hidden flex ${className}`}
      style={style}
    >
      {image ? (
        <img
          src={image}
          alt={heading}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-stone-800 via-stone-700 to-stone-900" />
      )}

      <div className="absolute inset-0 backdrop-blur-sm to-black/40" />

      {/* ── LEFT SIDEBAR ── description + counter + heading */}
      <div className="relative z-10 flex flex-col justify-between p-8 w-64 shrink-0">
        {/* Description top-left */}
        <p
          className="text-white/70 text-sm leading-relaxed"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {description}
        </p>

        {/* Counter + Heading bottom-left */}
        <div>
          <p
            className="text-white/60 text-sm mb-2 tracking-widest"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            {counter}
          </p>
          <div className="w-8 h-px bg-white/40 mb-3" />
          <h2
            className="text-white font-black text-5xl leading-none tracking-tight"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            {heading}
          </h2>
        </div>
      </div>

      {/* ── CENTER — takes up remaining space (image shows through) ── */}
      <div className="flex-1" />
      <div>
        <img src={image} alt="" />
      </div>

      {/* ── RIGHT SIDEBAR ── meta info */}
      <div
        className="relative z-10 flex flex-col justify-start gap-8 p-8 w-56 shrink-0"
        style={{ paddingTop: "2.5rem" }}
      >
        {/* Year */}
        <div>
          <p
            className="text-white/50 text-xs uppercase tracking-widest mb-1"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Year
          </p>
          <p
            className="text-white font-black text-3xl"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            {year}
          </p>
        </div>

        {/* Role */}
        <div>
          <p
            className="text-white/50 text-xs uppercase tracking-widest mb-1"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Role
          </p>
          <p
            className="text-white font-bold text-base"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {role}
          </p>
        </div>

        {/* Services */}
        {services.length > 0 && (
          <div>
            <p
              className="text-white/50 text-xs uppercase tracking-widest mb-2"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              Services
            </p>
            <ul className="flex flex-col gap-1">
              {services.map((s) => (
                <li
                  key={s}
                  className="text-white font-bold text-base"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Any additional custom meta rows */}
        {metas.map((meta) => (
          <div key={meta.label}>
            <p
              className="text-white/50 text-xs uppercase tracking-widest mb-2"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              {meta.label}
            </p>
            <ul className="flex flex-col gap-1">
              {meta.values.map((v) => (
                <li
                  key={v}
                  className="text-white font-bold text-base"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
