import { useEffect, useRef } from "react";
import { TbMedicalCrossFilled } from "react-icons/tb";

const ITEMS: string[] = [
  "Customer Support",
  "Passion",
  "Positive Experience",
  "Trustworthiness",
  "Customer Focus",
  "Reliability",
  "Quality",
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

export default function NewDraggableAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useRef<Position[]>([]);
  const velocities = useRef<Velocity[]>([]);
  const dragging = useRef<number | null>(null);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });

  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const R = RADIUS;

    positions.current = ITEMS.map((_, i) => ({
      x: (Math.random() - 0.5) * R * 2.4,
      y: -R - 80 - i * 60,
    }));

    velocities.current = ITEMS.map(
      (): Velocity => ({
        vx: (Math.random() - 0.5) * 2.5,
        vy: 0,
      }),
    );

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transform = `translate(${positions.current[i].x}px, ${positions.current[i].y}px)`;
    });

    const GRAVITY = 0.56;
    const DAMPING = 0.62;
    const FRICTION = 0.985;
    const BOUNCE_THRESHOLD = 4.8;
    const PILL_COLLISION_DAMPING = 0.8;

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
          if (dragging.current === a || dragging.current === b) continue;

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
              const separation = overlapX / 2;
              positions.current[a].x -= sign * separation;
              positions.current[b].x += sign * separation;

              const vxA = velocities.current[a].vx;
              const vxB = velocities.current[b].vx;
              velocities.current[a].vx = vxB * PILL_COLLISION_DAMPING;
              velocities.current[b].vx = vxA * PILL_COLLISION_DAMPING;
            } else {
              const sign = dy > 0 ? 1 : -1;
              const separation = overlapY / 2;
              positions.current[a].y -= sign * separation;
              positions.current[b].y += sign * separation;

              const vyA = velocities.current[a].vy;
              const vyB = velocities.current[b].vy;
              velocities.current[a].vy = vyB * PILL_COLLISION_DAMPING;
              velocities.current[b].vy = vyA * PILL_COLLISION_DAMPING;
            }
          }
        }
      }
    }

    function step(): void {
      itemRefs.current.forEach((el, i) => {
        if (!el || dragging.current === i) return;

        let { x, y } = positions.current[i];
        let { vx, vy } = velocities.current[i];

        vy += GRAVITY;
        vx *= FRICTION;
        x += vx;
        y += vy;

        const hw = el.offsetWidth / 2;
        const hh = el.offsetHeight / 2;

        const clamped = clampToCircle(x, y, hw, hh);
        if (clamped.hit) {
          const nx = positions.current[i].x / R;
          const ny = positions.current[i].y / R;
          const dot = vx * nx + vy * ny;
          vx = (vx - 2 * dot * nx) * DAMPING;
          vy = (vy - 2 * dot * ny) * DAMPING;
          if (Math.abs(vy) < BOUNCE_THRESHOLD) vy = 0;
          if (Math.abs(vx) < BOUNCE_THRESHOLD) vx = 0;
          x = clamped.x;
          y = clamped.y;
        }

        positions.current[i] = { x, y };
        velocities.current[i] = { vx, vy };
      });
      resolvePillCollisions();
      resolvePillCollisions();
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const { x, y } = positions.current[i];
        el.style.transform = `translate(${x}px, ${y}px)`;
      });

      animRef.current = requestAnimationFrame(step);
    }

    animRef.current = requestAnimationFrame(step);

    function getPointer(e: MouseEvent | TouchEvent): Position {
      const src = (e as TouchEvent).touches
        ? (e as TouchEvent).touches[0]
        : (e as MouseEvent);
      const rect = container!.getBoundingClientRect();
      return {
        x: src.clientX - rect.left - rect.width / 2,
        y: src.clientY - rect.top - rect.height / 2,
      };
    }

    function onPointerDown(e: MouseEvent | TouchEvent): void {
      const target = (e.target as HTMLElement).closest<HTMLElement>(".pill");
      if (!target) return;
      const idx = parseInt(target.dataset.idx ?? "", 10);
      if (isNaN(idx)) return;
      e.preventDefault();
      dragging.current = idx;
      const ptr = getPointer(e);
      dragOffset.current = {
        x: ptr.x - positions.current[idx].x,
        y: ptr.y - positions.current[idx].y,
      };
      velocities.current[idx] = { vx: 0, vy: 0 };
      target.style.zIndex = "99";
    }

    function onPointerMove(e: MouseEvent | TouchEvent): void {
      if (dragging.current === null) return;
      e.preventDefault();
      const ptr = getPointer(e);
      const idx = dragging.current;
      const el = itemRefs.current[idx];
      if (!el) return;

      const hw = el.offsetWidth / 2;
      const hh = el.offsetHeight / 2;
      const nx = ptr.x - dragOffset.current.x;
      const ny = ptr.y - dragOffset.current.y;

      const clamped = clampToCircle(nx, ny, hw, hh);
      positions.current[idx] = { x: clamped.x, y: clamped.y };
      el.style.transform = `translate(${clamped.x}px, ${clamped.y}px)`;
    }

    function onPointerUp(): void {
      if (dragging.current === null) return;
      const idx = dragging.current;
      const el = itemRefs.current[idx];
      if (el) el.style.zIndex = "";
      velocities.current[idx] = {
        vx: (Math.random() - 0.5) * 3,
        vy: -1,
      };
      dragging.current = null;
    }

    container.addEventListener("mousedown", onPointerDown as EventListener);
    window.addEventListener("mousemove", onPointerMove as EventListener);
    window.addEventListener("mouseup", onPointerUp);
    container.addEventListener("touchstart", onPointerDown as EventListener, {
      passive: false,
    });
    window.addEventListener("touchmove", onPointerMove as EventListener, {
      passive: false,
    });
    window.addEventListener("touchend", onPointerUp);

    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
      container.removeEventListener(
        "mousedown",
        onPointerDown as EventListener,
      );
      window.removeEventListener("mousemove", onPointerMove as EventListener);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener(
        "touchstart",
        onPointerDown as EventListener,
      );
      window.removeEventListener("touchmove", onPointerMove as EventListener);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center font-sans">
      <div
        ref={containerRef}
        className="relative rounded-full overflow-hidden"
        style={{
          width: RADIUS * 2,
          height: RADIUS * 2,
          background:
            "radial-gradient(circle at 40% 35%, rgba(255,160,40,0.08) 0%, rgba(0,0,0,0.55) 70%)",
          border: "1.5px solid rgba(255,140,20,0.35)",
          boxShadow:
            "0 0 60px 10px rgba(200,80,0,0.25), inset 0 0 80px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 60% 65%, rgba(255,120,0,0.06) 0%, transparent 70%)",
          }}
        />

        {ITEMS.map((label, i) => (
          <div
            key={i}
            data-idx={String(i)}
            className="pill absolute inline-flex items-center select-none whitespace-nowrap cursor-grab"
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            style={{
              top: "50%",
              left: "50%",
              marginTop: "-5px",
              marginLeft: "-80px",
              gap: "2px",
              padding: "7px 16px",
              background:
                "linear-gradient(135deg, #ff9a2e 0%, #e86a00 60%, #c45500 100%)",
              borderRadius: "999px",
              color: "#5a1a00",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.01em",
              boxShadow:
                "0 4px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,210,120,0.4)",
              border: "1px solid rgba(255,200,80,0.25)",
              willChange: "transform",
              touchAction: "none",
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
