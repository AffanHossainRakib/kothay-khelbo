// Temporary hit counter (GET/POST /api/v1/hits).

export type HitStats = {
  count: number;
  lastHitAt: string | null;
};

export type Hit = {
  id: string;
  hitAt: string;
  count: number;
};
