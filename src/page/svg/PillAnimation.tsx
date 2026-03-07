import { useEffect, useRef } from "react";
import { TbMedicalCrossFilled } from "react-icons/tb";

const ITEMS: string[] = [
  "HTML",
  "CSS",
  "Java Script",
  "Tailwind CSS",
  "Node Js",
  "Express Js",
  "React Js",
];

const RADIUS = 200;

interface Position {
  x: number;
  y: number;
}

interface Velocity {
  vx: number;
  vy: number;
}

interface ClampResult {
  x: number;
  y: number;
  hit: boolean;
}

export default function PillAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useRef<Position[]>([]);
  const velocities = useRef<Velocity[]>([]);
  const mousePos = useRef<Position>({ x: 9999, y: 9999 });
  const mouseInside = useRef<boolean>(false);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const R = RADIUS;

    positions.current = ITEMS.map((_, i) => ({
      x: (Math.random() - 0.5) * R * 1.2,
      y: -R - 60 - i * 70,
    }));

    velocities.current = ITEMS.map(
      (): Velocity => ({
        vx: (Math.random() - 0.5) * 2,
        vy: 0,
      }),
    );

    const GRAVITY = 0.55;
    const DAMPING = 0.55;
    const FRICTION = 0.988;
    const SETTLE_FRICTION = 0.94;
    const STOP_THRESHOLD = 0.25;

    const ELASTICITY = 0.82;
    const REPULSION_RADIUS = 90;
    const REPULSION_FORCE = 18;

    function clampToCircle(
      x: number,
      y: number,
      hw: number,
      hh: number,
    ): ClampResult {
      const dist = Math.sqrt(x * x + y * y);
      const maxDist = R - Math.max(hw, hh) - 2;
      if (dist > maxDist) {
        const scale = maxDist / dist;
        return { x: x * scale, y: y * scale, hit: true };
      }
      return { x, y, hit: false };
    }

    function resolvePillCollisions(): void {
      const n = ITEMS.length;

      for (let a = 0; a < n; a++) {
        for (let b = a + 1; b < n; b++) {
          const elA = itemRefs.current[a];
          const elB = itemRefs.current[b];
          if (!elA || !elB) continue;

          const hwA = elA.offsetWidth / 2;
          const hhA = elA.offsetHeight / 2;
          const hwB = elB.offsetWidth / 2;
          const hhB = elB.offsetHeight / 2;

          const posA = positions.current[a];
          const posB = positions.current[b];

          const dx = posB.x - posA.x;
          const dy = posB.y - posA.y;

          const overlapX = hwA + hwB - Math.abs(dx);
          const overlapY = hhA + hhB - Math.abs(dy);

          if (overlapX > 0 && overlapY > 0) {
            if (overlapX < overlapY) {
              const sign = dx > 0 ? 1 : -1;

              positions.current[a].x -= (sign * overlapX) / 2;
              positions.current[b].x += (sign * overlapX) / 2;

              const vxA = velocities.current[a].vx;
              const vxB = velocities.current[b].vx;

              velocities.current[a].vx = vxB * ELASTICITY;
              velocities.current[b].vx = vxA * ELASTICITY;
            } else {
              const sign = dy > 0 ? 1 : -1;

              positions.current[a].y -= (sign * overlapY) / 2;
              positions.current[b].y += (sign * overlapY) / 2;

              const vyA = velocities.current[a].vy;
              const vyB = velocities.current[b].vy;

              velocities.current[a].vy = vyB * ELASTICITY;
              velocities.current[b].vy = vyA * ELASTICITY;
            }
          }
        }
      }
    }

    function step(): void {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;

        let { x, y } = positions.current[i];
        let { vx, vy } = velocities.current[i];

        vy += GRAVITY;

        vx *= mouseInside.current ? FRICTION : SETTLE_FRICTION;

        if (mouseInside.current) {
          const mx = mousePos.current.x;
          const my = mousePos.current.y;

          const dx = x - mx;
          const dy = y - my;

          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < REPULSION_RADIUS && dist > 0.1) {
            const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS;

            vx += (dx / dist) * force * REPULSION_FORCE;
            vy += (dy / dist) * force * REPULSION_FORCE;
          }
        }

        if (!mouseInside.current) {
          if (Math.abs(vx) < STOP_THRESHOLD) vx = 0;
          if (Math.abs(vy) < STOP_THRESHOLD) vy = 0;
        }

        x += vx;
        y += vy;

        const hw = el.offsetWidth / 2;
        const hh = el.offsetHeight / 2;

        const prevDist =
          Math.sqrt(
            positions.current[i].x ** 2 + positions.current[i].y ** 2,
          ) || 1;

        const nx = positions.current[i].x / prevDist;
        const ny = positions.current[i].y / prevDist;

        const clamped = clampToCircle(x, y, hw, hh);

        if (clamped.hit) {
          const dot = vx * nx + vy * ny;

          vx = (vx - 2 * dot * nx) * DAMPING;
          vy = (vy - 2 * dot * ny) * DAMPING;

          x = clamped.x;
          y = clamped.y;
        }

        positions.current[i] = { x, y };
        velocities.current[i] = { vx, vy };
      });

      resolvePillCollisions();

      itemRefs.current.forEach((el, i) => {
        if (!el) return;

        const { x, y } = positions.current[i];

        el.style.transform = `translate(${x}px, ${y}px)`;
      });

      animRef.current = requestAnimationFrame(step);
    }

    animRef.current = requestAnimationFrame(step);

    function getRelativePos(e: MouseEvent | TouchEvent): Position {
      const src = (e as TouchEvent).touches
        ? (e as TouchEvent).touches[0]
        : (e as MouseEvent);

      const rect = container!.getBoundingClientRect();

      return {
        x: src.clientX - rect.left - rect.width / 2,
        y: src.clientY - rect.top - rect.height / 2,
      };
    }

    function onMouseMove(e: MouseEvent): void {
      mousePos.current = getRelativePos(e);
    }

    function onMouseEnter(): void {
      mouseInside.current = true;
    }

    function onMouseLeave(): void {
      mouseInside.current = false;
      mousePos.current = { x: 9999, y: 9999 };
    }

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);

      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: "relative",
          borderRadius: "50%",
          overflow: "hidden",
          width: RADIUS * 2,
          height: RADIUS * 2,
          border: "1.5px solid rgba(255,140,20,0.35)",
          boxShadow:
            "0 0 60px 10px rgba(200,80,0,0.25), inset 0 0 80px rgba(0,0,0,0.6)",
        }}
      >
        {ITEMS.map((label, i) => (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-14px",
              marginLeft: "-70px",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 16px",
              background:
                "linear-gradient(135deg, #ff9a2e 0%, #e86a00 60%, #c45500 100%)",
              borderRadius: 999,
              color: "#5a1a00",
              fontWeight: 700,
              fontSize: 13,
              boxShadow:
                "0 4px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,210,120,0.4)",
              border: "1px solid rgba(255,200,80,0.25)",
              whiteSpace: "nowrap",
              willChange: "transform",
              pointerEvents: "none",
            }}
          >
            <TbMedicalCrossFilled />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
