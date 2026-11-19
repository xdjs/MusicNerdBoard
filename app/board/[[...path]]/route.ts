import { inspector } from "@vercel/board/inspect";
import { team } from "@/lib/board";

const inspect = inspector({ board: team, basePath: "/board" });

export const GET = inspect;
export const POST = inspect;
export const PATCH = inspect;
export const PUT = inspect;
export const DELETE = inspect;
